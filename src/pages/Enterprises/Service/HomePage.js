import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Arrow from "../../../assets/icons/arrow.png";
import RightArrow from "../../../assets/icons/rightArrow.png";

import color from "../../../style/color";
import { Col, Row, ShadowCol, WhiteSpace ,ShadowRow} from "../../../style/globalStyled";

import { Input, Button } from "@mui/material";
import { getDtData } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { resetDataState, saveDataState } from "../../../redux/slices/dataSlice";
import { AiOutlineCalendar } from "react-icons/ai";
import Calendar from "react-calendar";
import { Oval } from "react-loader-spinner";
import "./homepage.css";
import { useMediaQuery } from "react-responsive";
import { useTitle } from "../../../routing/DocumentNameChanger";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import classNames from "classnames";
import { CircularProgress } from "@mui/material";
import ApexChart from "react-apexcharts";
import "react-calendar/dist/Calendar.css";
import { useResponsive } from "../../../hooks/useResponsive";
import useWidth from "../../../hooks/useWidth"
import { Bar, Line } from "react-chartjs-2";
import moment from "moment";
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

const LineChart = ({ DailyData, WeeklyData, activeFlag }) => {
  const dailyData = DailyData;
  const weeklyData = WeeklyData;
  let dailyDates;
  let dailyLongValues;
  let dailyCashValues;
  let dailyShortValues;
  let chart_data
  if(dailyData!=undefined){
     dailyDates = dailyData.map((entry) => entry.date);
     dailyLongValues = dailyData.map((entry) => entry.adj_Long);
     dailyCashValues = dailyData.map((entry) => entry.adj_Cash);
     dailyShortValues = dailyData.map((entry) => entry.adj_Short);
 chart_data = {
      labels: dailyDates, // You can use either daily or weekly dates here
      datasets: [
        {
          label: "Long",
          data: dailyLongValues,
          borderColor: "rgb(255, 159, 64)",
          backgroundColor: "rgba(255, 159, 64, 0.5)",
          borderWidth: 1,
          fill: false,
          pointLabelFontColor: "rgba(0, 0, 0, 0)",
        },
        {
          label: "Cash",
          data: dailyCashValues,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderWidth: 1,
          fill: false,
          pointLabelFontColor: "rgba(0, 0, 0, 0)",
        },
        {
          label: "Short",
          data: dailyShortValues,
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderWidth: 1,
          fill: false,
          pointLabelFontColor: "rgba(0, 0, 0, 0)",
        },
        // Repeat the same structure for weekly data if needed
      ],
    };
  }
  // Extracting dates and values for each category
  let weeklyDates;
  let weeklyLongValues;
  let weeklyCashValues;
  let weeklyShortValues;
  let Weeklychart_data
  if(weeklyData!=undefined){
    weeklyDates = weeklyData.map((entry) => entry.date);
    weeklyLongValues = weeklyData.map((entry) => entry.adj_Long);
    weeklyCashValues = weeklyData.map((entry) => entry.adj_Cash);
    weeklyShortValues = weeklyData.map((entry) => entry.adj_Short);
     Weeklychart_data = {
      labels: weeklyDates, // You can use either daily or weekly dates here
      datasets: [
        {
          label: "Long",
          data: weeklyLongValues,
          borderColor: "rgb(255, 159, 64)",
          backgroundColor: "rgba(255, 159, 64, 0.5)",
          borderWidth: 1,
          fill: false,
          pointLabelFontColor: "rgba(0, 0, 0, 0)",
        },
        {
          label: "Cash",
          data: weeklyCashValues,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderWidth: 1,
          fill: false,
          pointLabelFontColor: "rgba(0, 0, 0, 0)",
        },
        {
          label: "Short",
          data: weeklyShortValues,
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderWidth: 1,
          fill: false,
          pointLabelFontColor: "rgba(0, 0, 0, 0)",
        },
        // Repeat the same structure for weekly data if needed
      ],
    };
  }
 
 

  

  const optionsDaily = {
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
        text: "Daily",
        fontSize: 20,
      },
    },
  };
  const optionsWeekly = {
    responsive: true,
    plugins: {
      // datalabels: {
      //   display: false, // Set to false to remove data labels
      // },
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
        text: "Weekly",
        fontSize: 20,
      },
    },
  };
  return (
    <div className="chart-container" style={{ width: "100%" }}>
      {(activeFlag == "Daily" && dailyData!=undefined) && (
        <Line data={chart_data} options={optionsDaily} />
      )}
      {(activeFlag == "Weekly" && weeklyData!=undefined ) &&(
        <Line data={Weeklychart_data} options={optionsWeekly} />
      )}
    </div>
  );
};
Modal.setAppElement("#root");

