import React, { useState, useEffect } from "react";
import "./EnterprisesService.css";
import { useDispatch, useSelector } from "react-redux";
import { getDtData } from "../../../api";

import { useNavigate } from "react-router-dom";
import { resetState } from "../../../redux/slices/loginSlice";
function EnterprisesService() {
  const user_info_reducer = useSelector((state) => state.loginReducer);

  const [dataList, setDataList] = useState(null);
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const onLogout = () => {
    dispatch(resetState());
    navigate("/enterprise", { replace: true });
  };
  const getModelData = async (modelType) => {
    const res = await getDtData.fetchDtData(
      user_info_reducer.company_name,
      modelType
    );
    if (res.status === 200) {
      setDataList(res.data);
      setSelected(modelType);

      // console.log("data is feteched", res.data);
    } else {
      setServerError(true);
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    let isComponentRender = true;
    if (isComponentRender) {
      let model_type = "";
      if (user_info_reducer.company_name === "Hantoo") {
        model_type = "1w-5";
      } else if (user_info_reducer.company_name === "Cresendo") {
        model_type = "5";
      } else {
        model_type = "1w";
      }

      getModelData(model_type);
    }

    return () => {
      isComponentRender = false;
      setServerError(false);
    };
  }, [serverError]);

  // console.log("user_info_reducer", user_info_reducer);

  function StockTable({ data }) {
    return (
      <div className="enterprises_service_table_responsive">
        <table className="enterprises_service_table enterprises_service_table-bordered">
          <thead>
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
      </div>
    );
  }
  return (
    <>
      {user_info_reducer.is_staff ? (
        <div className="enterprises_service_container">
          <div className="enterprises_service_inner_box">
            <div className="enterprises_service_company_text">
              DeepTrade Signal
            </div>
            <div
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                padding: "10px",
                backgroundColor: "#d4d4d4",
                borderRadius: "5px",
              }}
              onClick={onLogout}
            >
              로그아웃
            </div>
          </div>
          <div className="enterprises_button-row">
            {user_info_reducer.company_name === "Hantoo" ? (
              <div
                className="button_container"
                style={{
                  display: "flex",
                  flexDirection: " column",
                  width: "100%",
                }}
              >
                <div
                  className="button_row"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <button
                    className="enterprises_button"
                    onClick={() => {
                      getModelData("1w-5");
                    }}
                    style={{
                      backgroundColor:
                        selected === "1w-5" ? "#007bff" : "rgb(100 100 100)",
                    }}
                  >
                    1주 Top 5
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "2w-5" ? "#007bff" : "rgb(100 100 100)",
                    }}
                    className="enterprises_button"
                    onClick={() => {
                      getModelData("2w-5");
                    }}
                  >
                    2주 Top 5
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "4w-5" ? "#007bff" : "rgb(100 100 100)",
                    }}
                    className="enterprises_button"
                    onClick={() => {
                      getModelData("4w-5");
                    }}
                  >
                    4주 Top 5
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "8w-5" ? "#007bff" : "rgb(100 100 100)",
                    }}
                    className="enterprises_button"
                    onClick={() => {
                      getModelData("8w-5");
                    }}
                  >
                    8주 Top 5
                  </button>
                </div>
                <div
                  className="button_row"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    style={{
                      backgroundColor:
                        selected === "1w" ? "#007bff" : "rgb(100 100 100)",
                    }}
                    className="enterprises_button"
                    onClick={() => {
                      getModelData("1w");
                    }}
                  >
                    1주 Top 20
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "2w" ? "#007bff" : "rgb(100 100 100)",
                    }}
                    className="enterprises_button"
                    onClick={() => {
                      getModelData("2w");
                    }}
                  >
                    2주 Top 20
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "4w" ? "#007bff" : "rgb(100 100 100)",
                    }}
                    className="enterprises_button"
                    onClick={() => {
                      getModelData("4w");
                    }}
                  >
                    4주 Top 20
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        selected === "8w" ? "#007bff" : "rgb(100 100 100)",
                    }}
                    className="enterprises_button"
                    onClick={() => {
                      getModelData("8w");
                    }}
                  >
                    8주 Top 20
                  </button>
                </div>
              </div>
            ) : user_info_reducer.company_name === "Cresendo" ? (
              <>
                <button
                  style={{
                    backgroundColor:
                      selected === "5" ? "#007bff" : "rgb(100 100 100)",
                  }}
                  className="enterprises_button"
                  onClick={() => {
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
                    getModelData("20");
                  }}
                >
                  4주 Top 20
                </button>
              </>
            ) : (
              <>
                <button
                  style={{
                    backgroundColor:
                      selected === "1w" ? "#007bff" : "rgb(100 100 100)",
                  }}
                  className="enterprises_button"
                  onClick={() => {
                    getModelData("1w");
                  }}
                >
                  1주 Top 20
                </button>
                <button
                  style={{
                    backgroundColor:
                      selected === "2w" ? "#007bff" : "rgb(100 100 100)",
                  }}
                  className="enterprises_button"
                  onClick={() => {
                    getModelData("2w");
                  }}
                >
                  2주 Top 20
                </button>
                <button
                  style={{
                    backgroundColor:
                      selected === "4w" ? "#007bff" : "rgb(100 100 100)",
                  }}
                  className="enterprises_button"
                  onClick={() => {
                    getModelData("4w");
                  }}
                >
                  4주 Top 20
                </button>
                <button
                  style={{
                    backgroundColor:
                      selected === "8w" ? "#007bff" : "rgb(100 100 100)",
                  }}
                  className="enterprises_button"
                  onClick={() => {
                    getModelData("8w");
                  }}
                >
                  8주 Top 20
                </button>
              </>
            )}
          </div>

          {dataList != null ? <StockTable data={dataList} /> : null}
        </div>
      ) : null}
    </>
  );
}

