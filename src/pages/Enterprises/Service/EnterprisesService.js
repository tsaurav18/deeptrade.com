import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Bell from "../../../assets/icons/bell.png";
import Logout from "../../../assets/icons/logout.png";
import Setting from "../../../assets/icons/setting.png";
import color from "../../../style/color";
import { Col, Row, ShadowCol, WhiteSpace } from "../../../style/globalStyled";
import "./EnterprisesService.css";
import HomePage from "./HomePage";

import { resetState } from "../../../redux/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EnterprisesService = () => {
  const [activeScrollbar, setActiveScrollbar] = useState(true);
  const user_info_reducer = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(resetState());
    navigate("/enterprise", { replace: true });
  };
  function scrollbarHandler(value) {
    setActiveScrollbar(value);
  }

  return (
    <Col
      style={{
        // width: "100vw",
        height: "115vh",
        background:
          "linear-gradient(90deg, #FAFAFF 0.24%, #F2F0FF 99.7%, #F2F0FF 99.7%)",
        overflow: "hidden",
      }}
    >
      <Row
        style={{
          width: 1240,
          height: 75,
          paddingTop: 10,
          justifyContent: "flex-start",
        }}
      >
        <img
          src={"/assets/enterprise_logo1.png"}
          alt="logo"
          style={{ height: "60px", width: "232px" }}
        />
      </Row>
      <WhiteSpace height={25} />
      <Row
        style={{
          width: 1240,
          alignItems: "flex-start",
        }}
      >
        <Col
          style={{
            width: 1240,
            height: 900,
            overflowY: activeScrollbar ? "scroll" : "hidden",
            justifyContent: "flex-start",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={<HomePage scrollbarHandler={scrollbarHandler} />}
            />
            {/* <Route
              path="/:id"
              element={<StockPage scrollbarHandler={scrollbarHandler} />}
            /> */}
          </Routes>
        </Col>
        <WhiteSpace width={20} />
        <ShadowCol
          style={{
            width: 190,
            height: 820,
            padding: 20,
            justifyContent: "flex-start",
          }}
        >
          {/* <WhiteSpace height={20} /> */}
          <Row style={{ height: "auto" }}>
            <div
              style={{ fontWeight: "bold", flex: 1, cursor: "pointer" }}
              onClick={onLogout}
            >
              로그아웃
            </div>
            <img
              src={Logout}
              style={{ width: 22, height: 22, cursor: "pointer" }}
              onClick={onLogout}
            />
          </Row>
          <WhiteSpace height={36} />
          <Col style={{ height:user_info_reducer.company_usrnm==="crescendo"?31: 110, width: 123, position: "relative" }}>
            <Col
              style={{
                // backgroundColor: "#7A769B",
                borderRadius: 45,
                overflow: "hidden",
              }}
            >
              <img
                style={{ height: 70, width: 100 }}
                src={
                  user_info_reducer.company_usrnm=="deeptrade"?"/assets/deeptrade_d_logo.png":user_info_reducer.company_usrnm==="koreainvestment"?'/assets/koreainvestment_logo.png':user_info_reducer.company_usrnm==="crescendo"?"/assets/crescendo_logo.png":"/assets/white_logo.png"
                }
                alt="기업로고"
              />
            </Col>
            {/* <Col
              style={{
                backgroundColor: color.Purple,
                width: 33,
                height: 33,
                borderRadius: 17,
                position: "absolute",
                bottom: -5,
                right: 0,
              }}
            >
              <img src={Setting} style={{ width: 19, height: 19 }} />
            </Col> */}
          </Col>
          <WhiteSpace height={30} />
          <div style={{ fontWeight: "bold", fontSize: 14 }}>
            {user_info_reducer.company_usrnm}
          </div>
          <WhiteSpace height={8} />
          <div
            style={{
              fontWeight: "bold",
              fontSize: 10,
              color: color.LightPurple,
            }}
          >
            {user_info_reducer.company_usrnm == "deeptrade"
              ? "딥트레이드테크놀로지스"
              : user_info_reducer.company_usrnm == "koreainvestment"
              ? "한국투자증권"
              : user_info_reducer.company_usrnm == "crescendo"
              ? "크레센도"
              : ""}
          </div>
          <WhiteSpace height={48} />
          {/* <Row style={{ height: "auto" }}>
            <div style={{ fontWeight: "bold", flex: 1, cursor: "pointer" }}>
              최근알림
            </div>
            <img
              src={Bell}
              style={{ width: 22, height: 22, cursor: "pointer" }}
            />
          </Row> */}
        </ShadowCol>
      </Row>
    </Col>
  );
};

const NewsBlock = ({ newInfo }) => {
  return (
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
        오늘의 추천뉴스
      </div>
      <WhiteSpace height={16} />
      {newInfo.map((v) => {
        return (
          <Row
            height={50}
            style={{
              backgroundColor: color.BackgroundPurple,
              borderRadius: 10,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                fontSize: 7,
                fontWeight: "bold",
                color: color.DarkBlue,
                width: "100%",
                textAlign: "left",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                "-webkit-line-clamp": 2,
              }}
            >
              {v.news}
            </div>
          </Row>
        );
      })}
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
  );
};

export default EnterprisesService;
