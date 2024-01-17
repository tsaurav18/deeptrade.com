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
      // {
      //   label: "Market value",
      //   data: dailyCashValues,
      //   borderColor: "rgb(75, 192, 192)",
      //   backgroundColor: "rgba(75, 192, 192, 0.5)",
      //   borderWidth: 1,
      //   fill: false,
      //   pointLabelFontColor: "rgba(0, 0, 0, 0)",
      // },

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
  const [limeResultLoader, setLimeResultLoader] = useState(false);
  const [limeResult, setLimeResult] = useState([]);
  const [limeMacroResult, setLimeMacroResult] = useState([])
  const [limeMacroResultLoader, setLimeMacroResultLoader] = useState(false)
  const [dbChartData, setDbChartData] = useState([]);
  const [chartDataLoader, setChartDataLoader] = useState(false);
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
  const options = [
    { value: "2024", label: "최근 1년" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
  ];

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
  // console.log("data_reducer", data_reducer);
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

  const _onSelect = (event) => {
    setCurrentYear(event.value);
  };



  const getChartData = async () => {
    setChartDataLoader(true);
    try {
      const res = await getDtData.getDBChartData();
      if (res.status === 200) {
        console.log("getChartData data", res.data);
        setDbChartData(res.data);
      } else {
        setDbChartData([]);
        console.log("res.status", res.status);
      }
    } catch (error) {
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
      isComponentRender=false
    }
  }, []);
  const [selectedStockDate, setSelectedStockDate] = useState("")
  const getDbInvestmentSignal = async () => {
    setLoader(true);
    try {
    
      const res = await getDtData.getDBInvestData(
        user_info_reducer.company_name,
        currentYear
      );
      if (res.status === 200) {
        console.log("getDbInvestmentSignal res.data",res.data[0]["buying_date"])
        const first_row = res.data[0]["buying_date"]
     
        setDbSignalData(res.data);
        setSelectedStockDate(first_row)
      } else {
        setDbSignalData([]);
        console.log(" getDbInvestmentSignal res.status", res.status);
      }
    } catch (error) {
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
      isComponentRender=false
    }
  }, [currentYear]);




  const fetchLimeResult = async () => {
    console.log("lime result triggered selectedStockDate is" ,selectedStockDate)
    try {
      setLimeResultLoader(true);

      const res = await getDtData.getLimeResult(selectedStockDate);
   
      if (res.status === 200) {
        console.log("fetchLimeResult data", res.data);
        setLimeResult(res.data);
      } else {
        setLimeResult([]);
        console.log(" Lime result res.status", res.status);
      }
    } catch (error) {
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
      isComponentRender=false
    }
  }, [selectedStockDate])
  

  const fetchLimeMacro = async () => {
    console.log("fetchLimeMacro result triggered selectedStockDate is" ,selectedStockDate)
    try {
      setLimeMacroResultLoader(true);

      const res = await getDtData.getLimeMacroResult(selectedStockDate);
   
      if (res.status === 200) {
        console.log("fetchLimeResult data", res.data);
        setLimeMacroResult(res.data);
      } else {
        setLimeMacroResult([]);
        console.log(" Lime result res.status", res.status);
      }
    } catch (error) {
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
      isComponentRender=false
    }
  }, [selectedStockDate])
  

  return (
    <>
        <Row style={{alignItems:"flex-start",fontSize: "20px",

justifyContent: "flex-start",
marginBottom: "10px",
fontWeight: "700"}}>현재 EMP 비중</Row>
      <ShadowCol
        style={{
          boxSizing: "border-box",
          height: "auto",
          transition: "all 0.3s ease-in-out",
          // overflowY: "scroll",
          overflow: "hidden",
          textAlign: "center",
          padding: 20,
        }}
      >
     
        <Row
          style={{
            height: 50,
            justifyContent: "flex-start",
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
                            {list.pv_return}
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





      {/* section 2  Lime 결과 */}

      {(dbSignalData && selectedStockDate )&& (
        <>
          <Col
            style={{
              // width: 840,
              justifyContent: "flex-start",
              height: "auto",
              paddingBottom: 20,
            }}
          >
            <Row style={{alignItems:"flex-start",fontSize: "20px",

    justifyContent: "flex-start",
    marginBottom: "10px",
    fontWeight: "700"}}>LIME 적용 결과값</Row>
            <ShadowCol
              style={{
                // width: 840,
                height: "auto",
                padding: 10,
                paddingTop: 15,
              }}
            >
              {limeResultLoader ? (
                <Col>
                  <CircularProgress />
                </Col>
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
               <Row  style={{
              alignItems: "center",

              height: 40,
              justifyContent: "space-around",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}>
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
              중요 변수 <br/> imp
            </div>
            {/* <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
              }}
            >
 중요변수2
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
              }}
            >
              중요변수2 <br/> imp
            </div> */}
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

              // overflowY: "scroll",
            }}
          >
       {(limeResult && limeResult.length>0) && limeResult.map((list, index) => {
                      return (
                        <Row
                        
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
                            {list.lime_var}
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
                            {list.lime_imp}
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
            </ShadowCol>
            <WhiteSpace height={30} />
          

            
           
          </Col>
        </>
      )}
{/* section 3  과거  비교  */}
{(dbSignalData && selectedStockDate )&& (
        <>
          <Col
            style={{
              // width: 840,
              justifyContent: "flex-start",
              height: "auto",
              paddingBottom: 20,
            }}
          >
            <Row style={{alignItems:"flex-start",fontSize: "20px",

    justifyContent: "flex-start",
    marginBottom: "10px",
    fontWeight: "700"}}>과거의 경제 상황과 현재의 경제 상황 비교</Row>
            <ShadowCol
              style={{
                // width: 840,
                height: "auto",
                padding: 10,
                paddingTop: 15,
              }}
            >
              {limeMacroResultLoader ? (
                <Col>
                  <CircularProgress />
                </Col>
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
               <Row  style={{
              alignItems: "center",

              height: 40,
              justifyContent: "space-around",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}>
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
              유사한 경제 <br/>상황에서 중요했던 변수 1
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
              }}
            >
          유사한 경제 <br/>상황에서 중요했던 변수 2
            </div>
           
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
              }}
            >
             평균적으로 <br/>중요했던 변수 1
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
              }}
            >
        평균적으로 <br/>중요했던 변수 2
            </div>
          

          
 
                
                
                 </Row>
                 <Row
            style={{
              flexDirection: "column",
              height: "auto",

              // overflowY: "scroll",
            }}
          >
       {(limeMacroResult && limeMacroResult.length>0) && limeMacroResult.map((list, index) => {
                      return (
                        <Row
                        
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
                            {list.lime_var}
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
                            {list.lime_imp}
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
            </ShadowCol>
            <WhiteSpace height={30} />
          

            
           
          </Col>
        </>
      )}













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
            padding: 10,
            paddingTop: 15,
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
              <Row>
                EMP 기술의 월단위 성능과 시장 지표 (전체 ETF 평균) 비교
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
    </>
  );
}

export default DbInvestment;