export default EnterprisesService;

// import React, { useEffect, useMemo, useState } from "react";
// import "./EnterprisesService.css";

// import {
//   ShadowCol,
//   Col,
//   WhiteSpace,
//   Row,
//   ShadowRow,
// } from "../../../style/globalStyled";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Link,
//   useParams,
//   useNavigate,
//   Router,
// } from "react-router-dom";
// import color from "../../../style/color";
// import Arrow from "../../../assets/icons/arrow.png";
// import Logout from "../../../assets/icons/logout.png";
// import Setting from "../../../assets/icons/setting.png";
// import Bell from "../../../assets/icons/bell.png";
// import RightArrow from "../../../assets/icons/rightArrow.png";

// const EnterprisesService = () => {
//     const user_info_reducer = useSelector((state) => state.loginReducer);
//   const [dataList, setDataList] = useState(null);
//   const [modelType, setModelType] = useState("1w");
//   const getModelData = async (modelType) => {
//     const res = await getDtData.fetchDtData(
//       user_info_reducer.company_name,
//       modelType
//     );
//     if (res.status === 200) {
//       setDataList(res.data);
//       console.log("data is feteched", res.data);
//     } else {
//       console.log("something went wrong");
//     }
//   };
//   useEffect(() => {
//     getModelData(modelType);

//     return () => {};
//   }, []);
//   const onLogout = () => {
//     alert("로그아웃 수행!");
//   };
//   return (
//     <Col
//       style={{
//         width: "100vw",
//         height: "100vh",
//         background:
//           "linear-gradient(90deg, #FAFAFF 0.24%, #F2F0FF 99.7%, #F2F0FF 99.7%)",
//         overflow: "hidden",
//       }}
//     >
//       <WhiteSpace height={56} />
//       <Row style={{ width: 1100, alignItems: "flex-start" }}>
//         <Col
//           style={{
//             width: 860,
//             height: 820,
//             overflowY: "scroll",
//             justifyContent: "flex-start",
//           }}
//         >
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/:id" element={<StockPage />} />
//           </Routes>
//         </Col>
//         <WhiteSpace width={20} />
//         <ShadowCol
//           style={{
//             width: 240,
//             height: 820,
//             padding: 20,
//             justifyContent: "flex-start",
//           }}
//         >
//           {/* <WhiteSpace height={20} /> */}
//           <Row style={{ height: "auto" }}>
//             <div
//               style={{ fontWeight: "bold", flex: 1, cursor: "pointer" }}
//               onClick={onLogout}
//             >
//               로그아웃
//             </div>
//             <img
//               src={Logout}
//               style={{ width: 22, height: 22, cursor: "pointer" }}
//               onClick={onLogout}
//             />
//           </Row>
//           <WhiteSpace height={36} />
//           <Col style={{ height: 110, width: 110, position: "relative" }}>
//             <Col
//               style={{
//                 backgroundColor: "#7A769B",
//                 borderRadius: 55,
//                 overflow: "hidden",
//               }}
//             >
//               <img
//                 style={{ height: 110, width: 110 }}
//                 src={
//                   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlWU0MYkJdTe_PIlGAdDpCbR0HltrLQjGSOw&usqp=CAU"
//                 }
//                 alt="기업로고"
//               />
//             </Col>
//             <Col
//               style={{
//                 backgroundColor: color.Purple,
//                 width: 33,
//                 height: 33,
//                 borderRadius: 17,
//                 position: "absolute",
//                 bottom: -5,
//                 right: 0,
//               }}
//             >
//               <img src={Setting} style={{ width: 19, height: 19 }} />
//             </Col>
//           </Col>
//           <WhiteSpace height={30} />
//           <div style={{ fontWeight: "bold", fontSize: 14 }}>홍길동 님</div>
//           <WhiteSpace height={8} />
//           <div
//             style={{
//               fontWeight: "bold",
//               fontSize: 10,
//               color: color.LightPurple,
//             }}
//           >
//             유진투자증권
//           </div>
//           <WhiteSpace height={48} />
//           <Row style={{ height: "auto" }}>
//             <div style={{ fontWeight: "bold", flex: 1, cursor: "pointer" }}>
//               최근알림
//             </div>
//             <img
//               src={Bell}
//               style={{ width: 22, height: 22, cursor: "pointer" }}
//             />
//           </Row>
//         </ShadowCol>
//       </Row>
//     </Col>
//   );
// };

