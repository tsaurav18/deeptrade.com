import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Bell from "../../../../assets/icons/bell.png";
import Logout from "../../../../assets/icons/logout.png";
import Setting from "../../../../assets/icons/setting.png";
import color from "../../../../style/color";
import { Col, Row, ShadowCol, WhiteSpace } from "../../../../style/globalStyled";
import "../EnterprisesService.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { resetState } from "../../../../redux/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useResponsive } from "../../../../hooks/useResponsive";
import { useTitle } from "../../../../routing/DocumentNameChanger";
import { useMediaQuery } from "react-responsive";
import { getDtData } from "../../../../api";
import Calendar from "react-calendar";
import { resetDataState } from "../../../../redux/slices/dataSlice";
import Modal from "react-modal";
import classNames from "classnames";
function DbInvestment() {
    const isPc = useMediaQuery({
        query: "(min-width:1024px)",
      });
      const isTablet = useMediaQuery({
        query: "(min-width:768px) and (max-width:1023px)",
      });
      const isMobile = useMediaQuery({
        query: "(max-width:767px)",
      });
      const { responsiveValue } = useResponsive();
      const [value, onChange] = useState(new Date());
    
    const [dbSignalData, setDbSignalData] = useState([])
    const [loader, setLoader] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const data_reducer = useSelector((state) => state.dataReducer);
    const user_info_reducer = useSelector((state) => state.loginReducer);
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
  //Calendar logic

  function closeModal() {
    setShowCalendar(false);
  }

  // Calculate min and max dates based on your clickable dates
  const minDate = new Date(Math.min(...vaildSignalDateList));
  minDate.setFullYear(minDate.getFullYear() - 3); // Adjust the range as needed

  const maxDate = new Date(Math.max(...vaildSignalDateList));

  const isDateDisabled = (date) => {
    return !vaildSignalDateList.some(
      (d) => d.toDateString() === date.toDateString()
    );
  };
    console.log("data_reducer", data_reducer);
    const handleDateSelection = (date) => {
      setSelectedDate(date);
      const _date = new Date(date);
      const year = _date.getFullYear();
      const month = String(_date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
      const day = String(_date.getDate()).padStart(2, "0");
  
      const formattedDate = `${year}-${month}-${day}`;
      setCurrentSelectedDate(formattedDate);
      setShowCalendar(false);
      resetDataState();
    //   fetchInfo(formattedDate);
    };
    const getDbInvestmentSignal =async()=>{
        setLoader(true)
        try {
          const res = await getDtData.getDBInvestData(user_info_reducer.company_name)
          if(res.status===200){
            console.log(res.data)
            setDbSignalData(res.data)
          }else{
            setDbSignalData([])
            console.log("res.status",res.status)
          }
        } catch (error) {
          toast("서버 접속 에러 관리자에게 문의해주세요.");
        }
        setLoader(false)
      }
    useEffect(() => {
      let isComponentRender = true
      if(isComponentRender===true){
        getDbInvestmentSignal()
      }
    }, [])
  const customStyles = isPc
  ? {
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
        width: "350px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add a
      },
    }
  : isTablet
  ? {
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
    }
  : {
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
  return (
    <Row style={{
        flexDirection:"column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}> 
<Row
    style={{
      height: 50,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingBottom:10
    }}
  >
    <div className="enterprise_content_right_right_calendar_pc">
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
    </div>
  </Row>


        <Col
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          fontSize: responsiveValue(16, 14, 12),
        }}
      >
        <Row
          style={{
            alignItems: "center",

            height: 40,
            justifyContent: "space-around",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <div
            style={{
              width: 110,
              display: "table-cell",
              fontWeight: 700,
              transition: "all 0.3s ease-in-out",
            }}
          >
             Date
          </div>
          <div
            style={{
              width: 110,
              display: "table-cell",
              fontWeight: 700,
              transition: "all 0.3s ease-in-out",
            }}
          >
            Cash
          </div>
          <div
            style={{
              width: 110,
              display: "table-cell",
              fontWeight: 700,
              transition: "all 0.3s ease-in-out",
            }}
          >
            KODEX <br/> 코스피
          </div>
          <div
            style={{
              width: 110,
              display: "table-cell",
              fontWeight: 700,
              transition: "all 0.3s ease-in-out",
            }}
          >
       KODEX <br/>인버스
          </div>
          <div
            style={{
              width: 110,
              display: "table-cell",
              fontWeight: 700,
              transition: "all 0.3s ease-in-out",
            }}
          >
           KODEX <br/>코스피100
          </div>
          <div
            style={{
              width: 110,
              display: "table-cell",
              fontWeight: 700,
              transition: "all 0.3s ease-in-out",
            }}
          >
            KODEX200<br/> 중소형
          </div>
          <div
            style={{
              width: 110,
              display: "table-cell",
              fontWeight: 700,
              transition: "all 0.3s ease-in-out",
            }}
          >
            KOSEF<br/>고배당
          </div>
          <div
            style={{
              width: 110,
              display: "table-cell",
              fontWeight: 700,
              transition: "all 0.3s ease-in-out",
            }}
          >
            TIGER<br/> 배당성장

          </div>
          <div
            style={{
              width: 110,
              display: "table-cell",
              fontWeight: 700,
              transition: "all 0.3s ease-in-out",
            }}
          >
            ESG
          </div>
          <div
            style={{
              width: 110,
              display: "table-cell",
              fontWeight: 700,
              transition: "all 0.3s ease-in-out",
            }}
          >
            투자 <br/>수익률 
          </div>
        </Row>
        <Row
          style={{
            flexDirection: "column",
            height: "auto",

            // overflowY: "scroll",
          }}
        >
          {loader ? (
            <Oval
              height={50}
              width={50}
              color="#4fa94d"
              wrapperStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : (
            <>
              {dbSignalData &&
                dbSignalData
                  
                  .map((list, index) => {
                    return (
                      <Row
                        style={{
                          height: 50,
                          justifyContent: "space-around",
                          alignItems: "center",

                          // overflowY: "scroll",
                        }}
                      >
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            overflow: "hidden",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                          }}
                        >
                          {list.date}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            overflow: "hidden",
                          }}
                        >
                          {list.cash}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                          }}
                        >
                          {list.kodex_inbox}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                          }}
                        >
                          {list.all_stocks}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                          }}
                        >
                          {list.large_cap}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                          }}
                        >
                          {list.esg}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                          }}
                        >
                          {list.up_growth}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                          }}
                        >
                          {list.small_size}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                          }}
                        >
                          {list.dividents}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                          }}
                        >
                          {list.return_value}
                        </div>
                      </Row>
                    );
                  })}
            </>
          )}
        </Row>
      </Col></Row>
  )
}

export default DbInvestment