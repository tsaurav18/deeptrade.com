import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Bell from "../../../../assets/icons/bell.png";
import Logout from "../../../../assets/icons/logout.png";
import Setting from "../../../../assets/icons/setting.png";
import color from "../../../../style/color";
import {
  Col,
  Row,
  ShadowCol,
  WhiteSpace,
} from "../../../../style/globalStyled";
import "../EnterprisesService.css";
import "./DbInvestment.css";
import { CircularProgress } from "@mui/material";
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
import Arrow from "../../../../assets/icons/arrow.png";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const LineChart = ({ data }) => {
  let chart_data;

  chart_data = {
    labels: data.dates, // You can use either daily or weekly dates here
    datasets: [
      {
        label: "DEM 적용 기술",
        data: data.cum_pv,
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        borderWidth: 1,
        fill: false,
        pointLabelFontColor: "rgba(0, 0, 0, 0)",
      },
      {
        label: "코스피 누적 수익률",
        data: data.market_cum_pv,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderWidth: 1,
        fill: false,
        pointLabelFontColor: "rgba(0, 0, 0, 0)",
      },

      // Repeat the same structure for weekly data if needed
    ],
  };

  const optionsChart = {
    responsive: true,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          pinch: {
            enabled: true, // Enable pinch zooming
          },
          wheel: {
            enabled: true, // Enable wheel zooming
          },
          mode: "x",
        },
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Trading Performance of Models",
        fontSize: 20,
      },
    },
  };

  return (
    <div className="chart-container" style={{ width: "100%" }}>
      {chart_data != undefined && (
        <Line data={chart_data} options={optionsChart} />
      )}
    </div>
  );
};
const tableStyle = {
  // borderCollapse: 'collapse',
  width: '100%',
  // border: '1px solid #ddd', // Add border to the table
};

const thStyle = {
  border: '1px solid #ddd', // Add border to the table header cells
  padding: '8px',
  textAlign: 'center',
};