const HomePage = ({ scrollbarHandler }) => {
  const { responsiveValue } = useResponsive()
  const width = useWidth()
  useEffect(() => {
    scrollbarHandler(true);

    return () => {};
  }, []);
  useTitle("딥트레이드 엔터프라이즈");
  const isPc = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  const data_reducer = useSelector((state) => state.dataReducer);
  console.log("data_reducer", data_reducer);
  const initializeSelected = () => {
    let result;

    // Check for shannon_top5
    if (data_reducer.shannon_top5 != undefined) {
      if (Object.keys(data_reducer.shannon_top5).length > 0) {
        const keys = Object.keys(data_reducer.shannon_top5);

        result = keys[0];
        return result;
      }
    }

    // Check for shannon_top20
    if (data_reducer.shannon_top20 != undefined) {
      if (Object.keys(data_reducer.shannon_top20).length > 0) {
        const keys = Object.keys(data_reducer.shannon_top20);

        result = keys[0];

        return result;
      }
    }
    if (data_reducer.Daily != undefined) {
      return "Daily";
    } else {
      if (data_reducer.Weekly != undefined) {
        return "Weekly";
      }
    }
  };

  const initializeModelType = () => {
    if (data_reducer.shannon_top5 != undefined) {
      return "shannon_top5";
    } else {
      if (data_reducer.shannon_top20 != undefined) {
        return "shannon_top20";
      }
    }

    if (data_reducer.Daily != undefined) {
      return "Daily";
    } else {
      if (data_reducer.Weekly != undefined) {
        return "Weekly";
      }
    }
  };

  const [selected, setSelected] = useState(initializeSelected()); //1주 Top5
  const [modelType, setModelType] = useState(initializeModelType()); //"shannon_top5"

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
  const [asideButtonState, setAsideButtonState] = useState(
    data_reducer.shannon_stock ? "SHANNON_STOCK" : "SHANNON_INDEX"
  );
  const [tableDataList, setTableDataList] = useState(null);
  const [loader, setLoader] = useState(false);
  const [value, onChange] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const [topStockList, setTopStockList] = useState([[]]);
  const [open, setOpen] = useState(false);

  const [newInfo, setNewInfo] = useState([]);
  const [stockPrice, setStockPrice] = useState([]);
  const [movingAvgPrice, setMovingAvgPrice] = useState([]);
  const [loading, setLoding] = useState(false);
  const [profitList, setProfitList] = useState([{}, {}, {}, {}]);
  const [name, setName] = useState("주식이름");
  const [stockPriceLoader, setStockPriceLoader] = useState(false);
  const [newsLoding, setNewsLoding] = useState(false);
  const [relNewsLoding, setRelNewsLoding] = useState(false);
  const [directNewsList, setDirectNewsList] = useState([]);
  const [relatedNewsList, setRelatedNewsList] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [marketCapNews, setMarketCapNews] = useState([]);
  const [tradingVolNews, setTradingVolNews] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  // const history = useHistory()
  //   useEffect(() => {
  //     const fetchInfo = async () => {
  //       try {
  //         const { data } = await API.api.getStockList(); // 서버에서 정보 가져옴
  //         const { data: news_data } = await API.api.getNews({});
  //         setNewInfo(news_data);
  //         setTopStockList(data);
  //       } catch (e) {
  //         console.log(e);
  //       } finally {
  //       }
  //     };
  //     fetchInfo();
  //   }, [date]);

  const fetchInfo = async (currentdate) => {
    resetDataState();
    setLoader(true);
    const res = await getDtData.fetchDtData(
      user_info_reducer.company_name,
      currentdate
    );
    if (res.status === 200) {
      dispatch(saveDataState(res.data));

      setLoader(false);
    } else {
      setLoader(false);
      console.log("something went wrong");
    }
  };
  useEffect(() => {
    let isComponentRender = true;
    if (isComponentRender) {
      fetchInfo(currentSelectedDate);
    }

    return () => {
      isComponentRender = false;
    };
  }, []);

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
    fetchInfo(formattedDate);
  };
  useEffect(() => {
    let isComponentRender = true;

    if (isComponentRender) {
      setLoader(true);
      if (data_reducer) {
        if (selected != "" && asideButtonState != "") {
          if (asideButtonState === "SHANNON_STOCK") {
            Object.keys(data_reducer).forEach((key) => {
              const value = data_reducer[key];
              if (value != undefined) {
                if (modelType === key) {
                  Object.keys(value).forEach((innerKey) => {
                    if (innerKey === selected) {
                      setTableDataList(value[innerKey]);
                    }
                  });
                }
              }
            });
          } else if (asideButtonState === "SHANNON_INDEX") {
            Object.keys(data_reducer).forEach((key) => {
              const value = data_reducer[key];
              if (value != undefined) {
                if (modelType === key) {
                  setTableDataList(value);
                }
              }
            });
          } else {
            console.log("Model does not match");
          }
        }
      }
    }
    setLoader(false);
    setOpen(false);
    return () => {
      isComponentRender = false;
    };
  }, [selected, modelType, data_reducer]);
  const [selectedStockId, setSelectedStockId] = useState(() => {
    if (asideButtonState === "SHANNON_STOCK") {
      if (tableDataList && tableDataList.length > 0) {
        return tableDataList[0].stock_id;
      }
    }
  });
  const fetchStockInfo = async () => {
    try {
      setStockPriceLoader(true);

      const { data } = await getDtData.getDTStockInfo(selectedStockId);

      const profit_dict = data.profit_lst;
      const price_list = data.price_lst;
      const mov_avg_lst = data.mov_avg_lst;
      const stock_info_dict = data.stock_info_lst;

      const temp = price_list.map((v, idx) => {
        // const endPrice = Math.round(mov_avg_lst[idx].price);
        const startPrice = price_list?.[idx - 1]?.price || v.price
        return {
          x: new Date(v.date),
          y: [startPrice, v.high, v.low, v.price],
        };
      });
      setMovingAvgPrice(mov_avg_lst.map((v) => {
        return {
          x: new Date(v.date),
          y: v.price
        }
      }))
      setStockPrice(temp);
      setName(stock_info_dict?.name);
      //profit list
      setProfitList([
        { title: "1주", value: Math.round(profit_dict["one_week"] * 10) / 10 },
        { title: "2주", value: Math.round(profit_dict["two_weeks"] * 10) / 10 },
        {
          title: "4주",
          value: Math.round(profit_dict["four_weeks"] * 10) / 10,
        },
        {
          title: "8주",
          value: Math.round(profit_dict["eight_weeks"] * 10) / 10,
        },
      ]);

      setStockPriceLoader(false);
    } catch (e) {
      toast("데이터를 가져오지 못했습니다. 다시 시도하세요.");
      // alert("오류 발생");
      setStockPriceLoader(false);
    }
  };
  useEffect(() => {
    if (asideButtonState === "SHANNON_STOCK") {
      if (tableDataList && tableDataList.length > 0) {
        setSelectedStockId(tableDataList[0].stock_id);
      }
    }
  }, [tableDataList]);
  // 직접 관련 뉴스
  const fetchDirectNewslist = async () => {
    setNewsLoding(true);
   
    try {
      const { data } = await getDtData.getRelatedNews({
        ticker: selectedStockId,
        contains_stock_name: 1,
      });

      setDirectNewsList(data.news_list);
      setNewsLoding(false);
    } catch (e) {
      toast("데이터를 가져오지 못했습니다. 다시 시도하세요.");
      // alert("오류 발생");
    } finally {
      setNewsLoding(false);
    }
  };
  //간접적인 관련 뉴스
  const fetchRelatedNewslist = async () => {
    setRelNewsLoding(true);
  
    try {
      const { data } = await getDtData.getRelatedNews({
        ticker: selectedStockId,
        contains_stock_name: 0,
      });

      setRelatedNewsList(data.news_list);
      setRelNewsLoding(false);
    } catch (e) {
      toast("데이터를 가져오지 못했습니다. 다시 시도하세요.");
      // alert("오류 발생");
    } finally {
      setRelNewsLoding(false);
    }
  };
  useEffect(() => {
    let isComponentRender = true;
    if (isComponentRender) {
      if (selectedStockId) {
        fetchStockInfo();
        fetchDirectNewslist();
        fetchRelatedNewslist();
      }
    }
    return () => {
      isComponentRender = false;
    };
  }, [selectedStockId]);

  const fetchNewsSummary = async () => {
    setSummaryLoading(true);
    
    const res_summary = await getDtData.getNewsSummary();

    if (res_summary.status == 200) {
      setMarketCapNews(res_summary.data.market_cap_news);
      setTradingVolNews(res_summary.data.trading_vol_news);
    } else {
      setMarketCapNews([]);
      setTradingVolNews([]);
    }
    setSummaryLoading(false);
  };
  useEffect(() => {
    if (asideButtonState === "SHANNON_INDEX") {
      fetchNewsSummary();
    }

    return () => {};
  }, [asideButtonState]);

  // const state = {
  //   series: [
  //     {
  //       data: stockPrice,
  //     },
  //   ],
  //   options: {
  //     chart: {
  //       type: "candlestick",
  //       height: 350,
  //       toolbar: {
  //         show: true,
  //       },
  //       background: "transparent",
  //     },
  //     stroke: {
  //       curve: "smooth",
  //       width: 1,
  //     },
  //     title: {
  //       text: name,
  //       align: "left",
  //     },
  //     xaxis: {
  //       type: "datetime",
        
  //     },
  //     yaxis: {
  //       tooltip: {
  //         enabled: false,
  //       },
  //       labels: {
  //         formatter: function (val) {
  //           // console.log(val);
  //           // with comma
  //           return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //           // override the val here
  //         },
  //       },
  //     },
  //   },
  // };
  
  const options = {

    title: {
      text: name,
      align: 'left'
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter: function (val) {
          return moment(val).format('YYYY-MM-DD')
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: false
      },
      labels: {
        formatter: function (val) {
          console.log(val);
          // with comma
          return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          // override the val here
        }
      }
    }
  }

  const series = [{
    name: '캔들차트',
    type: 'candlestick',
    data: stockPrice
  }, {
    name: '이동평균',
    type: 'line',
    data: movingAvgPrice
  },]


  const state = {
    series,
    options
  };

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

  // return (
  //   <Row
  //     style={{
  //       height: "auto",
  //       alignItems: "flex-start",
  //     }}
  //   >
  //     <ShadowCol
  //       style={{
  //         width: 160,
  //         height: 820,
  //         padding: 20,
  //         justifyContent: "flex-start",
  //       }}
  //     >
  //       <Row style={{ height: "auto" }}>
  //         <div style={{ fontWeight: "bold", flex: 1, cursor: "pointer" }}>
  //           {data_reducer && data_reducer.shannon_stock == true && (
  //             <Button
  //               onClick={() => {
  //                 setAsideButtonState("SHANNON_STOCK");

  //                 const modelres = initializeModelType();

  //                 setModelType(modelres);
  //                 const res = initializeSelected();

  //                 setSelected(res);
  //               }}
  //               style={{
  //                 borderRadius: 5,
  //                 width: "145px",
  //                 marginBottom: "10px",
  //                 color: "#FFF",
  //                 backgroundColor:
  //                   asideButtonState === "SHANNON_STOCK"
  //                     ? color.Purple
  //                     : "rgb(119 119 119)",
  //               }}
  //             >
  //               Shannon 개별종목
  //             </Button>
  //           )}
  //           {data_reducer && data_reducer.shannon_index == true && (
  //             <Button
  //               onClick={() => {
  //                 setAsideButtonState("SHANNON_INDEX");
  //                 if (data_reducer.Daily != undefined) {
  //                   setModelType("Daily");
  //                   setSelected("Daily");
  //                 } else {
  //                   if (data_reducer.Weekly != undefined) {
  //                     setModelType("Weekly");
  //                     setSelected("Weekly");
  //                   }
  //                 }
  //               }}
  //               style={{
  //                 borderRadius: 5,
  //                 width: "145px",
  //                 marginBottom: "10px",
  //                 color: "#FFF",
  //                 backgroundColor:
  //                   asideButtonState === "SHANNON_INDEX"
  //                     ? color.Purple
  //                     : "rgb(119 119 119)",
  //               }}
  //             >
  //               Shannon 지수
  //             </Button>
  //           )}
  //         </div>
  //       </Row>
  //     </ShadowCol>
  //     <WhiteSpace width={20} />
  //     <Col
  //       style={{
  //         width: 860,
  //         justifyContent: "flex-start",
  //         height: "auto",
  //       }}
  //     >
  //       <Row
  //         style={{
  //           height: 50,
  //           justifyContent: "flex-start",
  //           alignItems: "center",
  //           // padding: "0px 30px",
  //           width: "860px",
  //         }}
  //       >
  //         <div
  //           style={{
  //             color: "#515050",
  //             fontSize: 18,
  //             fontWeight: 500,
  //             textAlign: "center",
  //           }}
  //         >
  //           {asideButtonState === "SHANNON_STOCK"
  //             ? "딥트레이드테크놀로지스에서 개발한 주가 예측 모델, Shannon으로 예측하여 전체 주가 방향성을 산출하고 이를 바탕으로한 추천하는 상위 종목들을 보여줍니다."
  //             : "딥트레이드테크놀로지스에서 개발한 위험 관리 시스템으로 시장 움직임을 예측하여 롱숏 포트폴리오 비중을 산출하여 투자 방향성을 보여줍니다."}
  //         </div>
  //       </Row>
  //       <WhiteSpace width={20} />
  //       {asideButtonState === "SHANNON_STOCK" && (
  //         <Row
  //           style={{
  //             height: 50,
  //             justifyContent: "flex-start",
  //             alignItems: "center",
  //           }}
  //         >
  //           <div className="enterprise_content_right_right_calendar_pc">
  //             <div
  //               onClick={() => setShowCalendar(!showCalendar)}
  //               className="calendar_icon"
  //             >
  //               <AiOutlineCalendar size={25} />
  //               {showCalendar ? convertDate() : convertDate()}
  //             </div>
  //             <Modal
  //               isOpen={showCalendar}
  //               onRequestClose={closeModal}
  //               style={customStyles}
  //             >
  //               <Calendar
  //                 calendarType="US"
  //                 locale="ko"
  //                 defaultActiveStartDate={selectedDate}
  //                 onClickDay={(date) => handleDateSelection(date)}
  //                 onChange={onChange}
  //                 value={value}
  //                 minDate={minDate}
  //                 maxDate={maxDate}
  //                 tileClassName={({ date, view }) => {
  //                   const isHovered = view === "month" || view === "year"; // Define hoverable views (month/year)

  //                   return classNames({
  //                     "selected-date":
  //                       date.toDateString() === selectedDate.toDateString(),
  //                   });
  //                 }}
  //                 tileDisabled={({ date }) => isDateDisabled(date)}
  //               />
  //             </Modal>
  //           </div>
  //         </Row>
  //       )}
  //       <WhiteSpace height={20} />
  //       {/* Sub button */}
  //       <Col
  //         style={{
  //           width: 860,
  //           justifyContent: "flex-start",
  //           height: "auto",
  //         }}
  //       >
  //         <Row style={{ height: "auto" }}>
  //           <div style={{ fontWeight: "bold", flex: 1, cursor: "pointer" }}>
  //             {asideButtonState === "SHANNON_STOCK"
  //               ? Object.keys(data_reducer).map((key) => {
  //                   const value = data_reducer[key];

  //                   if (key === "shannon_top5") {
  //                     if (value != undefined) {
  //                       return Object.keys(value).map((innerKey) => {
  //                         return (
  //                           <Button
  //                             key={innerKey} // Add a unique key for each button
  //                             style={{
  //                               marginBottom: "10px",
  //                               marginRight: "10px",
  //                               color: "#FFF",
  //                               backgroundColor:
  //                                 selected === innerKey
  //                                   ? color.Purple
  //                                   : "rgb(100 100 100)",
  //                             }}
  //                             className="enterprise_content_right_left_button_pc"
  //                             onClick={() => {
  //                               setSelected(innerKey);
  //                               setModelType(key);
  //                               // Your click handler logic here
  //                             }}
  //                           >
  //                             {innerKey}
  //                           </Button>
  //                         );
  //                       });
  //                     }
  //                   }
  //                   //for top 20

  //                   if (key === "shannon_top20") {
  //                     if (value != undefined) {
  //                       return Object.keys(value).map((innerKey) => {
  //                         return (
  //                           <Button
  //                             key={innerKey} // Add a unique key for each button
  //                             style={{
  //                               marginBottom: "10px",
  //                               marginRight: "10px",
  //                               color: "#FFF",
  //                               backgroundColor:
  //                                 selected === innerKey
  //                                   ? color.Purple
  //                                   : "rgb(100 100 100)",
  //                             }}
  //                             className="enterprise_content_right_left_button_pc"
  //                             onClick={() => {
  //                               setSelected(innerKey);
  //                               setModelType(key);
  //                               // Your click handler logic here
  //                             }}
  //                           >
  //                             {innerKey}
  //                           </Button>
  //                         );
  //                       });
  //                     }
  //                   }

  //                   return null; // Return null for other keys if you don't want to render anything
  //                 })
  //               : asideButtonState === "SHANNON_INDEX"
  //               ? Object.keys(data_reducer).map((key) => {
  //                   const value = data_reducer[key];

  //                   if (key === "Daily") {
  //                     if (value != undefined) {
  //                       return (
  //                         <Button
  //                           style={{
  //                             marginBottom: "10px",
  //                             marginRight: "10px",
  //                             color: "#FFF",
  //                             backgroundColor:
  //                               selected === key
  //                                 ? color.Purple
  //                                 : "rgb(100 100 100)",
  //                           }}
  //                           className="enterprise_content_right_left_button_pc"
  //                           onClick={() => {
  //                             setSelected(key);
  //                             setModelType(key);
  //                           }}
  //                         >
  //                           {key}
  //                         </Button>
  //                       );
  //                     }
  //                   }
  //                   if (key === "Weekly") {
  //                     if (key != undefined) {
  //                       return (
  //                         <Button
  //                           style={{
  //                             marginBottom: "10px",
  //                             marginRight: "10px",
  //                             color: "#FFF",
  //                             backgroundColor:
  //                               selected === key
  //                                 ? color.Purple
  //                                 : "rgb(100 100 100)",
  //                           }}
  //                           className="enterprise_content_right_left_button_pc"
  //                           onClick={() => {
  //                             setSelected(key);
  //                             setModelType(key);
  //                           }}
  //                         >
  //                           {key}
  //                         </Button>
  //                       );
  //                     }
  //                   }

  //                   return null; // Return null for other keys if you don't want to render anything
  //                 })
  //               : null}
  //           </div>
  //         </Row>
  //       </Col>
  //       {/* End of Sub Buttons */}
  //       <WhiteSpace height={20} />

  //       <ShadowCol
  //         style={{
  //           boxSizing: "border-box",
  //           height: "auto",
  //           transition: "all 0.3s ease-in-out",
  //           // overflowY: "scroll",
  //           borderRadius: 0,
  //         }}
  //       >
  //         <Row
  //           style={{
  //             flex: 1,
  //             alignItems: "flex-start",
  //             flexDirection: "column",

  //             justifyContent: "flex-start",
  //           }}
  //         >
  //           {selected &&
  //           tableDataList &&
  //           asideButtonState === "SHANNON_STOCK" ? (
  //             <>
  //               <Row
  //                 style={{
  //                   alignItems: "center",

  //                   height: 40,
  //                   justifyContent: "space-around",
  //                   borderTopLeftRadius: "10px",
  //                   borderTopRightRadius: "10px",
  //                 }}
  //               >
  //                 <div
  //                   style={{
  //                     width: 110,
  //                     display: "table-cell",
  //                     fontWeight: 700,
  //                     transition: "all 0.3s ease-in-out",
  //                   }}
  //                 >
  //                   Stock ID
  //                 </div>
  //                 <div
  //                   style={{
  //                     width: 110,
  //                     display: "table-cell",
  //                     fontWeight: 700,
  //                     transition: "all 0.3s ease-in-out",
  //                   }}
  //                 >
  //                   Name
  //                 </div>
  //                 <div
  //                   style={{
  //                     width: 110,
  //                     display: "table-cell",
  //                     fontWeight: 700,
  //                     transition: "all 0.3s ease-in-out",
  //                   }}
  //                 >
  //                   Buying Date
  //                 </div>
  //                 <div
  //                   style={{
  //                     width: 110,
  //                     display: "table-cell",
  //                     fontWeight: 700,
  //                     transition: "all 0.3s ease-in-out",
  //                   }}
  //                 >
  //                   Selling Date
  //                 </div>
  //                 <div
  //                   style={{
  //                     width: 110,
  //                     display: "table-cell",
  //                     fontWeight: 700,
  //                     transition: "all 0.3s ease-in-out",
  //                   }}
  //                 >
  //                   Sector
  //                 </div>
  //               </Row>
  //               <Row
  //                 style={{
  //                   flexDirection: "column",
  //                   height: "auto",
  //                 }}
  //               >
  //                 {loader ? (
  //                   <Oval
  //                     height={40}
  //                     width={40}
  //                     color="rgb(86, 68, 252)"
  //                     wrapperStyle={{
  //                       alignItems: "center",
  //                       justifyContent: "center",
  //                       margin: 10,
  //                     }}
  //                     wrapperClass=""
  //                     visible={true}
  //                     ariaLabel="oval-loading"
  //                     secondaryColor="rgb(86, 68, 252)"
  //                     strokeWidth={2}
  //                     strokeWidthSecondary={2}
  //                   />
  //                 ) : (
  //                   <>
  //                     {selectedStockId &&
  //                       tableDataList &&
  //                       tableDataList
  //                         .slice(0, open ? tableDataList.length : 5)
  //                         .map((list, index) => {
  //                           return (
  //                             <Row
  //                               onClick={() => {
  //                                 setSelectedStockId(list.stock_id);
  //                               }}
  //                               style={{
  //                                 backgroundColor:
  //                                   selectedStockId === list.stock_id
  //                                     ? "#f3f3f3"
  //                                     : "",
  //                                 height: 50,
  //                                 justifyContent: "space-around",
  //                                 alignItems: "center",
  //                               }}
  //                             >
  //                               <div
  //                                 style={{
  //                                   width: 110,
  //                                   height: "auto",
  //                                   overflow: "hidden",
  //                                   display: "table-cell",
  //                                   justifyContent: "space-around",
  //                                   cursor: "pointer",
  //                                   transition: "all 0.3s ease-in-out",
  //                                 }}
  //                               >
  //                                 {list.stock_id}
  //                               </div>
  //                               <div
  //                                 style={{
  //                                   width: 110,
  //                                   height: "auto",
  //                                   display: "table-cell",
  //                                   justifyContent: "space-around",
  //                                   cursor: "pointer",
  //                                   transition: "all 0.3s ease-in-out",
  //                                   overflow: "hidden",
  //                                 }}
  //                               >
  //                                 {list.name}
  //                               </div>
  //                               <div
  //                                 style={{
  //                                   width: 110,
  //                                   height: "auto",
  //                                   display: "table-cell",
  //                                   justifyContent: "space-around",
  //                                   cursor: "pointer",
  //                                   transition: "all 0.3s ease-in-out",
  //                                 }}
  //                               >
  //                                 {list.buying_date}
  //                               </div>
  //                               <div
  //                                 style={{
  //                                   width: 110,
  //                                   height: "auto",
  //                                   display: "table-cell",
  //                                   justifyContent: "space-around",
  //                                   cursor: "pointer",
  //                                   transition: "all 0.3s ease-in-out",
  //                                 }}
  //                               >
  //                                 {list.selling_date}
  //                               </div>
  //                               <div
  //                                 style={{
  //                                   width: 110,
  //                                   height: "auto",
  //                                   display: "table-cell",
  //                                   justifyContent: "space-around",
  //                                   cursor: "pointer",
  //                                   transition: "all 0.3s ease-in-out",
  //                                 }}
  //                               >
  //                                 {list.sector}
  //                               </div>
  //                             </Row>
  //                           );
  //                         })}
  //                   </>
  //                 )}
  //               </Row>
  //             </>
  //           ) : (
  //             <Col
  //               style={{
  //                 flex: 1,
  //                 alignItems: "flex-start",
  //                 justifyContent: "flex-start",
  //               }}
  //             >
  //               <Row
  //                 style={{
  //                   alignItems: "center",

  //                   height: 40,
  //                   justifyContent: "space-around",
  //                   borderTopLeftRadius: "10px",
  //                   borderTopRightRadius: "10px",
  //                 }}
  //               >
  //                 <div
  //                   style={{
  //                     width: 110,
  //                     display: "table-cell",
  //                     fontWeight: 700,
  //                     transition: "all 0.3s ease-in-out",
  //                   }}
  //                 >
  //                   Date
  //                 </div>
  //                 <div
  //                   style={{
  //                     width: 110,
  //                     display: "table-cell",
  //                     fontWeight: 700,
  //                     transition: "all 0.3s ease-in-out",
  //                   }}
  //                 >
  //                   Long
  //                 </div>
  //                 <div
  //                   style={{
  //                     width: 110,
  //                     display: "table-cell",
  //                     fontWeight: 700,
  //                     transition: "all 0.3s ease-in-out",
  //                   }}
  //                 >
  //                   Cash
  //                 </div>
  //                 <div
  //                   style={{
  //                     width: 110,
  //                     display: "table-cell",
  //                     fontWeight: 700,
  //                     transition: "all 0.3s ease-in-out",
  //                   }}
  //                 >
  //                   Short
  //                 </div>
  //               </Row>
  //               <Row
  //                 style={{
  //                   flexDirection: "column",
  //                   height: "auto",

  //                   // overflowY: "scroll",
  //                 }}
  //               >
  //                 {loader ? (
  //                   <Oval
  //                     height={50}
  //                     width={50}
  //                     color="#4fa94d"
  //                     wrapperStyle={{
  //                       alignItems: "center",
  //                       justifyContent: "center",
  //                     }}
  //                     wrapperClass=""
  //                     visible={true}
  //                     ariaLabel="oval-loading"
  //                     secondaryColor="#4fa94d"
  //                     strokeWidth={2}
  //                     strokeWidthSecondary={2}
  //                   />
  //                 ) : (
  //                   <>
  //                     {tableDataList &&
  //                       tableDataList
  //                         .slice(0, open ? tableDataList.length : 10)
  //                         .map((list, index) => {
  //                           return (
  //                             <Row
  //                               style={{
  //                                 height: 50,
  //                                 justifyContent: "space-around",
  //                                 alignItems: "center",

  //                                 // overflowY: "scroll",
  //                               }}
  //                             >
  //                               <div
  //                                 style={{
  //                                   width: 110,
  //                                   height: "auto",
  //                                   overflow: "hidden",
  //                                   display: "table-cell",
  //                                   justifyContent: "space-around",
  //                                   cursor: "pointer",
  //                                   transition: "all 0.3s ease-in-out",
  //                                 }}
  //                               >
  //                                 {list.date}
  //                               </div>
  //                               <div
  //                                 style={{
  //                                   width: 110,
  //                                   height: "auto",
  //                                   display: "table-cell",
  //                                   justifyContent: "space-around",
  //                                   cursor: "pointer",
  //                                   transition: "all 0.3s ease-in-out",
  //                                   overflow: "hidden",
  //                                 }}
  //                               >
  //                                 {list.adj_Long}
  //                               </div>
  //                               <div
  //                                 style={{
  //                                   width: 110,
  //                                   height: "auto",
  //                                   display: "table-cell",
  //                                   justifyContent: "space-around",
  //                                   cursor: "pointer",
  //                                   transition: "all 0.3s ease-in-out",
  //                                 }}
  //                               >
  //                                 {list.adj_Cash}
  //                               </div>
  //                               <div
  //                                 style={{
  //                                   width: 110,
  //                                   height: "auto",
  //                                   display: "table-cell",
  //                                   justifyContent: "space-around",
  //                                   cursor: "pointer",
  //                                   transition: "all 0.3s ease-in-out",
  //                                 }}
  //                               >
  //                                 {list.adj_Short}
  //                               </div>
  //                             </Row>
  //                           );
  //                         })}
  //                   </>
  //                 )}
  //               </Row>
  //             </Col>
  //           )}
  //         </Row>
  //         <a
  //           onClick={() => {
  //             setOpen((prev) => !prev);
  //           }}
  //           style={{
  //             cursor: "pointer",
  //             transform: `rotate(${open ? 180 : 0}deg)`,
  //             margin: 10,
  //           }}
  //         >
  //           <img src={Arrow} style={{ width: 15, height: 15 }} />
  //         </a>
  //       </ShadowCol>
  //       <WhiteSpace height={20} />
  //       {/* Stock Page */}
  //       {/* Chart for shannon index */}
  //       {asideButtonState === "SHANNON_INDEX" && (
  //         <>
  //           <Col
  //             style={{
  //               // width: 840,
  //               justifyContent: "flex-start",
  //               paddingBottom: 20,
  //               height: "auto",
  //             }}
  //           >
  //             <ShadowCol
  //               style={{
  //                 // width: 840,
  //                 height: "auto",
  //                 padding: 10,
  //                 paddingTop: 15,
  //                 justifyContent: "flex-start",
  //               }}
  //             >
  //               {data_reducer && (
  //                 <LineChart
  //                   DailyData={data_reducer.Daily}
  //                   WeeklyData={data_reducer.Weekly}
  //                   activeFlag={modelType}
  //                 />
  //               )}
  //             </ShadowCol>
  //           </Col>
  //         </>
  //       )}
  //       {/* if shannon index is active then show the news summary  */}
  //       {asideButtonState === "SHANNON_INDEX" && (
  //         <>
  //           <Col
  //             style={{
  //               // width: 840,
  //               justifyContent: "flex-start",
  //               paddingBottom: 20,
  //               height: "auto",
  //             }}
  //           >
  //             <ShadowCol
  //               style={{
  //                 // width: 840,
  //                 height: "auto",
  //                 padding: 10,
  //                 paddingTop: 15,
  //                 justifyContent: "flex-start",
  //               }}
  //             >
  //               <div
  //                 style={{
  //                   fontSize: 16,
  //                   fontWeight: "bold",
  //                   color: color.DarkBlue,
  //                   width: "100%",
  //                   textAlign: "center",
  //                 }}
  //               >
  //                 섀넌의 한국 증시 요약
  //               </div>
  //               <WhiteSpace height={20} />
  //               {summaryLoading ? (
  //                 <CircularProgress />
  //               ) : marketCapNews?.length == 0 ? (
  //                 <div
  //                   style={{
  //                     fontSize: 15,
  //                     fontWeight: "bold",
  //                     color: color.DarkBlue,
  //                     width: "100%",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   뉴스 데이터를 불러오지 못했습니다.
  //                 </div>
  //               ) : (
  //                 <>
  //                   <div
  //                     style={{
  //                       fontSize: 15,
  //                       fontWeight: "bold",
  //                       color: color.LightPurple,
  //                       width: "100%",
  //                       textAlign: "left",
  //                     }}
  //                   >
  //                     시가총액 상위 기준
  //                   </div>
  //                   <WhiteSpace height={20} />
  //                   {marketCapNews?.map((item, index) => {
  //                     if (item.top_summary_flag != 1) {
  //                       return (
  //                         <Row
  //                           key={index}
  //                           style={{
  //                             height: "auto",
  //                             marginBottom: 12,
  //                             cursor: "pointer",
  //                             justifyContent: "flex-start",
  //                           }}
  //                         >
  //                           <Col
  //                             style={{
  //                               width: 130,
  //                               alignItems: "flex-start",
  //                               marginRight: 10,
  //                             }}
  //                           >
  //                             <Col
  //                               style={{
  //                                 // width: "auto",
  //                                 height: "auto",
  //                                 padding: 10,
  //                                 borderRadius: 5,
  //                                 backgroundColor: color.BackgroundPurple,
  //                                 fontSize:
  //                                   item.ticker.trim().length > 7 ? 12 : 14,
  //                               }}
  //                             >
  //                               {item.ticker.trim()}
  //                             </Col>
  //                           </Col>
  //                           <Col
  //                             style={{
  //                               // width: 120,
  //                               flexDirection: "column",

  //                               alignItems: "flex-start",
  //                               marginRight: 10,
  //                             }}
  //                           >
  //                             <Row
  //                               style={{
  //                                 justifyContent: "flex-start",
  //                                 fontSize: 15,
  //                               }}
  //                             >
  //                               {item.summary_text.trim()}
  //                             </Row>
  //                           </Col>
  //                         </Row>
  //                       );
  //                     }
  //                   })}
  //                   <WhiteSpace height={20} />
  //                   <div
  //                     style={{
  //                       width: "100%",
  //                       border: "0.5px solid #A3A1FF",
  //                     }}
  //                   ></div>
  //                   <WhiteSpace height={20} />
  //                   <div
  //                     style={{
  //                       fontSize: 15,
  //                       fontWeight: "bold",
  //                       color: color.LightPurple,
  //                       width: "100%",
  //                       textAlign: "left",
  //                     }}
  //                   >
  //                     거래 금액 기준
  //                   </div>
  //                   <WhiteSpace height={20} />
  //                   {tradingVolNews?.map((item, index) => {
  //                     if (item.top_summary_flag != 1) {
  //                       return (
  //                         <Row
  //                           key={index}
  //                           style={{
  //                             height: "auto",
  //                             marginBottom: 12,
  //                             cursor: "pointer",
  //                             justifyContent: "flex-start",
  //                           }}
  //                         >
  //                           <Col
  //                             style={{
  //                               width: 130,
  //                               alignItems: "flex-start",
  //                               marginRight: 10,
  //                             }}
  //                           >
  //                             <Col
  //                               style={{
  //                                 // width: "auto",
  //                                 height: "auto",
  //                                 padding: 10,
  //                                 borderRadius: 5,
  //                                 backgroundColor: color.BackgroundPurple,
  //                                 fontSize:
  //                                   item.ticker.trim().length > 7 ? 12 : 14,
  //                               }}
  //                             >
  //                               {item.ticker.trim()}
  //                             </Col>
  //                           </Col>
  //                           <Col
  //                             style={{
  //                               // width: 120,
  //                               flexDirection: "column",

  //                               alignItems: "flex-start",
  //                               marginRight: 10,
  //                             }}
  //                           >
  //                             <Row
  //                               style={{
  //                                 justifyContent: "flex-start",
  //                                 fontSize: 15,
  //                               }}
  //                             >
  //                               {item.summary_text.trim()}
  //                             </Row>
  //                           </Col>
  //                         </Row>
  //                       );
  //                     }
  //                   })}
  //                 </>
  //               )}
  //             </ShadowCol>
  //           </Col>
  //         </>
  //       )}
  //       {/* if shannon stock is active then show the stock detail page  */}
  //       {asideButtonState === "SHANNON_STOCK" && (
  //         <>
  //           <Col
  //             style={{
  //               // width: 840,
  //               justifyContent: "flex-start",
  //               height: "auto",
  //               paddingBottom: 20,
  //             }}
  //           >
  //             <ShadowCol
  //               style={{
  //                 // width: 840,
  //                 height: 325,
  //                 padding: 10,
  //                 paddingTop: 15,
  //               }}
  //             >
  //               {stockPriceLoader ? (
  //                 <Col>
  //                   <CircularProgress />
  //                 </Col>
  //               ) : stockPrice.length > 0 ? (
  //                 <ApexChart
  //                   width={800}
  //                   height={275}
  //                   options={state.options}
  //                   series={state.series}
  //                   type="candlestick"
  //                 />
  //               ) : (
  //                 <div
  //                   style={{
  //                     fontSize: 14,
  //                     fontWeight: "bold",
  //                     color: color.DarkBlue,
  //                     width: "100%",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   차트 데이터를 불러오지 못했습니다.
  //                 </div>
  //               )}
  //             </ShadowCol>
  //             <WhiteSpace height={30} />
  //             <ShadowCol
  //               style={{
  //                 // width: 840,
  //                 height: 120,
  //                 padding: 15,
  //                 paddingTop: 15,
  //                 justifyContent: "flex-start",
  //               }}
  //             >
  //               <div
  //                 style={{
  //                   fontSize: 14,
  //                   fontWeight: "bold",
  //                   color: color.DarkBlue,
  //                   width: "100%",
  //                   textAlign: "left",
  //                 }}
  //               >
  //                 기간별 수익률
  //               </div>
  //               {stockPriceLoader ? (
  //                 <Col>
  //                   <CircularProgress />
  //                 </Col>
  //               ) : profitList.length > 0 ? (
  //                 <Row
  //                   style={{
  //                     flex: 1,
  //                     justifyContent: "space-between",
  //                     paddingLeft: 10,
  //                     paddingRight: 10,
  //                   }}
  //                 >
  //                   {profitList?.map((v) => {
  //                     return (
  //                       <Row
  //                         width={109}
  //                         height={47}
  //                         style={{
  //                           backgroundColor: color.BackgroundPurple,
  //                           borderRadius: 10,
  //                           fontWeight: "bold",
  //                         }}
  //                       >
  //                         <Col
  //                           width={36}
  //                           height={36}
  //                           style={{
  //                             borderRadius: 18,
  //                             backgroundColor: color.Purple,
  //                             color: "white",
  //                             fontWeight: "bold",
  //                           }}
  //                         >
  //                           {v.title}
  //                         </Col>
  //                         <WhiteSpace width={12} />
  //                         {v.value}%
  //                       </Row>
  //                     );
  //                   })}
  //                 </Row>
  //               ) : (
  //                 <div
  //                   style={{
  //                     fontSize: 14,
  //                     fontWeight: "bold",
  //                     color: color.DarkBlue,
  //                     width: "100%",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   데이터를 불러오지 못했습니다.
  //                 </div>
  //               )}
  //             </ShadowCol>
  //             <WhiteSpace height={30} />
  //             <ShadowCol
  //               style={{
  //                 // width: 840,
  //                 height: "auto",
  //                 padding: 15,
  //                 paddingTop: 15,
  //                 justifyContent: "flex-start",
  //               }}
  //             >
  //               <div
  //                 style={{
  //                   fontSize: 14,
  //                   fontWeight: "bold",
  //                   color: color.DarkBlue,
  //                   width: "100%",
  //                   textAlign: "left",
  //                 }}
  //               >
  //                 종목 뉴스
  //               </div>
  //               <WhiteSpace height={15} />
  //               {newsLoding ? (
  //                 <Col
  //                   style={{
  //                     width: 840,
  //                   }}
  //                 >
  //                   <CircularProgress />
  //                 </Col>
  //               ) : (
  //                 <Col style={{ flex: 1 }}>
  //                   {directNewsList?.length > 0 ? (
  //                     directNewsList?.map((item) => {
  //                       return (
  //                         <Row
  //                           onClick={() => {
  //                             window.open(item.naver_url);
  //                           }}
  //                           key={item.id}
  //                           style={{
  //                             height: 40,
  //                             marginBottom: 12,
  //                             cursor: "pointer",
  //                             justifyContent: "flex-start",
  //                           }}
  //                         >
  //                           <Col
  //                             style={{
  //                               width: 130,
  //                               alignItems: "flex-start",
  //                               marginRight: 10,
  //                             }}
  //                           >
  //                             <Col
  //                               style={{
  //                                 // width: "auto",
  //                                 height: "auto",
  //                                 padding: 10,
  //                                 borderRadius: 5,
  //                                 backgroundColor: color.BackgroundPurple,
  //                                 fontSize: item.press.length > 6 ? 12 : 16,
  //                               }}
  //                             >
  //                               {item.press}
  //                             </Col>
  //                           </Col>
  //                           <Col
  //                             style={{
  //                               // width: 120,
  //                               flexDirection: "column",

  //                               alignItems: "flex-start",
  //                               marginRight: 10,
  //                             }}
  //                           >
  //                             <Row
  //                               style={{
  //                                 justifyContent: "flex-start",
  //                               }}
  //                             >
  //                               {item.headline}
  //                             </Row>
  //                             <Row
  //                               style={{
  //                                 justifyContent: "flex-start",
  //                                 fontSize: 12,
  //                                 color: "rgb(126 126 126)",
  //                               }}
  //                             >
  //                               {new Date(item.timestamp * 1000)
  //                                 .toISOString()
  //                                 .substring(0, 10)}
  //                             </Row>
  //                           </Col>
  //                         </Row>
  //                       );
  //                     })
  //                   ) : (
  //                     <div
  //                       style={{
  //                         fontSize: 14,
  //                         fontWeight: "bold",
  //                         color: color.DarkBlue,
  //                         width: "100%",
  //                         textAlign: "center",
  //                       }}
  //                     >
  //                       데이터를 불러오지 못했습니다.
  //                     </div>
  //                   )}
  //                 </Col>
  //               )}
  //             </ShadowCol>
  //             <WhiteSpace height={30} />
  //             {/* Related News */}
  //             <ShadowCol
  //               style={{
  //                 // width: 840,
  //                 height: "auto",
  //                 padding: 15,
  //                 paddingTop: 15,
  //                 justifyContent: "flex-start",
  //               }}
  //             >
  //               <div
  //                 style={{
  //                   fontSize: 14,
  //                   fontWeight: "bold",
  //                   color: color.DarkBlue,
  //                   width: "100%",
  //                   textAlign: "left",
  //                 }}
  //               >
  //                 종목 관련 뉴스
  //               </div>
  //               <WhiteSpace height={15} />
  //               {relNewsLoding ? (
  //                 <Col
  //                   style={{
  //                     width: 840,
  //                   }}
  //                 >
  //                   <CircularProgress />
  //                 </Col>
  //               ) : (
  //                 <Col style={{ flex: 1 }}>
  //                   {relatedNewsList?.length > 0 ? (
  //                     relatedNewsList?.map((item) => {
  //                       return (
  //                         <Row
  //                           onClick={() => {
  //                             window.open(item.naver_url);
  //                           }}
  //                           key={item.id}
  //                           style={{
  //                             height: 40,
  //                             marginBottom: 12,
  //                             cursor: "pointer",
  //                             justifyContent: "flex-start",
  //                           }}
  //                         >
  //                           <Col
  //                             style={{
  //                               width: 130,
  //                               alignItems: "flex-start",
  //                               marginRight: 10,
  //                             }}
  //                           >
  //                             <Col
  //                               style={{
  //                                 // width: "auto",
  //                                 height: "auto",
  //                                 padding: 10,
  //                                 borderRadius: 5,
  //                                 backgroundColor: color.BackgroundPurple,
  //                                 fontSize: item.press.length > 6 ? 12 : 16,
  //                               }}
  //                             >
  //                               {item.press}
  //                             </Col>
  //                           </Col>
  //                           <Col
  //                             style={{
  //                               // width: 120,
  //                               flexDirection: "column",

  //                               alignItems: "flex-start",
  //                               marginRight: 10,
  //                             }}
  //                           >
  //                             <Row
  //                               style={{
  //                                 justifyContent: "flex-start",
  //                               }}
  //                             >
  //                               {item.headline}
  //                             </Row>
  //                             <Row
  //                               style={{
  //                                 justifyContent: "flex-start",
  //                                 fontSize: 12,
  //                                 color: "rgb(126 126 126)",
  //                               }}
  //                             >
  //                               {new Date(item.timestamp * 1000)
  //                                 .toISOString()
  //                                 .substring(0, 10)}
  //                             </Row>
  //                           </Col>
  //                         </Row>
  //                       );
  //                     })
  //                   ) : (
  //                     <div
  //                       style={{
  //                         fontSize: 14,
  //                         fontWeight: "bold",
  //                         color: color.DarkBlue,
  //                         width: "100%",
  //                         textAlign: "center",
  //                       }}
  //                     >
  //                       데이터를 불러오지 못했습니다.
  //                     </div>
  //                   )}
  //                 </Col>
  //               )}
  //             </ShadowCol>
  //           </Col>
  //         </>
  //       )}

  //       {/* <Row
  //         height={266}
  //         style={{
  //           padding: 0,
  //           margin: 0,
  //           justifyContent: "space-between",
  //         }}
  //       >
  //         <NewsBlock newInfo={newInfo} />
  //         <ShadowCol width={320} height={250}></ShadowCol>
  //         <ShadowCol
  //           width={240}
  //           height={250}
  //           style={{ padding: 24, justifyContent: "flex-start" }}
  //         >
  //           <div
  //             style={{
  //               fontSize: 14,
  //               fontWeight: "bold",
  //               color: color.DarkBlue,
  //               width: "100%",
  //               textAlign: "left",
  //             }}
  //           >
  //             오늘의 추천종목
  //           </div>
  //           <WhiteSpace height={16} />
  //           <Row
  //             height={50}
  //             style={{
  //               backgroundColor: color.BackgroundPurple,
  //               borderRadius: 10,
  //               padding: 10,
  //             }}
  //           >
  //             <Col style={{ flex: 1 }}>
  //               <div
  //                 style={{
  //                   fontSize: 12,
  //                   fontWeight: "bold",
  //                   color: color.DarkBlue,
  //                   width: "100%",
  //                   textAlign: "left",
  //                 }}
  //               >
  //                 LG 에너지 솔루션
  //               </div>
  //               <WhiteSpace height={4} />
  //               <div
  //                 style={{
  //                   fontSize: 7,
  //                   fontWeight: "bold",
  //                   color: color.LightPurple,
  //                   width: "100%",
  //                   textAlign: "left",
  //                 }}
  //               >
  //                 83.2% 확률로 상승
  //               </div>
  //             </Col>
  //             <Row
  //               style={{
  //                 width: 30,
  //                 height: 30,
  //                 borderRadius: 15,
  //                 backgroundColor: color.Purple,
  //                 cursor: "pointer",
  //               }}
  //             >
  //               <img src={RightArrow} style={{ width: 14, height: 12 }} />
  //             </Row>
  //           </Row>
  //           <WhiteSpace height={10} />
  //           <Row
  //             height={50}
  //             style={{
  //               backgroundColor: color.BackgroundPurple,
  //               borderRadius: 10,
  //               padding: 10,
  //             }}
  //           >
  //             <Col style={{ flex: 1 }}>
  //               <div
  //                 style={{
  //                   fontSize: 12,
  //                   fontWeight: "bold",
  //                   color: color.DarkBlue,
  //                   width: "100%",
  //                   textAlign: "left",
  //                 }}
  //               >
  //                 LG 에너지 솔루션
  //               </div>
  //               <WhiteSpace height={4} />
  //               <div
  //                 style={{
  //                   fontSize: 7,
  //                   fontWeight: "bold",
  //                   color: color.LightPurple,
  //                   width: "100%",
  //                   textAlign: "left",
  //                 }}
  //               >
  //                 83.2% 확률로 상승
  //               </div>
  //             </Col>
  //             <Row
  //               style={{
  //                 width: 30,
  //                 height: 30,
  //                 borderRadius: 15,
  //                 backgroundColor: color.Purple,
  //                 cursor: "pointer",
  //               }}
  //             >
  //               <img src={RightArrow} style={{ width: 14, height: 12 }} />
  //             </Row>
  //           </Row>
  //           <WhiteSpace height={20} />
  //           <Row
  //             style={{
  //               height: 32,
  //               borderRadius: 16,
  //               backgroundColor: color.Purple,
  //               fontSize: 10,
  //               color: "white",
  //               fontWeight: "bold",
  //               cursor: "pointer",
  //             }}
  //           >
  //             전체 보기
  //           </Row>
  //         </ShadowCol>
  //       </Row>
  //       <WhiteSpace height={20} />
  //       <ShadowCol width={840} height={300} /> */}
  //     </Col>
  //     <ToastContainer />
  //   </Row>
  // );


  return (
    <Row
      style={{
        height: "auto",
        alignItems: "flex-start",
      }}
    >
      {responsiveValue(true, false, false) && <>
        <ShadowCol
          style={{
            width: 160,
            height: 120,
            padding: 20,
            justifyContent: "flex-start",
          }}
        >
          <Row style={{ height: "auto" }}>
            <div style={{ fontWeight: "bold", flex: 1, cursor: "pointer" }}>
              {data_reducer && data_reducer.shannon_stock == true && (
                <Button
                  onClick={() => {
                    setAsideButtonState("SHANNON_STOCK");

                    const modelres = initializeModelType();

                    setModelType(modelres);
                    const res = initializeSelected();

                    setSelected(res);
                  }}
                  style={{
                    borderRadius: 5,
                    width: "145px",
                    marginBottom: "10px",
                    color: "#FFF",
                    backgroundColor:
                      asideButtonState === "SHANNON_STOCK"
                        ? color.Purple
                        : "rgb(119 119 119)",
                  }}
                >
                  Shannon 개별종목
                </Button>
              )}
              {data_reducer && data_reducer.shannon_index == true && (
                <Button
                  onClick={() => {
                    setAsideButtonState("SHANNON_INDEX");
                    if (data_reducer.Daily != undefined) {
                      setModelType("Daily");
                      setSelected("Daily");
                    } else {
                      if (data_reducer.Weekly != undefined) {
                        setModelType("Weekly");
                        setSelected("Weekly");
                      }
                    }
                  }}
                  style={{
                    borderRadius: 5,
                    width: "145px",
                    marginBottom: "10px",
                    color: "#FFF",
                    backgroundColor:
                      asideButtonState === "SHANNON_INDEX"
                        ? color.Purple
                        : "rgb(119 119 119)",
                  }}
                >
                  Shannon 지수
                </Button>
              )}
            </div>
          </Row>
        </ShadowCol>
        <WhiteSpace width={20} />
      </>}
      <Col
        style={{
          maxWidth: 840,
          justifyContent: "flex-start",
          height: "auto",
        }}
      >
        {responsiveValue(false, true, true) && <>
          <ShadowRow
            style={{
              width: 320,
              height: 60,
              justifyContent: "space-around",
              alignSelf: "flex-start"
            }}
          >
            {data_reducer && data_reducer.shannon_stock == true && (
              <Button
                onClick={() => {
                  setAsideButtonState("SHANNON_STOCK");

                  const modelres = initializeModelType();

                  setModelType(modelres);
                  const res = initializeSelected();

                  setSelected(res);
                }}
                style={{
                  borderRadius: 5,
                  width: "145px",
                  color: "#FFF",
                  backgroundColor:
                    asideButtonState === "SHANNON_STOCK"
                      ? color.Purple
                      : "rgb(119 119 119)",
                }}
              >
                Shannon 개별종목
              </Button>
            )}
            {data_reducer && data_reducer.shannon_index == true && (
              <Button
                onClick={() => {
                  setAsideButtonState("SHANNON_INDEX");
                  if (data_reducer.Daily != undefined) {
                    setModelType("Daily");
                    setSelected("Daily");
                  } else {
                    if (data_reducer.Weekly != undefined) {
                      setModelType("Weekly");
                      setSelected("Weekly");
                    }
                  }
                }}
                style={{
                  borderRadius: 5,
                  width: "145px",
                  color: "#FFF",
                  backgroundColor:
                    asideButtonState === "SHANNON_INDEX"
                      ? color.Purple
                      : "rgb(119 119 119)",
                }}
              >
                Shannon 지수
              </Button>
            )}
          </ShadowRow>
          <WhiteSpace width={20} />
        </>}
        <Row
          style={{
            height: 50,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "#515050",
              fontSize: responsiveValue(18, 16, 14),
              fontWeight: 500,
              textAlign: "left",
            }}
          >
            {asideButtonState === "SHANNON_STOCK"
              ? "딥트레이드테크놀로지스에서 개발한 주가 예측 모델, Shannon으로 예측하여 전체 주가 방향성을 산출하고 이를 바탕으로한 추천하는 상위 종목들을 보여줍니다."
              : "딥트레이드테크놀로지스에서 개발한 위험 관리 시스템으로 시장 움직임을 예측하여 롱숏 포트폴리오 비중을 산출하여 투자 방향성을 보여줍니다."}
          </div>
        </Row>
        <WhiteSpace width={20} />
        {asideButtonState === "SHANNON_STOCK" && (
          <Row
            style={{
              height: 50,
              justifyContent: "flex-start",
              alignItems: "center",
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
        )}
        <WhiteSpace height={20} />
        {/* Sub button */}
        <Col
          style={{
            width: "100%",
            justifyContent: "flex-start",
            height: "auto",
          }}
        >
          <Row style={{ height: "auto", fontWeight: "bold", flex: 1, cursor: "pointer", flexWrap: "wrap", justifyContent: "flex-start" }}>
            {asideButtonState === "SHANNON_STOCK"
              ? Object.keys(data_reducer).map((key) => {
                const value = data_reducer[key];

                if (key === "shannon_top5") {
                  if (value != undefined) {
                    return Object.keys(value).map((innerKey) => {
                      return (
                        <Button
                          key={innerKey} // Add a unique key for each button
                          style={{
                            marginRight: "10px",
                            marginBottom: 10,
                            color: "#FFF",
                            backgroundColor:
                              selected === innerKey
                                ? color.Purple
                                : "rgb(100 100 100)",
                            fontSize: responsiveValue(16, 14, 12),

                          }}
                          className="enterprise_content_right_left_button_pc"
                          onClick={() => {
                            setSelected(innerKey);
                            setModelType(key);
                            // Your click handler logic here
                          }}
                        >
                          {innerKey}
                        </Button>
                      );
                    });
                  }
                }
                //for top 20

                if (key === "shannon_top20") {
                  if (value != undefined) {
                    return Object.keys(value).map((innerKey) => {
                      return (
                        <Button
                          key={innerKey} // Add a unique key for each button
                          style={{
                            marginRight: "10px",
                            marginBottom: 10,
                            color: "#FFF",
                            backgroundColor:
                              selected === innerKey
                                ? color.Purple
                                : "rgb(100 100 100)",
                            fontSize: responsiveValue(16, 14, 12),
                          }}
                          className="enterprise_content_right_left_button_pc"
                          onClick={() => {
                            setSelected(innerKey);
                            setModelType(key);
                            // Your click handler logic here
                          }}
                        >
                          {innerKey}
                        </Button>
                      );
                    });
                  }
                }

                return null; // Return null for other keys if you don't want to render anything
              })
              : asideButtonState === "SHANNON_INDEX"
                ? Object.keys(data_reducer).map((key) => {
                  const value = data_reducer[key];

                  if (key === "Daily") {
                    if (value != undefined) {
                      return (
                        <Button
                          style={{
                            marginRight: "10px",
                            color: "#FFF",
                            backgroundColor:
                              selected === key
                                ? color.Purple
                                : "rgb(100 100 100)",
                          }}
                          className="enterprise_content_right_left_button_pc"
                          onClick={() => {
                            setSelected(key);
                            setModelType(key);
                          }}
                        >
                          {key}
                        </Button>
                      );
                    }
                  }
                  if (key === "Weekly") {
                    if (key != undefined) {
                      return (
                        <Button
                          style={{
                            marginRight: "10px",
                            color: "#FFF",
                            backgroundColor:
                              selected === key
                                ? color.Purple
                                : "rgb(100 100 100)",
                          }}
                          className="enterprise_content_right_left_button_pc"
                          onClick={() => {
                            setSelected(key);
                            setModelType(key);
                          }}
                        >
                          {key}
                        </Button>
                      );
                    }
                  }

                  return null; // Return null for other keys if you don't want to render anything
                })
                : null}

          </Row>
        </Col>
        {/* End of Sub Buttons */}
        <WhiteSpace height={20} />

        <ShadowCol
          style={{
            boxSizing: "border-box",
            height: "auto",
            transition: "all 0.3s ease-in-out",
            // overflowY: "scroll",
            overflow: "hidden",
            textAlign: "center"
          }}
        >
          <Row
            style={{
              flex: 1,
              alignItems: "flex-start",
              flexDirection: "column",

              justifyContent: "flex-start",
            }}
          >
            {selected &&
              tableDataList &&
              asideButtonState === "SHANNON_STOCK" ? (
              <>
                <Row
                  style={{
                    alignItems: "center",
                    fontSize: responsiveValue(16, 14, 12),
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
                    Stock ID
                  </div>
                  <div
                    style={{
                      width: 110,
                      display: "table-cell",
                      fontWeight: 700,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    Name
                  </div>
                  <div
                    style={{
                      width: 110,
                      display: "table-cell",
                      fontWeight: 700,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    Buying Date
                  </div>
                  <div
                    style={{
                      width: 110,
                      display: "table-cell",
                      fontWeight: 700,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    Selling Date
                  </div>
                  <div
                    style={{
                      width: 110,
                      display: "table-cell",
                      fontWeight: 700,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    Sector
                  </div>
                </Row>
                <Row
                  style={{
                    flexDirection: "column",
                    height: "auto",
                  }}
                >
                  {loader ? (
                    <Oval
                      height={40}
                      width={40}
                      color="rgb(86, 68, 252)"
                      wrapperStyle={{
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 10,
                      }}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="rgb(86, 68, 252)"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  ) : (
                    <>
                      {selectedStockId &&
                        tableDataList &&
                        tableDataList
                          .slice(0, open ? tableDataList.length : 5)
                          .map((list, index) => {
                            return (
                              <Row
                                onClick={() => {
                                  setSelectedStockId(list.stock_id);
                                }}
                                style={{
                                  backgroundColor:
                                    selectedStockId === list.stock_id
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
                                  {list.stock_id}
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
                                  {list.name}
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
                                  }}
                                >
                                  {list.selling_date}
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
                                  {list.sector}
                                </div>
                              </Row>
                            );
                          })}
                    </>
                  )}
                </Row>
              </>
            ) : (
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
                    Long
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
                    Short
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
                      {tableDataList &&
                        tableDataList
                          .slice(0, open ? tableDataList.length : 10)
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
                                  {list.adj_Long}
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
                                  {list.adj_Cash}
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
                                  {list.adj_Short}
                                </div>
                              </Row>
                            );
                          })}
                    </>
                  )}
                </Row>
              </Col>
            )}
          </Row>
          <a
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            style={{
              cursor: "pointer",
              transform: `rotate(${open ? 180 : 0}deg)`,
              margin: 10,
            }}
          >
            <img src={Arrow} style={{ width: 15, height: 15 }} />
          </a>
        </ShadowCol>
        <WhiteSpace height={20} />
        {/* Stock Page */}
        {/* Chart for shannon index */}
        {asideButtonState === "SHANNON_INDEX" && (
          <>
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
                {data_reducer && (
                  <LineChart
                    DailyData={data_reducer.Daily}
                    WeeklyData={data_reducer.Weekly}
                    activeFlag={modelType}
                  />
                )}
              </ShadowCol>
            </Col>
          </>
        )}
        {/* if shannon index is active then show the news summary  */}
        {asideButtonState === "SHANNON_INDEX" && (
          <>
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
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: color.DarkBlue,
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  섀넌의 한국 증시 요약
                </div>
                <WhiteSpace height={20} />
                {summaryLoading ? (
                  <CircularProgress />
                ) : marketCapNews.length == 0 ? (
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: color.DarkBlue,
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    뉴스 데이터를 불러오지 못했습니다.
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: color.LightPurple,
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      시가총액 상위 기준
                    </div>
                    <WhiteSpace height={20} />
                    {marketCapNews.map((item, index) => {
                      if (item.top_summary_flag != 1) {
                        return (
                          <Row
                            key={index}
                            style={{
                              height: "auto",
                              marginBottom: 12,
                              cursor: "pointer",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Col
                              style={{
                                width: 130,
                                alignItems: "flex-start",
                                marginRight: 10,
                              }}
                            >
                              <Col
                                style={{
                                  // width: "auto",
                                  height: "auto",
                                  padding: 10,
                                  borderRadius: 5,
                                  backgroundColor: color.BackgroundPurple,
                                  fontSize:
                                    item.ticker.trim().length > 7 ? 12 : 14,
                                }}
                              >
                                {item.ticker.trim()}
                              </Col>
                            </Col>
                            <Col
                              style={{
                                // width: 120,
                                flexDirection: "column",

                                alignItems: "flex-start",
                                marginRight: 10,
                              }}
                            >
                              <Row
                                style={{
                                  justifyContent: "flex-start",
                                  fontSize: 15,
                                }}
                              >
                                {item.summary_text.trim()}
                              </Row>
                            </Col>
                          </Row>
                        );
                      }
                    })}
                    <WhiteSpace height={20} />
                    <div
                      style={{
                        width: "100%",
                        border: "0.5px solid #A3A1FF",
                      }}
                    ></div>
                    <WhiteSpace height={20} />
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: color.LightPurple,
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      거래 금액 기준
                    </div>
                    <WhiteSpace height={20} />
                    {tradingVolNews.map((item, index) => {
                      if (item.top_summary_flag != 1) {
                        return (
                          <Row
                            key={index}
                            style={{
                              height: "auto",
                              marginBottom: 12,
                              cursor: "pointer",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Col
                              style={{
                                width: 130,
                                alignItems: "flex-start",
                                marginRight: 10,
                              }}
                            >
                              <Col
                                style={{
                                  // width: "auto",
                                  height: "auto",
                                  padding: 10,
                                  borderRadius: 5,
                                  backgroundColor: color.BackgroundPurple,
                                  fontSize:
                                    item.ticker.trim().length > 7 ? 12 : 14,
                                }}
                              >
                                {item.ticker.trim()}
                              </Col>
                            </Col>
                            <Col
                              style={{
                                // width: 120,
                                flexDirection: "column",

                                alignItems: "flex-start",
                                marginRight: 10,
                              }}
                            >
                              <Row
                                style={{
                                  justifyContent: "flex-start",
                                  fontSize: 15,
                                }}
                              >
                                {item.summary_text.trim()}
                              </Row>
                            </Col>
                          </Row>
                        );
                      }
                    })}
                  </>
                )}
              </ShadowCol>
            </Col>
          </>
        )}
        {/* if shannon stock is active then show the stock detail page  */}
        {asideButtonState === "SHANNON_STOCK" && (
          <>
            <Col
              style={{
                // width: 840,
                justifyContent: "flex-start",
                height: "auto",
                paddingBottom: 20,
              }}
            >
              <ShadowCol
                style={{
                  // width: 840,
                  height: 325,
                  padding: 10,
                  paddingTop: 15,
                }}
              >
                {stockPriceLoader ? (
                  <Col>
                    <CircularProgress />
                  </Col>
                ) : stockPrice.length > 0 ? (
                  <ApexChart
                    width={Math.min(800, width - 40)}
                    height={275}
                    options={state.options}
                    series={state.series}
                    type="candlestick"
                  />
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
                    차트 데이터를 불러오지 못했습니다.
                  </div>
                )}
              </ShadowCol>
              <WhiteSpace height={30} />
              <ShadowCol
                style={{
                  // width: 840,
                  height: 120,
                  padding: 15,
                  paddingTop: 15,
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: color.DarkBlue,
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  기간별 수익률
                </div>
                {stockPriceLoader ? (
                  <Col>
                    <CircularProgress />
                  </Col>
                ) : profitList.length > 0 ? (
                  <Row style={{ flex: 1, justifyContent: "space-between", paddingLeft: 10, paddingRight: 10 }}>
                    {profitList.map((v) => {
                      return <Row width={responsiveValue(120, 100, 80)} height={47} style={{
                        backgroundColor: color.BackgroundPurple,
                        borderRadius: 10,
                        fontWeight: responsiveValue("bold", "bold", "normal"),
                        justifyContent: "flex-start",
                        fontSize: responsiveValue(16, 12, 10),
                        padding: 8
                      }}>
                        <Col width={responsiveValue(36, 30, 24)} height={responsiveValue(36, 30, 24)} style={{ borderRadius: 18, backgroundColor: color.Purple, color: "white", flexShrink: 0 }}>{v.title}</Col>
                        <div style={{ flex: 1, textAlign: "center" }}>
                          {v.value}%
                        </div>
                      </Row>
                    })}
                  </Row>
                  // <Row
                  //   style={{
                  //     flex: 1,
                  //     justifyContent: "space-between",
                  //     paddingLeft: 10,
                  //     paddingRight: 10,
                  //   }}
                  // >
                  //   {profitList.map((v) => {
                  //     return (
                  //       <Row
                  //         width={109}
                  //         height={47}
                  //         style={{
                  //           backgroundColor: color.BackgroundPurple,
                  //           borderRadius: 10,
                  //           fontWeight: "bold",
                  //         }}
                  //       >
                  //         <Col
                  //           width={36}
                  //           height={36}
                  //           style={{
                  //             borderRadius: 18,
                  //             backgroundColor: color.Purple,
                  //             color: "white",
                  //             fontWeight: "bold",
                  //           }}
                  //         >
                  //           {v.title}
                  //         </Col>
                  //         <WhiteSpace width={12} />
                  //         {v.value}%
                  //       </Row>
                  //     );
                  //   })}
                  // </Row>
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
              <ShadowCol
                style={{
                  // width: 840,
                  height: "auto",
                  padding: 15,
                  paddingTop: 15,
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: color.DarkBlue,
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  종목 뉴스
                </div>
                <WhiteSpace height={15} />
                {newsLoding ? (
                  <Col
                    style={{
                      width: 840,
                    }}
                  >
                    <CircularProgress />
                  </Col>
                ) : (
                  <Col style={{ flex: 1 }}>
                    {directNewsList.length > 0 ? (
                      directNewsList?.map((item) => {
                        return (
                          <Row
                            onClick={() => {
                              window.open(item.naver_url);
                            }}
                            key={item.id}
                            style={{
                              height: 40,
                              marginBottom: 12,
                              cursor: "pointer",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Col
                              style={{
                                width: 130,
                                alignItems: "flex-start",
                                marginRight: 10,
                              }}
                            >
                              <Col
                                style={{
                                  // width: "auto",
                                  height: "auto",
                                  padding: 10,
                                  borderRadius: 5,
                                  backgroundColor: color.BackgroundPurple,
                                  fontSize: responsiveValue(16, 14, 12) - (item.press.length > 6 ? 4 : 0),
                                }}
                              >
                                {item.press}
                              </Col>
                            </Col>
                            <Col
                              style={{
                                // width: 120,
                                flexDirection: "column",

                                alignItems: "flex-start",
                                marginRight: 10,
                              }}
                            >
                              <Row
                                style={{
                                  justifyContent: "flex-start",
                                  fontSize: responsiveValue(16, 14, 12)
                                }}
                              >
                                {item.headline}
                              </Row>
                              <Row
                                style={{
                                  justifyContent: "flex-start",
                                  fontSize: responsiveValue(12, 10, 8),
                                  color: "rgb(126 126 126)",
                                }}
                              >
                                {new Date(item.timestamp * 1000)
                                  .toISOString()
                                  .substring(0, 10)}
                              </Row>
                            </Col>
                          </Row>
                        );
                      })
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
                  </Col>
                )}
              </ShadowCol>
              <WhiteSpace height={30} />
              {/* Related News */}
              <ShadowCol
                style={{
                  // width: 840,
                  height: "auto",
                  padding: 15,
                  paddingTop: 15,
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: color.DarkBlue,
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  종목 관련 뉴스
                </div>
                <WhiteSpace height={15} />
                {relNewsLoding ? (
                  <Col
                    style={{
                      width: 840,
                    }}
                  >
                    <CircularProgress />
                  </Col>
                ) : (
                  <Col style={{ flex: 1 }}>
                    {relatedNewsList.length > 0 ? (
                      relatedNewsList?.map((item) => {
                        return (
                          <Row
                            onClick={() => {
                              window.open(item.naver_url);
                            }}
                            key={item.id}
                            style={{
                              height: 40,
                              marginBottom: 12,
                              cursor: "pointer",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Col
                              style={{
                                width: 130,
                                alignItems: "flex-start",
                                marginRight: 10,
                              }}
                            >
                              <Col
                                style={{
                                  // width: "auto",
                                  height: "auto",
                                  padding: 10,
                                  borderRadius: 5,
                                  backgroundColor: color.BackgroundPurple,
                                  fontSize: responsiveValue(16, 14, 12) - (item.press.length > 6 ? 4 : 0),
                                }}
                              >
                                {item.press}
                              </Col>
                            </Col>
                            <Col
                              style={{
                                // width: 120,
                                flexDirection: "column",

                                alignItems: "flex-start",
                                marginRight: 10,
                              }}
                            >
                              <Row
                                style={{
                                  justifyContent: "flex-start",
                                  fontSize: responsiveValue(16, 14, 12)
                                }}
                              >
                                {item.headline}
                              </Row>
                              <Row
                                style={{
                                  justifyContent: "flex-start",
                                  fontSize: responsiveValue(12, 10, 8),
                                  color: "rgb(126 126 126)",
                                }}
                              >
                                {new Date(item.timestamp * 1000)
                                  .toISOString()
                                  .substring(0, 10)}
                              </Row>
                            </Col>
                          </Row>
                        );
                      })
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
                  </Col>
                )}
              </ShadowCol>
            </Col>
          </>
        )}

        {/* <Row
          height={266}
          style={{
            padding: 0,
            margin: 0,
            justifyContent: "space-between",
          }}
        >
          <NewsBlock newInfo={newInfo} />
          <ShadowCol width={320} height={250}></ShadowCol>
          <ShadowCol
            width={240}
            height={250}
            style={{ padding: 24, justifyContent: "flex-start" }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: color.DarkBlue,
                width: "100%",
                textAlign: "left",
              }}
            >
              오늘의 추천종목
            </div>
            <WhiteSpace height={16} />
            <Row
              height={50}
              style={{
                backgroundColor: color.BackgroundPurple,
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Col style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: color.DarkBlue,
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  LG 에너지 솔루션
                </div>
                <WhiteSpace height={4} />
                <div
                  style={{
                    fontSize: 7,
                    fontWeight: "bold",
                    color: color.LightPurple,
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  83.2% 확률로 상승
                </div>
              </Col>
              <Row
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: color.Purple,
                  cursor: "pointer",
                }}
              >
                <img src={RightArrow} style={{ width: 14, height: 12 }} />
              </Row>
            </Row>
            <WhiteSpace height={10} />
            <Row
              height={50}
              style={{
                backgroundColor: color.BackgroundPurple,
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Col style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: color.DarkBlue,
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  LG 에너지 솔루션
                </div>
                <WhiteSpace height={4} />
                <div
                  style={{
                    fontSize: 7,
                    fontWeight: "bold",
                    color: color.LightPurple,
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  83.2% 확률로 상승
                </div>
              </Col>
              <Row
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: color.Purple,
                  cursor: "pointer",
                }}
              >
                <img src={RightArrow} style={{ width: 14, height: 12 }} />
              </Row>
            </Row>
            <WhiteSpace height={20} />
            <Row
              style={{
                height: 32,
                borderRadius: 16,
                backgroundColor: color.Purple,
                fontSize: 10,
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              전체 보기
            </Row>
          </ShadowCol>
        </Row>
        <WhiteSpace height={20} />
        <ShadowCol width={840} height={300} /> */}
      </Col>
      <ToastContainer />
    </Row>
  );

};

export default HomePage;