// const Home = () => {
//   const [topStockList, setTopStockList] = useState([[]]);
//   const [open, setOpen] = useState(false);
//   const title_array = [
//     "1일 예측 순위",
//     "3일 예측 순위",
//     "5일 예측 순위",
//     "1주 예측 순위",
//     "2주 예측 순위",
//     "3주 예측 순위",
//     "4주 예측 순위",
//   ];
//   const navigate = useNavigate();

//   return (
//     <Col
//       style={{
//         width: 840,
//         justifyContent: "flex-start",
//         height: "auto",
//       }}
//     >
//       <ShadowCol
//         style={{
//           width: 840,
//           height: open ? 560 : 195,
//           padding: 10,
//           paddingTop: 15,
//           transition: "all 0.3s ease-in-out",
//         }}
//       >
//         <Row style={{ flex: 1 }}>
//           <WhiteSpace width={32} />
//           {topStockList.map((list, index) => {
//             const title = title_array[index];
//             return (
//               <Col
//                 style={{
//                   flex: 1,
//                   alignItems: "flex-start",
//                   justifyContent: "flex-start",
//                 }}
//               >
//                 <div style={{ color: color.DarkBlue, fontWeight: "bold" }}>
//                   {title}
//                 </div>
//                 <WhiteSpace height={12} />
//                 {list.slice(0, open ? 20 : 5).map((k, idx) => {
//                   return (
//                     <div
//                       onClick={() => {
//                         navigate("/enterprise/service/" + k.id);
//                       }}
//                       style={{
//                         height: 24,
//                         display: "table-cell",
//                         cursor: "pointer",
//                         transition: "all 0.3s ease-in-out",
//                         opacity: open || idx < 5 ? 1 : 0,
//                       }}
//                     >
//                       {k.name}
//                     </div>
//                   );
//                 })}
//               </Col>
//             );
//           })}
//         </Row>
//         <a
//           onClick={() => {
//             setOpen((prev) => !prev);
//           }}
//           style={{
//             cursor: "pointer",
//             transform: `rotate(${open ? 180 : 0}deg)`,
//           }}
//         >
//           <img src={Arrow} style={{ width: 9, height: 11 }} />
//         </a>
//       </ShadowCol>
//       <WhiteSpace height={20} />
//       <Row
//         height={266}
//         style={{ padding: 0, margin: 0, justifyContent: "space-between" }}
//       >
//         <ShadowCol width={240} height={250}></ShadowCol>
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
//       <ShadowCol width={840} height={300} />
//     </Col>
//   );
// };

// const StockPage = () => {
//   return (
//     <Col
//       style={{
//         width: 840,
//         justifyContent: "flex-start",
//       }}
//     >
//       <ShadowCol
//         style={{
//           width: 840,
//           height: 195,
//           padding: 10,
//           paddingTop: 15,
//         }}
//       >
//         종목 관련 정보 페이지
//       </ShadowCol>
//     </Col>
//   );
// };
// export default EnterprisesService;