const tdStyle = {
  // border: '1px solid #ddd', // Add border to the table data cells
  padding: '8px',
  textAlign: 'center',
  borderBottom: 'none',
};

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
  const options = [
    { value: "2024", label: "최근 1년" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
  ];
  const { responsiveValue } = useResponsive();
  const [pastEMPTextDate, setPastEMPTextDate] = useState(options[0].label);
  const [currentEMPTextDate, setCurrentEMPTextDate] = useState("");
  const [limeResultVar, setLimeResultVar] = useState([]);
  const [limeResultImp, setLimeResultImp] = useState([]);
  const [limeMacroAvgVar, setLimeMacroAvgVar] = useState([]);
  const [limeMacroSimVar, setLimeMacroSimVar] = useState([]);
  const [value, onChange] = useState(new Date());
  const [limeResultLoader, setLimeResultLoader] = useState(false);
  const [limeResult, setLimeResult] = useState([]);
  const [limeMacroResult, setLimeMacroResult] = useState([]);
  const [limeMacroResultLoader, setLimeMacroResultLoader] = useState(false);
  const [dbChartData, setDbChartData] = useState([]);

  const [chartDataLoader, setChartDataLoader] = useState(false);
  const [currentdataLoader, setCurrentdataLoader] = useState(false);
  const [dbSignalCurrentData, setDbSignalCurrentData] = useState([]);
  const [dbSignalData, setDbSignalData] = useState([]);
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
  const [currentYear, setCurrentYear] = useState(() => {
    const currentDate = new Date();
    const _currentYear = currentDate.getFullYear();
    return String(_currentYear);
  });
  const [open, setOpen] = useState(false);

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
 
  const _onSelect = (event) => {
    setCurrentYear(event.value);
    if(event.label!=options[0].label){
      let custom_text = String(event.label)+"년"
      setPastEMPTextDate(custom_text);
    }else{
      setPastEMPTextDate(event.label);
    }

  };

  //Get Chart Date
  const getChartData = async () => {
    setChartDataLoader(true);
    try {
      const res = await getDtData.getDBChartData();
      if (res.status === 200) {
        console.log("getChartData data", res.data);
        setDbChartData(res.data);
      } else {
        setDbChartData([]);
        console.log("getChartData res.status", res.status);
      }
    } catch (error) {
      console.log("getChartData catch error", error);
      toast("서버 접속 에러 관리자에게 문의해주세요.");
    }
    setChartDataLoader(false);
  };
  useEffect(() => {
    let isComponentRender = true;
    if (isComponentRender === true) {
      getChartData();
    }
    return () => {
      isComponentRender = false;
    };
  }, []);
  const [selectedStockDate, setSelectedStockDate] = useState("");

  //Get Past Data Table-1
  const getDbInvestmentSignal = async () => {
    setLoader(true);
    try {
      const res = await getDtData.getDBInvestData(
        user_info_reducer.company_name,
        currentYear
      );
      if (res.status === 200) {
        console.log("getDbInvestmentSignal res.data", res.data);
        // const first_row = res.data[0]["buying_date"];

        setDbSignalData(res.data);
       
      } else {
        setDbSignalData([]);
        console.log(" getDbInvestmentSignal res.status", res.status);
      }
    } catch (error) {
      console.log("getDbInvestmentSignal catch error", error);
      toast("서버 접속 에러 관리자에게 문의해주세요.");
    }
    setLoader(false);
  };
  useEffect(() => {
    let isComponentRender = true;
    if (isComponentRender === true) {
      getDbInvestmentSignal();
    }
    return () => {
      isComponentRender = false;
    };
  }, [currentYear]);

  // Get LIME Result
  const fetchLimeResult = async () => {
    try {
      setLimeResultLoader(true);

      const res = await getDtData.getLimeResult(selectedStockDate);

      if (res.status === 200) {
        console.log("fetchLimeResult data", res.data);
        setLimeResult(res.data.data);
        setLimeResultVar(res.data.lime_var);
        setLimeResultImp(res.data.lime_imp);
      } else {
        setLimeResult([]);
        console.log(" Lime result res.status", res.status);
      }
    } catch (error) {
      console.log("fetchLimeResult catch error", error);
      toast("서버 접속 에러 관리자에게 문의해주세요.");
    }
    setLimeResultLoader(false);
  };

  useEffect(() => {
    let isComponentRender = true;
    if (isComponentRender === true) {
      fetchLimeResult();
    }

    return () => {
      isComponentRender = false;
    };
  }, [selectedStockDate]);

  //Get past related Macro data
  const fetchLimeMacro = async () => {
    try {
      setLimeMacroResultLoader(true);

      const res = await getDtData.getLimeMacroResult(selectedStockDate);

      if (res.status === 200) {
        console.log("fetchLimeMacro data", res.data);
        setLimeMacroResult(res.data.data);
        setLimeMacroAvgVar(res.data.avg_var);
        setLimeMacroSimVar(res.data.sim_var);
      } else {
        setLimeMacroResult([]);
        console.log(" Lime Macro result res.status", res.status);
      }
    } catch (error) {
      console.log("fetchLimeMacro catch error", error);
      toast("서버 접속 에러 관리자에게 문의해주세요.");
    }
    setLimeMacroResultLoader(false);
  };

  useEffect(() => {
    let isComponentRender = true;
    if (isComponentRender === true) {
      fetchLimeMacro();
    }

    return () => {
      isComponentRender = false;
    };
  }, [selectedStockDate]);

  // Get current Month data
  const getDbInvestmentCurrentSignal = async () => {
    setCurrentdataLoader(true);

    try {
      const currentDate = new Date();
      const currentYear = String(currentDate.getFullYear());
      const res = await getDtData.getDBInvestCurrentData(currentYear);
      if (res.status === 200) {
        console.log("getDbInvestmentCurrentSignal res.data", res.data);
        const first_row = res.data.data[0]["buying_date"];
   
        setCurrentEMPTextDate(res.data.date);
        setDbSignalCurrentData(res.data.data);
        setSelectedStockDate(first_row);
      } else {
        setDbSignalCurrentData([]);
        console.log(" getDbInvestmentCurrentSignal res.status", res.status);
      }
    } catch (error) {
      console.log("getDbInvestmentCurrentSignal catch error", error);
      toast("서버 접속 에러 관리자에게 문의해주세요.");
    }
    setCurrentdataLoader(false);
  };
  useEffect(() => {
    let isComponentRender = true;
    if (isComponentRender === true) {
      getDbInvestmentCurrentSignal();
    }
    return () => {
      isComponentRender = false;
    };
  }, []);

  return (
    <>
      <Row
        style={{
          alignItems: "flex-start",
          fontSize: "20px",

          justifyContent: "flex-start",
          marginBottom: "10px",
          fontWeight: "700",
        }}
      >
        과거 EMP 비중
      </Row>
    
      <ShadowCol
        style={{
          boxSizing: "border-box",
          height: "auto",
          transition: "all 0.3s ease-in-out",
          // overflowY: "scroll",
          overflow: "hidden",
          textAlign: "center",
          padding: "15px 10px"
        }}
      >
          <Row
        style={{
          alignItems: "flex-start",
  
          justifyContent: "space-between",
          marginBottom: "20px",
         

        }}
      >
        <p style={{fontSize: "18px", fontWeight:"550",textAlign: "left"}}><span style={{color:"#990000"}}>{pastEMPTextDate}</span>에 대한 투자 비중 예측 정보를 표시합니다.</p>
        <div className="enterprise_dbinvestment_dropdown">
            <Dropdown
              options={options}
              onChange={_onSelect}
              value={options[0].label}
              placeholder="year"
            />
          </div>
      </Row>
        {/* <Row
          style={{
            height: 50,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 23,
          }}
        >
          <div className="enterprise_dbinvestment_dropdown">
            <Dropdown
              options={options}
              onChange={_onSelect}
              value={options[0].label}
              placeholder="year"
            />
          </div>
        </Row> */}

        <Col
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            // fontSize: responsiveValue(16, 14, 12),
            boxSizing: "border-box",
            height: "auto",
            transition: "all 0.3s ease-in-out",
            // overflowY: "scroll",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <Row
            style={{
              alignItems: "center",

              height: 50,
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
              추천시점
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
              전체 주식
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
              }}
            >
              대형주
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
              성장
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
              }}
            >
              가치
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
              }}
            >
              중소형
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
              }}
            >
              배당
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
              }}
            >
              투자 <br />
              수익률
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
                    .slice(0, open ? dbSignalData.length : 5)
                    .map((list, index) => {
                      return (
                        <Row
                          key={index}
                          onClick={() => {
                            setSelectedStockDate(list.buying_date);
                          }}
                          style={{
                            backgroundColor:
                              selectedStockDate === list.buying_date
                                ? "#f3f3f3"
                                : "",
                            height: 50,
                            justifyContent: "space-around",
                            alignItems: "center",
                            fontSize: responsiveValue(16, 14, 12),
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
                            {list.buying_date}
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
                            {list.growth}
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
                            {list.value}
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
                            {list.mid_small}
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
                            {list.dividend}
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
                            {list.pv_return}%
                          </div>
                        </Row>
                      );
                    })}
              </>
            )}
          </Row>
        </Col>
        {dbSignalData.length > 5 && (
          <a
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            style={{
              cursor: "pointer",
              transform: `rotate(${open ? 180 : 0}deg)`,
              // margin: 10,
            }}
          >
            <img src={Arrow} style={{ width: 15, height: 15 }} />
          </a>
        )}
      </ShadowCol>
      <WhiteSpace height={25} />

      {/* Current data signal */}
      <Row
        style={{
          alignItems: "flex-start",
          fontSize: "20px",

          justifyContent: "flex-start",
          marginBottom: "10px",
          fontWeight: "700",
        }}
      >
        현재 EMP 비중
      </Row>
     
      <ShadowCol
        style={{
          boxSizing: "border-box",
          height: "auto",
          transition: "all 0.3s ease-in-out",
          // overflowY: "scroll",
          overflow: "hidden",
          textAlign: "center",
          padding: "15px 10px"
        }}
      >
         <Row
        style={{
          alignItems: "flex-start",
          fontSize: "18px",

          justifyContent: "flex-start",
          marginBottom: "20px",
          fontWeight: "500",
        }}
      >
       <p style={{fontSize: "18px", fontWeight:"550",textAlign: "left"}}> <span style={{color:"#990000"}}> {currentEMPTextDate}</span>에 대한 투자 비중 예측 정보를 표시합니다.</p>
      </Row>
        <Col
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            // fontSize: responsiveValue(16, 14, 12),
            boxSizing: "border-box",
            height: "auto",
            transition: "all 0.3s ease-in-out",
            // overflowY: "scroll",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <Row
            style={{
              alignItems: "center",

              height: 50,
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
              추천시점
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
              전체 주식
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
              }}
            >
              대형주
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
              성장
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
              }}
            >
              가치
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
              }}
            >
              중소형
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
              }}
            >
              배당
            </div>
            {/* <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
              }}
            >
              투자 <br />
              수익률
            </div> */}
          </Row>
          <Row
            style={{
              flexDirection: "column",
              height: "auto",

              // overflowY: "scroll",
            }}
          >
            {currentdataLoader ? (
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
                {dbSignalCurrentData &&
                  dbSignalCurrentData.map((list, index) => {
                    return (
                      <Row
                        key={index}
                        onClick={() => {
                          setSelectedStockDate(list.buying_date);
                        }}
                        style={{
                          backgroundColor:
                            selectedStockDate === list.buying_date
                              ? "#f3f3f3"
                              : "",
                          height: 50,
                          justifyContent: "space-around",
                          alignItems: "center",
                          fontSize: responsiveValue(16, 14, 12),
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
                          {list.buying_date}
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
                          {list.growth}
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
                          {list.value}
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
                          {list.mid_small}
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
                          {list.dividend}
                        </div>
                        {/* <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",
                              cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                            }}
                          >
                            {list.pv_return}
                          </div> */}
                      </Row>
                    );
                  })}
              </>
            )}
          </Row>
        </Col>
      </ShadowCol>

      <WhiteSpace height={25} />

      {/* section 3  Lime 결과 */}

   
     
          <Col
            style={{
              // width: 840,
              justifyContent: "flex-start",
              height: "auto",
              paddingBottom: 20,
            }}
          >
            <Row
              style={{
                alignItems: "flex-start",
                fontSize: "20px",

                justifyContent: "flex-start",
                marginBottom: "10px",
                fontWeight: "700",
              }}
            >
              LIME 적용 결과값
            </Row>

           
            <ShadowCol
              style={{
                boxSizing: "border-box",
                height: "auto",
                transition: "all 0.3s ease-in-out",
                // overflowY: "scroll",
                overflow: "hidden",
                textAlign: "center",
                padding: "15px 10px"
              }}
            >
              {limeResult &&(
                <>
               <Row
              style={{
                alignItems: "flex-start",
                fontSize: "18px",

                justifyContent: "flex-start",
                marginBottom: "20px",
                fontWeight: "500",
              }}
            >
             <p style={{fontSize: "18px", fontWeight:"550",textAlign: "left"}}>복잡한 딥러닝 모델을 해석하여 의사결정 근거를 도출하기 위해 본
              기술에 LIME을 적용한 결과는 다음과 같습니다. 단, 각 중요 변수는
              딥러닝에 대한 선형 근사시에 중요한 변수이기 때문에 딥러닝이 해당
              변수를 중요하게 고려했다고 직접적으로 중요하다고 해석하는 것에는
              주의가 필요합니다. LIME을 통해 분석된 중요 변수는{" "}
              <span style={{color:"#990000"}}>{limeResultVar[0]} </span>,  <span style={{color:"#990000"}}>{limeResultVar[1]}</span>이며 각각  <span style={{color:"#990000"}}>{limeResultImp[0]}</span>
              , <span style={{color:"#990000"}}>{limeResultImp[1]}</span>의 중요도를 가집니다. 아래의 표는 비교를 위한
              각각의 중요 변수들에 대한 제거 실험입니다.</p>
            </Row>
              {limeResultLoader ? (
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
              ) : limeResult.length > 0 ? (
                <Col
                  style={{
                    flex: 1,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    // fontSize: responsiveValue(16, 14, 12),
                    boxSizing: "border-box",
                    height: "auto",
                    transition: "all 0.3s ease-in-out",
                    // overflowY: "scroll",
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                >
                   <table  style={tableStyle}>
      <thead>
        <tr >
          <th rowSpan={2}>날짜</th>
          <th rowSpan={2}>중요 변수</th>
          <th  rowSpan={2}>변수 중요도</th>
          <th colSpan={8}>중요 변수 제거 결과</th>
        
         
        </tr>
        <tr ><th >Cash</th>
          <th>전체 주식</th>
          <th>대형주</th>
          <th>ESG</th>
          <th>성장</th>
          <th>가치</th>
          <th>중소형</th>
          <th>배당</th></tr>
      </thead>
      <tbody>
        {(limeResult &&
                      limeResult.length > 0) &&limeResult.map((list, index) => {
          
        return(  <tr key={index}>
          <td style={tdStyle}>{list.date}</td>
          <td style={tdStyle}>{list.lime_var}</td>
          <td style={tdStyle}>{list.lime_imp}</td>
          <td style={tdStyle}>{list.cash}</td>
          <td style={tdStyle}>{list.all_stocks}</td>
          <td style={tdStyle}>{list.large_cap}</td>
          <td style={tdStyle}>{list.esg}</td>
          <td style={tdStyle}>{list.growth}</td>
          <td style={tdStyle}>{list.value}</td>
          <td style={tdStyle}>{list.mid_small}</td>
          <td style={tdStyle}>{list.dividend}</td>
        </tr>)
      })}
      

      </tbody>
    </table>
                  {/* <Row
                    style={{
                      alignItems: "center",

                      height: 70,
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
                      날짜
                    </div>
                    <div
                      style={{
                        width: 110,
                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      중요 변수
                    </div>
                    <div
                      style={{
                        width: 110,
                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      변수 중요도
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
                      전체 주식
                    </div>
                    <div
                      style={{
                        width: 110,
                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      대형주
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
                      성장
                    </div>
                    <div
                      style={{
                        width: 110,
                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      가치
                    </div>
                    <div
                      style={{
                        width: 110,
                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      중소형
                    </div>
                    <div
                      style={{
                        width: 110,
                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      배당
                    </div>
                  </Row>
                  <Row
                    style={{
                      flexDirection: "column",
                      height: "auto",
                    }}
                  >
                    {limeResult &&
                      limeResult.length > 0 &&
                      limeResult.map((list, index) => {
                        return (
                          <Row
                            key={index}
                            style={{
                              height: 50,
                              justifyContent: "space-around",
                              alignItems: "center",
                              fontSize: responsiveValue(16, 14, 12),
                            }}
                          >
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                overflow: "hidden",
                                display: "table-cell",
                                justifyContent: "space-around",

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

                                transition: "all 0.3s ease-in-out",
                                overflow: "hidden",
                              }}
                            >
                              {list.lime_var}
                            </div>
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                display: "table-cell",
                                justifyContent: "space-around",

                                transition: "all 0.3s ease-in-out",
                              }}
                            >
                              {list.lime_imp}
                            </div>
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                display: "table-cell",
                                justifyContent: "space-around",

                                transition: "all 0.3s ease-in-out",
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

                                transition: "all 0.3s ease-in-out",
                              }}
                            >
                              {list.growth}
                            </div>
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                display: "table-cell",
                                justifyContent: "space-around",

                                transition: "all 0.3s ease-in-out",
                              }}
                            >
                              {list.value}
                            </div>
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                display: "table-cell",
                                justifyContent: "space-around",

                                transition: "all 0.3s ease-in-out",
                              }}
                            >
                              {list.mid_small}
                            </div>
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                display: "table-cell",
                                justifyContent: "space-around",

                                transition: "all 0.3s ease-in-out",
                              }}
                            >
                              {list.dividend}
                            </div>
                          </Row>
                        );
                      })}
                  </Row> */}
                </Col>
              ) : (
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: color.DarkBlue,
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  데이터를 불러오지 못했습니다.
                </div>
              )}
              </>)}
            </ShadowCol>
            </Col>
            <WhiteSpace height={30} />
     
    

      {/* section 4  과거  비교  */}
    
        <>
          <Col
            style={{
              // width: 840,
              justifyContent: "flex-start",
              height: "auto",
              paddingBottom: 20,
            }}
          >
            <Row
              style={{
                alignItems: "flex-start",
                fontSize: "20px",

                justifyContent: "flex-start",
                marginBottom: "10px",
                fontWeight: "700",
              }}
            >
              과거의 경제 상황과 현재의 경제 상황 비교
            </Row>

          
            <ShadowCol
               style={{
                boxSizing: "border-box",
                height: "auto",
                transition: "all 0.3s ease-in-out",
                // overflowY: "scroll",
                overflow: "hidden",
                textAlign: "center",
                padding: "15px 10px"
              }}
            >
                {limeMacroResult  && (
                  <>                <Row
              style={{
                alignItems: "flex-start",
                fontSize: "18px",

                justifyContent: "flex-start",
                marginBottom: "20px",
                fontWeight: "500",
              }}
            >
            <p style={{fontSize: "18px", fontWeight:"550",    textAlign: "left"}}>거시 경제 데이터를 종합적으로 분석해 보았을 때 현재 경제 흐름과
              유사한 과거 시점에서 중요했던 변수는 <span style={{color:"#990000"}}>{limeMacroSimVar[0]}, {limeMacroSimVar[1]}</span>였습니다. 또한 지난 6개월 동안 평균적으로
              중요했던 변수는 <span style={{color:"#990000"}}>{limeMacroAvgVar[0]}, {limeMacroAvgVar[1]}</span>입니다.</p>
            </Row>
              {limeMacroResultLoader ? (
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
              ) : limeMacroResult.length > 0 ? (
                <Col
                  style={{
                    flex: 1,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    // fontSize: responsiveValue(16, 14, 12),
                    boxSizing: "border-box",
                    height: "auto",
                    transition: "all 0.3s ease-in-out",
                    // overflowY: "scroll",
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                >
                  <Row
                    style={{
                      alignItems: "center",

                      height: 88,
                      justifyContent: "space-between",
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
                      구간
                    </div>
                    <div
                      style={{
                        width: 110,

                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      과거 시점 
                <br />
                      중요 변수 1
                    </div>
                    <div
                      style={{
                        width: 110,
                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      과거 시점 
                <br />
                      중요 변수 2
                    </div>

                    <div
                      style={{
                        width: 110,
                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      평균 중요
                  <br />
                  변수 1
                    </div>
                    <div
                      style={{
                        width: 110,
                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      평균 중요
                       <br />
                       변수 2
                    </div>
                  </Row>
                  <Row
                    style={{
                      flexDirection: "column",
                      height: "auto",

                      // overflowY: "scroll",
                    }}
                  >
                    {limeMacroResult &&
                      limeMacroResult.length > 0 &&
                      limeMacroResult.map((list, index) => {
                        return (
                          <Row
                            style={{
                              alignItems: "center",
                              height: "auto",
                              justifyContent: "space-between",
                              fontSize: responsiveValue(16, 14, 12),
                            }}
                          >
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                overflow: "hidden",
                                display: "table-cell",
                                justifyContent: "space-between",

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
                                         justifyContent: "space-between",

                                transition: "all 0.3s ease-in-out",
                                overflow: "hidden",
                              }}
                            >
                              {list.sim_var1}
                            </div>
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                display: "table-cell",
                                justifyContent: "space-between",

                                transition: "all 0.3s ease-in-out",
                              }}
                            >
                              {list.sim_var1}
                            </div>
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                display: "table-cell",
                                justifyContent: "space-between",

                                transition: "all 0.3s ease-in-out",
                              }}
                            >
                              {list.avg_var1}
                            </div>
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                display: "table-cell",
                                justifyContent: "space-between",

                                transition: "all 0.3s ease-in-out",
                              }}
                            >
                              {list.avg_var2}
                            </div>
                          </Row>
                        );
                      })}
                  </Row>
                </Col>
              ) : (
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: color.DarkBlue,
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  데이터를 불러오지 못했습니다.
                </div>
              )}
            </>
             )}
               </ShadowCol>
            <WhiteSpace height={30} />
          </Col>
        </>
     

      {/* Section 4 차트 그리기   */}
      <Col
        style={{
          // width: 840,
          justifyContent: "flex-start",
          paddingBottom: 20,
          height: "auto",
        }}
      >
        <ShadowCol
          style={{
            // width: 840,
            height: "auto",
            padding: 15,
            justifyContent: "flex-start",
          }}
        >
          {chartDataLoader ? (
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
          ) : dbChartData ? (
            <>
              <LineChart data={dbChartData} />
              <Row >
             <p  style={{
                fontSize: 16,
                fontWeight: "bold",
       
                marginTop:"15px",
                marginBottom:"15px",
                textAlign: "center",
              }}> DeeptradeTechnologies EMP Management (DEM) 기술의 월단위 성능과 시장 지표 (전체 ETF 평균) 비교</p>
                <br />
              </Row>
            </>
          ) : (
            <div
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: color.DarkBlue,
                width: "100%",
                textAlign: "center",
              }}
            >
              차트 데이터가 없습니다.
            </div>
          )}
        </ShadowCol>
      </Col>
      <ToastContainer />
    </>
  );
}

export default DbInvestment;
