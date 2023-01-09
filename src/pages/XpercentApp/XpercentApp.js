import React, { useRef, useEffect, useState } from "react";
import "./XpercentApp.css";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
function XpercentApp() {
  useEffect(() => {
    document.title = "Xpercent";
  }, []);
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <div className="col-2 headerLogo">
          <img
            src="assets/xpercentapp/xpercent_logo.png"
            alt="logo"
            // onClick={() => {
            //   window.open("https://deeptrade.co/", "_self");
            // }}
          />
        </div>
        <div className="col-10">
          <div
            className="menu"
            style={{
              justifyContent: "right",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              className="menu_item "
              style={{ color: "black" }}
              onClick={() => {
                window.open("https://deeptrade.co/", "_self");
              }}
            >
              Home
            </div>
          </div>
        </div>
      </div>
      {/* appstore container */}

      <div className="appstore__container">
        <div className="appstore__inner">
          <div className="appstore__content">
            <div className="appstore__left">
              <h1 className="animate__animated animate__fadeInLeft">
                인공지능 기반의 모델이 상승 종목을 선정해 추천하는{" "}
                <span style={{ color: "#374351", fontWeight: "bold" }}>
                  주식 시장 예측 서비스
                </span>
              </h1>
              <div className="header " data-aos="fade-right">
                {/* <h1>
                  인공지능 기반의 모델이 상승 종목을 선정해 추천하는{" "}
                  <span style={{ color: "#374351", fontWeight: "bold" }}>
                    주식 시장 예측 서비스
                  </span>
                </h1> */}
              </div>
              <div className="desc animate__animated animate__fadeInLeft">
                <p>
                  일반적인 투자 프로그램, 사람이 보지 못하는 패턴을 파악해서
                  안정적이고 높은 수익률을 제공합니다.
                </p>
              </div>

              <div className="tags">
                <div className="tag__box animate__animated animate__slideInUp">
                  #주식
                </div>
                <div className="tag__box animate__animated animate__slideInUp">
                  #로보어드바이저
                </div>
                <div className="tag__box animate__animated animate__slideInUp">
                  #AI
                </div>
                <div className="tag__box animate__animated animate__slideInUp">
                  #인공지능
                </div>
                <div className="tag__box animate__animated animate__slideInUp">
                  #Xpercent
                </div>
              </div>
              <div className="buttons">
                <div className="btn animate__animated animate__zoomIn">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.xpct"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="assets/xpercentapp/playStoreBtn.png"
                      alt="img"
                      height={"50rem"}
                      width={"140rem"}
                    />
                  </a>
                </div>
                <div className="btn animate__animated animate__zoomIn">
                  <a
                    href="https://apps.apple.com/kr/app/xpercent/id1632561591?l"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="assets/xpercentapp/appleBtn.png"
                      alt="img"
                      height={"50rem"}
                      width={"140rem"}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="appstore__right animate__animated animate__fadeInRight">
              <img
                src="assets/xpercentapp/appstoreIcon.png"
                alt="appstoreimage"
              />
            </div>
          </div>
        </div>
      </div>
      <ScrollAnimation animateIn="fadeIn">
        <div className="home__container1">
          <div className="home__inner">
            <div className="home__content">
              <div className="home__left">
                <ScrollAnimation animateIn="fadeInLeft">
                  <h1>주식 시장 일기 예보</h1>
                  <h2 className="white__text_desc">
                    AI 섀넌이 국내외 데이터를 통해 분석한 앞으로의 1개월 증시
                    전망을 제공합니다.
                  </h2>
                </ScrollAnimation>
              </div>

              <div className="home__right1">
                <ScrollAnimation animateIn="fadeInRight">
                  <img src="assets/xpercentapp/ilgi.png" alt="favimage" />
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeIn">
        <div className="home__container2">
          <div className="home__inner">
            <div className="home__content">
              <div className="home__left">
                <ScrollAnimation animateIn="fadeInLeft">
                  <h1 className="black__text">주식 도깨비</h1>
                  <h2 className="black__text_desc">
                    나의 관심 종목을 추가하면 AI섀넌이 최적의 매매 타이밍을
                    제공합니다.{" "}
                  </h2>
                </ScrollAnimation>
              </div>
              <div className="home__right1 animate__animated animate__fadeInUpBig">
                <ScrollAnimation animateIn="fadeInRight">
                  <img src={"assets/xpercentapp/fav.png"} alt="favimage" />
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      <div className="home__container1">
        <div className="home__inner">
          <div className="home__content">
            <div className="home__left">
              <ScrollAnimation animateIn="fadeInLeft">
                <h1>AI 섀넌의 추천 종목</h1>
                <h2 className="white__text_desc">
                  기간별 (장/단기), 섹터 등 옵션을 선택하면 상승 종목을 선정해
                  추천합니다.{" "}
                </h2>
              </ScrollAnimation>
            </div>

            <div className="home__right1">
              <ScrollAnimation animateIn="fadeInRight">
                <img src="assets/xpercentapp/signal.png" alt="signalImage" />{" "}
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </div>

      {/* footer  */}

      <div className="footer">
        <div className="footer_inner">
          <ScrollAnimation animateIn="fadeInLeft">
            <span
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#b1b1b1",
              }}
            >
              DeepTrade Technologies는 AI 기반 주식 투자 기술의 미래를
              선도합니다.
            </span>
          </ScrollAnimation>
        </div>
        <hr className="incHr" />
        <div className={"p-0"}>
          <div
            className="row col-md-9 col-9"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div className="incName col my-auto">
              <ScrollAnimation animateIn="fadeInLeft">
                딥트레이드테크놀로지스 주식회사 <br /> (DeepTrade Technologies)
              </ScrollAnimation>
            </div>
            <div className={`incDetail col text-left`}>
              <ScrollAnimation animateIn="fadeInRight">
                대표자명: 손예준 <br />
                TEL: 02-875-5677 <br />
                EMAIL: contact@deeptrade.co <br />
                주소: 서울특별시 관악구 관악로 1, 138동 3층 314호 (신림동,
                서울대학교) <br />
                사업자등록번호: 361-88-01222 <br />
                통신판매업신고번호: 제 A07-20211216-0003 호 <br />
                Copyright © 2021 DeepTrade Technologies <br />
                All rights reserved.
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default XpercentApp;
