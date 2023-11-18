import React, { useState, useEffect } from "react";
import "./EnterprisesService.css";
import { useDispatch, useSelector } from "react-redux";
import { getDtData } from "../../../api";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { resetState } from "../../../redux/slices/loginSlice";
import Modal from "react-modal";
import "react-calendar/dist/Calendar.css";
import classNames from "classnames";
import { AiOutlineCalendar } from "react-icons/ai";
import { Oval } from "react-loader-spinner";
import { useTitle } from "../../../routing/DocumentNameChanger";

Modal.setAppElement("#root");

function EnterprisesService() {
  useTitle("딥트레이드 엔터프라이즈");
  const [serviceButtonFlag, setServiceButtonFlag] = useState('koreainvestment')
  const [serviceFlagList, setServiceFlagList] = useState([])
  const user_info_reducer = useSelector((state) => state.loginReducer);
  const [Loader, setLoader] = useState(false);
  const [value, onChange] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false); // Add state for calendar visibility
  const [asideButtonState, setAsideButtonState] = useState('SHANNON_STOCK')
  const [dataList, setDataList] = useState(null);
  const [riskManagementDataList, setRiskManagementDataList] = useState(null);
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [selectedIndices, setSelectedIndices] = useState("");
  const [isPcVersion, setIsPcVersion] = useState(false);
  const [currentModel, setcurrentModel] = useState(() => {
    if (user_info_reducer.company_name === "Hantoo") {
      return "1w-5";
    } else if (user_info_reducer.company_name === "Crescendo") {
      return "5";
    } else {
      return "1w-5";
    }
  });
  const [currentRiskModel, setCurrentRiskModel] = useState("daily");

  
  useEffect(() => {
    document.title = "딥트레이드 엔터프라이즈";

    return () => {};
  }, []);

  const dateObjects = user_info_reducer.date_list.map(
    (dateString) => new Date(dateString)
  );

  const [vaildSignalDateList, setVaildSignalDateList] = useState(dateObjects);
  const [selectedDate, setSelectedDate] = useState(
    vaildSignalDateList.slice(-1)[0]
  );
  const convertDate = () => {
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  const [currentSelectedDate, setCurrentSelectedDate] = useState(convertDate());

  const onLogout = () => {
    dispatch(resetState());
    navigate("/enterprise", { replace: true });
  };
  //old function
  const getModelData = async (modelType, currentdate) => {
    setLoader(true);
    if (currentdate !== undefined) {
      const res = await getDtData.fetchDtData(
        user_info_reducer.company_name,
        modelType,
        currentdate
      );

      if (res.status === 200) {
        setDataList(res.data);
        setSelected(modelType);
        setServerError(false);
        setLoader(false);
    
      } else {
        setServerError(true);
        setLoader(false);

        console.log("something went wrong");
      }
    } else {
      const res = await getDtData.fetchDtData(
        user_info_reducer.company_name,
        modelType,
        currentSelectedDate
      );

      if (res.status === 200) {
        setDataList(res.data);
        setSelected(modelType);
        setServerError(false);
        setLoader(false);
        console.log("data is feteched", res.data);
      } else {
        setServerError(true);
        setLoader(false);
        console.log("something went wrong");
      }
    }
  };

//old function
  useEffect(() => {
    let isComponentRender = true;
    if (isComponentRender) {
      let model_type = "";
      if (user_info_reducer.company_name === "Hantoo") {
        model_type = "1w-5";
      } else if (user_info_reducer.company_name === "Crescendo") {
        model_type = "5";
      } else {
        model_type = "1w-5";
      }

      getModelData(model_type);
    }

    return () => {
      isComponentRender = false;
      setServerError(false);
    };
  }, []);

  
// New Function
  const getModelDataNew = async (currentdate) => {
    setLoader(true);
    const res = await getDtData.fetchDtData(
      user_info_reducer.company_name,
      currentdate
    );
    if (res.status === 200) {
      setDataList(res.data);
      setServiceFlagList(res.service_list)
      setServerError(false);
      setLoader(false);
      // console.log("data is feteched", res.data);
    } else {
      setServerError(true);
      setLoader(false);
      console.log("something went wrong");
    }
    
  };


// Get Model data New Function 
useEffect(() => {
  let isComponentRender = true;
  if (isComponentRender) {
    getModelDataNew(currentSelectedDate);
  }

  return () => {
    isComponentRender = false;
   
  };
}, []);






//Risk management stock table 
function RiskManagementStockTable({ data }) {
  return (
    
    <div className={isPcVersion?"enterprises_service_table_responsive_pc":"enterprises_service_table_responsive"}>
      {Loader ? (
        <Oval
          height={50}
          width={50}
          color="#4fa94d"
          wrapperStyle={{ alignItems: "center", justifyContent: "center" }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      ) : (
        <table className={isPcVersion?"enterprises_service_table_pc enterprises_service_table-bordered_pc":"enterprises_service_table enterprises_service_table-bordered"}>
          <thead
            className={
            
              showCalendar ? "nonsticky_table_header" : "sticky_table_header"
            }
          >
            <tr>
              <th>Date</th>
              <th>Long</th>
              <th>Cash</th>
              <th>Short</th>
            
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.adj_Long}</td>
                <td>{row.adj_Cash}</td>
                <td>{row.adj_Short}</td>
    
              </tr>
            ))}
          </tbody>
        </table>
      )}
       
    </div>
  );
}




  function StockTable({ data }) {
    return (
      
      <div className="enterprises_service_table_responsive">
        {Loader ? (
          <Oval
            height={50}
            width={50}
            color="#4fa94d"
            wrapperStyle={{ alignItems: "center", justifyContent: "center" }}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        ) : (
          <table className="enterprises_service_table enterprises_service_table-bordered">
            <thead
              className={
                showCalendar ? "nonsticky_table_header" : "sticky_table_header"
              }
            >
              <tr>
                <th>Stock ID</th>
                <th>Name</th>
                <th>Buying Date</th>
                <th>Selling Date</th>
                <th>Sector</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.stock_id}</td>
                  <td>{row.name}</td>
                  <td>{row.buying_date}</td>
                  <td>{row.selling_date}</td>
                  <td>{row.sector}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
         
      </div>
    );
  }

  function StockTablePc({ data }) {
    return (
      <div className="enterprises_service_table_responsive_pc">
        {Loader ? (
          <Oval
            height={50}
            width={50}
            color="#4fa94d"
            wrapperStyle={{ alignItems: "center", justifyContent: "center" }}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        ) : (
          <table className="enterprises_service_table_pc enterprises_service_table-bordered_pc">
            <thead
              className={
                showCalendar
                  ? "nonsticky_table_header_pc"
                  : "sticky_table_header_pc"
              }
            >
              <tr>
                <th>Stock ID</th>
                <th>Name</th>
                <th>Buying Date</th>
                <th>Selling Date</th>
                <th>Sector</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.stock_id}</td>
                  <td>{row.name}</td>
                  <td>{row.buying_date}</td>
                  <td>{row.selling_date}</td>
                  <td>{row.sector}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
          
      </div>
    );
  }
  function closeModal() {
    setShowCalendar(false);
  }

  // Calculate min and max dates based on your clickable dates
  const minDate = new Date(Math.min(...vaildSignalDateList));
  minDate.setFullYear(minDate.getFullYear() - 3); // Adjust the range as needed

  const maxDate = new Date(Math.max(...vaildSignalDateList));
  // maxDate.setFullYear(maxDate.getFullYear() + 1); // Adjust the range as needed

  const isDateDisabled = (date) => {
    //   const minDate = new Date(Math.min(...vaildSignalDateList));
    // const maxDate = new Date(Math.max(...vaildSignalDateList));
    // // Allow date selection only within the clickable range
    // return date < minDate || date > maxDate;
    return !vaildSignalDateList.some(
      (d) => d.toDateString() === date.toDateString()
    );
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    const _date = new Date(date);
    const year = _date.getFullYear();
    const month = String(_date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(_date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentSelectedDate(formattedDate);
    setShowCalendar(false);

    getModelData(currentModel, formattedDate);
  };
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const handleResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };
  // resize event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

const getShannonManagementIndices =async(modelType)=>{
  setLoader(true);
  console.log("click")
  setSelectedIndices(modelType);
  const res = await getDtData.getRiskManagementIndicesData(modelType
  );

  if (res.status === 200) {
    setRiskManagementDataList(res.data);
    setSelectedIndices(modelType);
    console.log("data is feteched 1st time", res.data);

    setLoader(false);
    // console.log("data is feteched", res.data);
  } else if(res.status===400){
    const res = await getDtData.getRiskManagementIndicesData(modelType
      );
    
      if (res.status === 200) {
        setRiskManagementDataList(res.data);
        setSelectedIndices(modelType);
        console.log("data is feteched 2nd time", res.data);
       
        setLoader(false);
      
      }
    setLoader(false);

    console.log("something went wrong");
  }
}

  useEffect(() => {
    let isComponentRender = true
    if(isComponentRender){
     
      getShannonManagementIndices(currentRiskModel)
    }
  
    return () => {
      isComponentRender = false
    }
  }, [])
  


  
  let customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-76%, -92%)",
      background: "white", // Set the background color
      border: "1px solid #ccc", // Add a border
      borderRadius: "5px", // Add rounded corners
      padding: "10px", // Add padding
      maxWidth: "500px", // Set a maximum width
      width: "454px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add a
    },
  };
  if (windowSize.width < 480) {
   
    if (isPcVersion) {
    
      customStyles = {
        content: {
          top: "5%",
          left: "5%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          // transform: "translate(-88%, -363%)",
          background: "white", // Set the background color
          border: "1px solid #ccc", // Add a border
          borderRadius: "5px", // Add rounded corners
          padding: "10px", // Add padding
          maxWidth: "500px", // Set a maximum width
          width: "356px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add a
          zIndex: "1000"
        },
      };
    
    } else {
      customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -69%)",
          background: "white", // Set the background color
          border: "1px solid #ccc", // Add a border
          borderRadius: "5px", // Add rounded corners
          padding: "10px", // Add padding
          maxWidth: "500px", // Set a maximum width
          width: "356px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add a
        },
      };
    }
  } else if (windowSize.width < 707) {
    customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-65%, -109%)",
        background: "white", // Set the background color
        border: "1px solid #ccc", // Add a border
        borderRadius: "5px", // Add rounded corners
        padding: "10px", // Add padding
        maxWidth: "500px", // Set a maximum width
        width: "390px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add a
      },
    };
  } else {
   
 
      customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-76%, -92%)",
          background: "white", // Set the background color
          border: "1px solid #ccc", // Add a border
          borderRadius: "5px", // Add rounded corners
          padding: "10px", // Add padding
          maxWidth: "500px", // Set a maximum width
          width: "454px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add a
        },
      };
    
   
  }

  const handlePcClick = () => {
    setIsPcVersion(!isPcVersion);
  
  };
























  return (
    <>
      {user_info_reducer.is_staff ? (
        isPcVersion ? (       
      <div
      className="enterprise_parent_container_pc"
    >
      <div className="enterprises_service_container_pc">
        <div className="enterprises_service_inner_box_pc">
          <div className="enterprises_service_company_text_pc">
          <img src={"/assets/enterprise_logo.png"} alt="logo" />
          </div>
          <div className="enterprises_service_inner_box_right_pc">
          <div className="enterprise_username_pc" style={{marginRight:"10px"}} >
          <span style={{fontWeight:900}}>  ID:</span> {user_info_reducer.company_usrnm}
          </div>
          <div className="enter_logout_button_pc" onClick={onLogout}>
            로그아웃
          </div>
          {windowSize.width <= 480 && (
  <div
    onClick={() => handlePcClick()}
    className="enterprise_pc_version_text" 
  >
   <span>{isPcVersion ? "모바일 버전으로 보기" : "PC 버전으로 보기"}</span> 
   
  </div>
  
)}
    </div>
        </div>
        
          {user_info_reducer.company_name ==="DTT"?(  
             <div className="enterprises_outer_pc">
          <div className="enterprises_aside_left_container_pc">
          <div className="aside_button_col_pc" >
                  <button
                    className="enterprises_aside_button_pc"
                    onClick={() => {
                      // setServiceButtonFlag("Hantoo")
                      setAsideButtonState("SHANNON_STOCK");
         
                    }}
                    style={{
                      backgroundColor:
                        asideButtonState === "SHANNON_STOCK"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                  >
                      Shannon 개별종목
                  </button>
                 
                  <button
                    style={{
                      backgroundColor:
                      asideButtonState === "SHANNON_INDICES"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                    className="enterprises_aside_button_pc"
                    onClick={() => {
                      setAsideButtonState("SHANNON_INDICES");
                      getShannonManagementIndices(currentRiskModel)
                    }}
                  >
                 Shannon 지수
                  </button>
          </div>
          </div>
          {asideButtonState==="SHANNON_STOCK" ? ( 
             <div className="enterprises_aside_right_container_pc">
          <div className="enterprises_button-row_pc">
            {user_info_reducer.company_name === "Hantoo" ? (
              <div className="button_container_pc">
                <div className="button_row_pc" style={{}}>
                  <button
                    className="enterprises_button_pc"
                    onClick={() => {
                      setcurrentModel("1w-5");
                      getModelData("1w-5");
                    }}
                    style={{
                      backgroundColor:
                        selected === "1w-5"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                  >
                    1주 Top 5
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "2w-5"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                    className="enterprises_button_pc"
                    onClick={() => {
                      setcurrentModel("2w-5");
                      getModelData("2w-5");
                    }}
                  >
                    2주 Top 5
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "4w-5"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                    className="enterprises_button_pc"
                    onClick={() => {
                      setcurrentModel("4w-5");
                      getModelData("4w-5");
                    }}
                  >
                    4주 Top 5
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "8w-5"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                    className="enterprises_button_pc"
                    onClick={() => {
                      setcurrentModel("8w-5");
                      getModelData("8w-5");
                    }}
                  >
                    8주 Top 5
                  </button>
                </div>
                <div className="button_row2_pc">
                  <button
                    style={{
                      backgroundColor:
                        selected === "1w"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                    className="enterprises_button_pc"
                    onClick={() => {
                      setcurrentModel("1w");
                      getModelData("1w");
                    }}
                  >
                    1주 Top 20
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "2w"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                    className="enterprises_button_pc"
                    onClick={() => {
                      setcurrentModel("2w");
                      getModelData("2w");
                    }}
                  >
                    2주 Top 20
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "4w"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                    className="enterprises_button_pc"
                    onClick={() => {
                      setcurrentModel("4w");
                      getModelData("4w");
                    }}
                  >
                    4주 Top 20
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "8w"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                    className="enterprises_button_pc"
                    onClick={() => {
                      setcurrentModel("8w");
                      getModelData("8w");
                    }}
                  >
                    8주 Top 20
                  </button>
                </div>
              </div>
            ) : user_info_reducer.company_name === "Crescendo" ? (
              <>
                <button
                  style={{
                    backgroundColor:
                      selected === "5" ? "#007bff" : "rgb(100 100 100)",
                  }}
                  className="enterprises_button_pc"
                  onClick={() => {
                    setcurrentModel("5");
                    getModelData("5");
                  }}
                >
                  4주 Top 5
                </button>
                <button
                  style={{
                    backgroundColor:
                      selected === "20" ? "#007bff" : "rgb(100 100 100)",
                  }}
                  className="enterprises_button_pc"
                  onClick={() => {
                    setcurrentModel("20");
                    getModelData("20");
                  }}
                >
                  4주 Top 20
                </button>
              </>
            ) : (
              <>
                <div className="button_container_pc">
                  <div className="button_row_pc" style={{}}>
                    <button
                      className="enterprises_button_pc"
                      onClick={() => {
                        setcurrentModel("1w-5");
                        getModelData("1w-5");
                      }}
                      style={{
                        backgroundColor:
                          selected === "1w-5"
                            ? "#007bff"
                            : "rgb(100 100 100)",
                      }}
                    >
                      1주 Top 5
                    </button>
                    <button
                      style={{
                        backgroundColor:
                          selected === "2w-5"
                            ? "#007bff"
                            : "rgb(100 100 100)",
                      }}
                      className="enterprises_button_pc"
                      onClick={() => {
                        setcurrentModel("2w-5");
                        getModelData("2w-5");
                      }}
                    >
                      2주 Top 5
                    </button>
                    <button
                      style={{
                        backgroundColor:
                          selected === "4w-5"
                            ? "#007bff"
                            : "rgb(100 100 100)",
                      }}
                      className="enterprises_button_pc"
                      onClick={() => {
                        setcurrentModel("4w-5");
                        getModelData("4w-5");
                      }}
                    >
                      4주 Top 5
                    </button>
                    <button
                      style={{
                        backgroundColor:
                          selected === "8w-5"
                            ? "#007bff"
                            : "rgb(100 100 100)",
                      }}
                      className="enterprises_button_pc"
                      onClick={() => {
                        setcurrentModel("8w-5");
                        getModelData("8w-5");
                      }}
                    >
                      8주 Top 5
                    </button>
                  </div>
                  <div className="button_row2_pc">
                    <button
                      style={{
                        backgroundColor:
                          selected === "1w"
                            ? "#007bff"
                            : "rgb(100 100 100)",
                      }}
                      className="enterprises_button_pc"
                      onClick={() => {
                        setcurrentModel("1w");
                        getModelData("1w");
                      }}
                    >
                      1주 Top 20
                    </button>
                    <button
                      style={{
                        backgroundColor:
                          selected === "2w"
                            ? "#007bff"
                            : "rgb(100 100 100)",
                      }}
                      className="enterprises_button_pc"
                      onClick={() => {
                        setcurrentModel("2w");
                        getModelData("2w");
                      }}
                    >
                      2주 Top 20
                    </button>
                    <button
                      style={{
                        backgroundColor:
                          selected === "4w"
                            ? "#007bff"
                            : "rgb(100 100 100)",
                      }}
                      className="enterprises_button_pc"
                      onClick={() => {
                        setcurrentModel("4w");
                        getModelData("4w");
                      }}
                    >
                      4주 Top 20
                    </button>
                    <button
                      style={{
                        backgroundColor:
                          selected === "8w"
                            ? "#007bff"
                            : "rgb(100 100 100)",
                      }}
                      className="enterprises_button_pc"
                      onClick={() => {
                        setcurrentModel("8w");
                        getModelData("8w");
                      }}
                    >
                      8주 Top 20
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

        {/* Calendar Render */}
          {dataList != null ?<div className="calendar_table_class"> <div className="enterprises_service_calendar_btn_pc">
          <div
            onClick={() => setShowCalendar(!showCalendar)}
            className="calendar_icon_pc"
          >
            <AiOutlineCalendar size={25} />
            {showCalendar ? convertDate() : convertDate()}
          </div>
          <Modal
            isOpen={showCalendar}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <Calendar
              calendarType="US"
              locale="ko"
              defaultActiveStartDate={selectedDate}
              onClickDay={(date) => handleDateSelection(date)}
              onChange={onChange}
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              tileClassName={({ date, view }) => {
                const isHovered = view === "month" || view === "year"; // Define hoverable views (month/year)

                return classNames({
                  "selected-date":
                    date.toDateString() === selectedDate.toDateString(),
                });
              }}
              tileDisabled={({ date }) => isDateDisabled(date)}
            />
          </Modal>
        </div> <StockTablePc data={dataList} /></div> : null}
        </div>):
        (  <div className="enterprises_aside_right_container_risk_pc">
            <div className="enterprises_button-row_pc">
              <div className="button_container_pc">
                      <div className="button_row_pc" style={{}}>
                        <button
                          className="enterprises_button_pc"
                          onClick={() => {
                            setCurrentRiskModel("daily");
                            getShannonManagementIndices("daily");
                          }}
                          style={{
                            backgroundColor:
                            selectedIndices === "daily"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                        >
                        Daily
                        </button>
                        <button
                          style={{
                            backgroundColor:
                            selectedIndices === "weekly"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_button_pc"
                          onClick={() => {
                            setCurrentRiskModel("weekly");
                            getShannonManagementIndices("weekly");
                          }}
                        >
                    Weekly
                        </button>
                    </div></div> </div>
          {riskManagementDataList != null ? <div className="calendar_table_class"><RiskManagementStockTable data={riskManagementDataList} /> </div>: null}
        </div>)}
        
        </div>
        )
        // This Section is for Other Companies
        :(
          <div className="enterprises_outer_pc">
          <div className="enterprises_aside_left_container_pc">
          {user_info_reducer.company_name === "Hantoo" ? (
          <div className="enterprises_button-row_pc">
          <button
                    className="enterprises_button_pc"
                    onClick={() => {
                      setcurrentModel("1w-5");
                      getModelData("1w-5");
                    }}
                    style={{
                      backgroundColor:
                        selected === "1w-5"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                  >
                    1주 Top 5
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "2w-5"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                    className="enterprises_button_pc"
                    onClick={() => {
                      setcurrentModel("2w-5");
                      getModelData("2w-5");
                    }}
                  >
                    2주 Top 5
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "4w-5"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                    className="enterprises_button_pc"
                    onClick={() => {
                      setcurrentModel("4w-5");
                      getModelData("4w-5");
                    }}
                  >
                    4주 Top 5
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "8w-5"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                    className="enterprises_button_pc"
                    onClick={() => {
                      setcurrentModel("8w-5");
                      getModelData("8w-5");
                    }}
                  >
                    8주 Top 5
                  </button>
                  <div className="button_row2_pc">
                  <button
                    style={{
                      backgroundColor:
                        selected === "1w"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                    className="enterprises_button_pc"
                    onClick={() => {
                      setcurrentModel("1w");
                      getModelData("1w");
                    }}
                  >
                    1주 Top 20
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "2w"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                    className="enterprises_button_pc"
                    onClick={() => {
                      setcurrentModel("2w");
                      getModelData("2w");
                    }}
                  >
                    2주 Top 20
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "4w"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                    className="enterprises_button_pc"
                    onClick={() => {
                      setcurrentModel("4w");
                      getModelData("4w");
                    }}
                  >
                    4주 Top 20
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "8w"
                          ? "#007bff"
                          : "rgb(100 100 100)",
                    }}
                    className="enterprises_button_pc"
                    onClick={() => {
                      setcurrentModel("8w");
                      getModelData("8w");
                    }}
                  >
                    8주 Top 20
                  </button>
            </div>
                </div>
          ):user_info_reducer.company_name === "Crescendo" ? (
            <>
              <button
                style={{
                  backgroundColor:
                    selected === "5" ? "#007bff" : "rgb(100 100 100)",
                }}
                className="enterprises_button_pc"
                onClick={() => {
                  setcurrentModel("5");
                  getModelData("5");
                }}
              >
                4주 Top 5
              </button>
              <button
                style={{
                  backgroundColor:
                    selected === "20" ? "#007bff" : "rgb(100 100 100)",
                }}
                className="enterprises_button_pc"
                onClick={() => {
                  setcurrentModel("20");
                  getModelData("20");
                }}
              >
                4주 Top 20
              </button>
            </>
          ) : (null)}
        
          </div>

        {/* this section for other compaines */}
        <div className="enterprises_aside_right_container_pc">
       
        {/* Calendar Render */}
          {dataList != null ?<div className="calendar_table_class"> <div className="enterprises_service_calendar_btn_pc">
          <div
            onClick={() => setShowCalendar(!showCalendar)}
            className="calendar_icon_pc"
          >
            <AiOutlineCalendar size={25} />
            {showCalendar ? convertDate() : convertDate()}
          </div>
          <Modal
            isOpen={showCalendar}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <Calendar
              calendarType="US"
              locale="ko"
              defaultActiveStartDate={selectedDate}
              onClickDay={(date) => handleDateSelection(date)}
              onChange={onChange}
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              tileClassName={({ date, view }) => {
                const isHovered = view === "month" || view === "year"; // Define hoverable views (month/year)

                return classNames({
                  "selected-date":
                    date.toDateString() === selectedDate.toDateString(),
                });
              }}
              tileDisabled={({ date }) => isDateDisabled(date)}
            />
          </Modal>
        </div> <StockTable data={dataList} /></div> : null}
        </div>
        
        </div>
        )}
     
      </div>


    </div>

        
        
        
        ) : (
        
        
        // website view
          <div
            className="enterprise_parent_container"
          >
            <div className="enterprises_service_container">
              <div className="enterprises_service_inner_box">
                <div className="enterprises_service_company_text">
                <img src={"/assets/enterprise_logo.png"} alt="logo" />
                </div>
                <div className="enterprises_service_inner_box_right">
                <div className="enterprise_username" style={{marginRight:"10px"}} >
                <span style={{fontWeight:900}}>  ID:</span> {user_info_reducer.company_usrnm}
                </div>
                <div className="enter_logout_button" onClick={onLogout}>
                  로그아웃
                </div>
                {windowSize.width <= 480 && (
        <div
          onClick={() => handlePcClick()}
          className="enterprise_pc_version_text" 
        >
         <span>{isPcVersion ? "모바일 버전으로 보기" : "PC 버전으로 보기"}</span> 
         
        </div>
        
      )}
          </div>
              </div>
                 
                {user_info_reducer.company_name ==="DTT"?(  
                   <div className="enterprises_outer">
                      
                <div className="enterprises_aside_left_container">
                <div className="aside_button_col" >
                        <button
                          className="enterprises_aside_button"
                          onClick={() => {
                            // setServiceButtonFlag("Hantoo")
                            setAsideButtonState("SHANNON_STOCK");
               
                          }}
                          style={{
                            backgroundColor:
                              asideButtonState === "SHANNON_STOCK"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                        >
                            Shannon 개별종목
                        </button>
                      
                        <button
                          style={{
                            backgroundColor:
                            asideButtonState === "SHANNON_INDICES"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_aside_button"
                          onClick={() => {
                            setAsideButtonState("SHANNON_INDICES");
                         
                          }}
                        >
                       Shannon 지수
                        </button>

                </div>
                </div>
             
          {asideButtonState==="SHANNON_STOCK" ? (  <div className="enterprises_aside_right_container">
              
                <div className="enterprises_button-row">
                  {user_info_reducer.company_name === "Hantoo" ? (
                    <div className="button_container">
                      <div className="button_row" style={{}}>
                        <button
                          className="enterprises_button"
                          onClick={() => {
                            setcurrentModel("1w-5");
                            getModelData("1w-5");
                          }}
                          style={{
                            backgroundColor:
                              selected === "1w-5"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                        >
                          1주 Top 5
                        </button>
                        <button
                          style={{
                            backgroundColor:
                              selected === "2w-5"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_button"
                          onClick={() => {
                            setcurrentModel("2w-5");
                            getModelData("2w-5");
                          }}
                        >
                          2주 Top 5
                        </button>
                        <button
                          style={{
                            backgroundColor:
                              selected === "4w-5"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_button"
                          onClick={() => {
                            setcurrentModel("4w-5");
                            getModelData("4w-5");
                          }}
                        >
                          4주 Top 5
                        </button>
                        <button
                          style={{
                            backgroundColor:
                              selected === "8w-5"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_button"
                          onClick={() => {
                            setcurrentModel("8w-5");
                            getModelData("8w-5");
                          }}
                        >
                          8주 Top 5
                        </button>
                      </div>
                      <div className="button_row2">
                        <button
                          style={{
                            backgroundColor:
                              selected === "1w"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_button"
                          onClick={() => {
                            setcurrentModel("1w");
                            getModelData("1w");
                          }}
                        >
                          1주 Top 20
                        </button>
                        <button
                          style={{
                            backgroundColor:
                              selected === "2w"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_button"
                          onClick={() => {
                            setcurrentModel("2w");
                            getModelData("2w");
                          }}
                        >
                          2주 Top 20
                        </button>
                        <button
                          style={{
                            backgroundColor:
                              selected === "4w"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_button"
                          onClick={() => {
                            setcurrentModel("4w");
                            getModelData("4w");
                          }}
                        >
                          4주 Top 20
                        </button>
                        <button
                          style={{
                            backgroundColor:
                              selected === "8w"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_button"
                          onClick={() => {
                            setcurrentModel("8w");
                            getModelData("8w");
                          }}
                        >
                          8주 Top 20
                        </button>
                      </div>
                    </div>
                  ) : user_info_reducer.company_name === "Crescendo" ? (
                    <>
                      <button
                        style={{
                          backgroundColor:
                            selected === "5" ? "#007bff" : "rgb(100 100 100)",
                        }}
                        className="enterprises_button"
                        onClick={() => {
                          setcurrentModel("5");
                          getModelData("5");
                        }}
                      >
                        4주 Top 5
                      </button>
                      <button
                        style={{
                          backgroundColor:
                            selected === "20" ? "#007bff" : "rgb(100 100 100)",
                        }}
                        className="enterprises_button"
                        onClick={() => {
                          setcurrentModel("20");
                          getModelData("20");
                        }}
                      >
                        4주 Top 20
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="button_container">
                        <div className="button_row" style={{}}>
                          <button
                            className="enterprises_button"
                            onClick={() => {
                              setcurrentModel("1w-5");
                              getModelData("1w-5");
                            }}
                            style={{
                              backgroundColor:
                                selected === "1w-5"
                                  ? "#007bff"
                                  : "rgb(100 100 100)",
                            }}
                          >
                            1주 Top 5
                          </button>
                          <button
                            style={{
                              backgroundColor:
                                selected === "2w-5"
                                  ? "#007bff"
                                  : "rgb(100 100 100)",
                            }}
                            className="enterprises_button"
                            onClick={() => {
                              setcurrentModel("2w-5");
                              getModelData("2w-5");
                            }}
                          >
                            2주 Top 5
                          </button>
                          <button
                            style={{
                              backgroundColor:
                                selected === "4w-5"
                                  ? "#007bff"
                                  : "rgb(100 100 100)",
                            }}
                            className="enterprises_button"
                            onClick={() => {
                              setcurrentModel("4w-5");
                              getModelData("4w-5");
                            }}
                          >
                            4주 Top 5
                          </button>
                          <button
                            style={{
                              backgroundColor:
                                selected === "8w-5"
                                  ? "#007bff"
                                  : "rgb(100 100 100)",
                            }}
                            className="enterprises_button"
                            onClick={() => {
                              setcurrentModel("8w-5");
                              getModelData("8w-5");
                            }}
                          >
                            8주 Top 5
                          </button>
                        </div>
                        <div className="button_row2">
                          <button
                            style={{
                              backgroundColor:
                                selected === "1w"
                                  ? "#007bff"
                                  : "rgb(100 100 100)",
                            }}
                            className="enterprises_button"
                            onClick={() => {
                              setcurrentModel("1w");
                              getModelData("1w");
                            }}
                          >
                            1주 Top 20
                          </button>
                          <button
                            style={{
                              backgroundColor:
                                selected === "2w"
                                  ? "#007bff"
                                  : "rgb(100 100 100)",
                            }}
                            className="enterprises_button"
                            onClick={() => {
                              setcurrentModel("2w");
                              getModelData("2w");
                            }}
                          >
                            2주 Top 20
                          </button>
                          <button
                            style={{
                              backgroundColor:
                                selected === "4w"
                                  ? "#007bff"
                                  : "rgb(100 100 100)",
                            }}
                            className="enterprises_button"
                            onClick={() => {
                              setcurrentModel("4w");
                              getModelData("4w");
                            }}
                          >
                            4주 Top 20
                          </button>
                          <button
                            style={{
                              backgroundColor:
                                selected === "8w"
                                  ? "#007bff"
                                  : "rgb(100 100 100)",
                            }}
                            className="enterprises_button"
                            onClick={() => {
                              setcurrentModel("8w");
                              getModelData("8w");
                            }}
                          >
                            8주 Top 20
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

              {/* Calendar Render */}
                {dataList != null ?<div className="calendar_table_class"> <div className="enterprises_service_calendar_btn">
                <div
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="calendar_icon"
                >
                  <AiOutlineCalendar size={25} />
                  {showCalendar ? convertDate() : convertDate()}
                </div>
                <Modal
                  isOpen={showCalendar}
                  onRequestClose={closeModal}
                  style={customStyles}
                >
                  <Calendar
                    calendarType="US"
                    locale="ko"
                    defaultActiveStartDate={selectedDate}
                    onClickDay={(date) => handleDateSelection(date)}
                    onChange={onChange}
                    value={value}
                    minDate={minDate}
                    maxDate={maxDate}
                    tileClassName={({ date, view }) => {
                      const isHovered = view === "month" || view === "year"; // Define hoverable views (month/year)

                      return classNames({
                        "selected-date":
                          date.toDateString() === selectedDate.toDateString(),
                      });
                    }}
                    tileDisabled={({ date }) => isDateDisabled(date)}
                  />
                </Modal>
              </div> <StockTable data={dataList} /></div> : null}
              </div>)
              
              :
              (  <div className="enterprises_aside_right_container">
              <div className="enterprises_button-row">
              <div className="button_container">
                      <div className="button_row" style={{}}>
                        <button
                          className="enterprises_button"
                          onClick={() => {
                            setCurrentRiskModel("daily");
                            getShannonManagementIndices("daily");
                          }}
                          style={{
                            backgroundColor:
                            selectedIndices === "daily"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                        >
                        Daily
                        </button>
                        <button
                          style={{
                            backgroundColor:
                            selectedIndices === "weekly"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_button"
                          onClick={() => {
                            setCurrentRiskModel("weekly");
                            getShannonManagementIndices("weekly");
                          }}
                        >
                    Weekly
                        </button>
                    </div></div> </div>
                {riskManagementDataList != null ? 
                <div className="calendar_table_class"><RiskManagementStockTable data={riskManagementDataList} /></div> : null}
              </div>)}
              
              </div>
              )
              // This Section is for Other Companies
              :(
                <div className="enterprises_outer">
                <div className="enterprises_aside_left_container">
                <div className="enterprises_button-row">
                  {user_info_reducer.company_name === "Hantoo" ? (
                    <div className="button_container">
                      <div className="button_row" style={{}}>
                        <button
                          className="enterprises_button"
                          onClick={() => {
                            setcurrentModel("1w-5");
                            getModelData("1w-5");
                          }}
                          style={{
                            backgroundColor:
                              selected === "1w-5"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                        >
                          1주 Top 5
                        </button>
                        <button
                          style={{
                            backgroundColor:
                              selected === "2w-5"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_button"
                          onClick={() => {
                            setcurrentModel("2w-5");
                            getModelData("2w-5");
                          }}
                        >
                          2주 Top 5
                        </button>
                        <button
                          style={{
                            backgroundColor:
                              selected === "4w-5"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_button"
                          onClick={() => {
                            setcurrentModel("4w-5");
                            getModelData("4w-5");
                          }}
                        >
                          4주 Top 5
                        </button>
                        <button
                          style={{
                            backgroundColor:
                              selected === "8w-5"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_button"
                          onClick={() => {
                            setcurrentModel("8w-5");
                            getModelData("8w-5");
                          }}
                        >
                          8주 Top 5
                        </button>
                      </div>
                      <div className="button_row2">
                        <button
                          style={{
                            backgroundColor:
                              selected === "1w"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_button"
                          onClick={() => {
                            setcurrentModel("1w");
                            getModelData("1w");
                          }}
                        >
                          1주 Top 20
                        </button>
                        <button
                          style={{
                            backgroundColor:
                              selected === "2w"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_button"
                          onClick={() => {
                            setcurrentModel("2w");
                            getModelData("2w");
                          }}
                        >
                          2주 Top 20
                        </button>
                        <button
                          style={{
                            backgroundColor:
                              selected === "4w"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_button"
                          onClick={() => {
                            setcurrentModel("4w");
                            getModelData("4w");
                          }}
                        >
                          4주 Top 20
                        </button>
                        <button
                          style={{
                            backgroundColor:
                              selected === "8w"
                                ? "#007bff"
                                : "rgb(100 100 100)",
                          }}
                          className="enterprises_button"
                          onClick={() => {
                            setcurrentModel("8w");
                            getModelData("8w");
                          }}
                        >
                          8주 Top 20
                        </button>
                      </div>
                    </div>
                  ) : user_info_reducer.company_name === "Crescendo" ? (
                    <>
                      <button
                        style={{
                          backgroundColor:
                            selected === "5" ? "#007bff" : "rgb(100 100 100)",
                        }}
                        className="enterprises_button"
                        onClick={() => {
                          setcurrentModel("5");
                          getModelData("5");
                        }}
                      >
                        4주 Top 5
                      </button>
                      <button
                        style={{
                          backgroundColor:
                            selected === "20" ? "#007bff" : "rgb(100 100 100)",
                        }}
                        className="enterprises_button"
                        onClick={() => {
                          setcurrentModel("20");
                          getModelData("20");
                        }}
                      >
                        4주 Top 20
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="button_container">
                        <div className="button_row" style={{}}>
                          <button
                            className="enterprises_button"
                            onClick={() => {
                              setcurrentModel("1w-5");
                              getModelData("1w-5");
                            }}
                            style={{
                              backgroundColor:
                                selected === "1w-5"
                                  ? "#007bff"
                                  : "rgb(100 100 100)",
                            }}
                          >
                            1주 Top 5
                          </button>
                          <button
                            style={{
                              backgroundColor:
                                selected === "2w-5"
                                  ? "#007bff"
                                  : "rgb(100 100 100)",
                            }}
                            className="enterprises_button"
                            onClick={() => {
                              setcurrentModel("2w-5");
                              getModelData("2w-5");
                            }}
                          >
                            2주 Top 5
                          </button>
                          <button
                            style={{
                              backgroundColor:
                                selected === "4w-5"
                                  ? "#007bff"
                                  : "rgb(100 100 100)",
                            }}
                            className="enterprises_button"
                            onClick={() => {
                              setcurrentModel("4w-5");
                              getModelData("4w-5");
                            }}
                          >
                            4주 Top 5
                          </button>
                          <button
                            style={{
                              backgroundColor:
                                selected === "8w-5"
                                  ? "#007bff"
                                  : "rgb(100 100 100)",
                            }}
                            className="enterprises_button"
                            onClick={() => {
                              setcurrentModel("8w-5");
                              getModelData("8w-5");
                            }}
                          >
                            8주 Top 5
                          </button>
                        </div>
                        <div className="button_row2">
                          <button
                            style={{
                              backgroundColor:
                                selected === "1w"
                                  ? "#007bff"
                                  : "rgb(100 100 100)",
                            }}
                            className="enterprises_button"
                            onClick={() => {
                              setcurrentModel("1w");
                              getModelData("1w");
                            }}
                          >
                            1주 Top 20
                          </button>
                          <button
                            style={{
                              backgroundColor:
                                selected === "2w"
                                  ? "#007bff"
                                  : "rgb(100 100 100)",
                            }}
                            className="enterprises_button"
                            onClick={() => {
                              setcurrentModel("2w");
                              getModelData("2w");
                            }}
                          >
                            2주 Top 20
                          </button>
                          <button
                            style={{
                              backgroundColor:
                                selected === "4w"
                                  ? "#007bff"
                                  : "rgb(100 100 100)",
                            }}
                            className="enterprises_button"
                            onClick={() => {
                              setcurrentModel("4w");
                              getModelData("4w");
                            }}
                          >
                            4주 Top 20
                          </button>
                          <button
                            style={{
                              backgroundColor:
                                selected === "8w"
                                  ? "#007bff"
                                  : "rgb(100 100 100)",
                            }}
                            className="enterprises_button"
                            onClick={() => {
                              setcurrentModel("8w");
                              getModelData("8w");
                            }}
                          >
                            8주 Top 20
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              
                </div>

              {/* this section for other compaines */}
              <div className="enterprises_aside_right_container">
             
              {/* Calendar Render */}
                {dataList != null ?<div className="calendar_table_class"> <div className="enterprises_service_calendar_btn">
                <div
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="calendar_icon"
                >
                  <AiOutlineCalendar size={25} />
                  {showCalendar ? convertDate() : convertDate()}
                </div>
                <Modal
                  isOpen={showCalendar}
                  onRequestClose={closeModal}
                  style={customStyles}
                >
                  <Calendar
                    calendarType="US"
                    locale="ko"
                    defaultActiveStartDate={selectedDate}
                    onClickDay={(date) => handleDateSelection(date)}
                    onChange={onChange}
                    value={value}
                    minDate={minDate}
                    maxDate={maxDate}
                    tileClassName={({ date, view }) => {
                      const isHovered = view === "month" || view === "year"; // Define hoverable views (month/year)

                      return classNames({
                        "selected-date":
                          date.toDateString() === selectedDate.toDateString(),
                      });
                    }}
                    tileDisabled={({ date }) => isDateDisabled(date)}
                  />
                </Modal>
              </div> <StockTable data={dataList} /></div> : null}
              </div>
              
              </div>
              )}
           
            </div>
  
  
          </div>
        )
      ) : null}
         
    </>
  );
}

export default EnterprisesService;
