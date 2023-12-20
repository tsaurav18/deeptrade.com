import "./XPercent.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import useIntersection from "../useIntersection";

function XPercent(props) {
  const titleRef = useRef(null);
  const contentOneRef = useRef(null);
  const contentTwoRef = useRef(null);
  const titleInViewport = useIntersection(titleRef, "0px");
  const contentOneInViewport = useIntersection(contentOneRef, "0px");
  const [showTitle, setShowTitle] = useState(false);
  const [showContentOne, setShowContentOne] = useState(false);

  useEffect(() => {
    if (titleInViewport) {
      setShowTitle(true);
    }
    if (contentOneInViewport) {
      setShowContentOne(true);
    }
  }, [titleInViewport, contentOneInViewport]);
  return (
    <div ref={props.refProp}>
      <div className="xpercent_grid_container container-xxl">
        <div className="row">
          <div className="col-12">
            <div
              className={
                showTitle ? "xpercent_title xpercent_show" : "xpercent_title"
              }
              ref={titleRef}
            >
              Service
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div className="col-12">
            <div
              className={
                showContentOne
                  ? "xpercent_content xpercent_show"
                  : "xpercent_content"
              }
              ref={contentOneRef}
            >
              <div className="row">
                <div className="col-12 col-md-4">
                  <div
                    style={{
                      textAlign: "center",
                      backgroundColor: "#16334f",
                      borderRadius: 5,
                      color: "white",
                      fontSize: 15,
                      padding: "5px 0",
                    }}
                  >
                    모델 포트폴리오형 자문서비스
                  </div>
                  <div className="row" style={{ marginTop: 10 }}>
                    <div
                      className="col-3"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        src="assets/product/samsung_logo.png"
                        alt="samsung_logo"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-9 xpercent_text">
                      정기적으로 편리하게 일괄 리밸런싱을 통해 장기적인 우상향
                      포트폴리오 서비스를 제공받을 수 있습니다.
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: 10 }}>
                    <div className="col-12">
                      <img
                        src="assets/product/mpop.png"
                        alt="monimo"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div
                    className="service_button"
                    onClick={() => {
                      window.open("/spop", "_blank");
                    }}
                  >
                    서비스 상세 보기
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <div
                    className="signal_class"
                    style={{
                      textAlign: "center",
                      backgroundColor: "#16334f",
                      borderRadius: 5,
                      color: "white",
                      fontSize: 15,
                      padding: "5px 0",
                    }}
                  >
                    시그널형 자문서비스
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="row" style={{ marginTop: 10 }}>
                        <div
                          className="col-3"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <img
                            src="assets/deeptrade_logo.png"
                            alt="deeptrade_logo"
                            style={{ width: "100%" }}
                          />
                        </div>
                        <div className="col-9 xpercent_text">
                          장/단기 상승확률이 높은 종목의 시그널을 섹터별로
                          제공받아 사용자의 성향에 적합한 포트폴리오 구성이
                          가능합니다.
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-12">
                          <img
                            src="assets/product/xpct_logo.png"
                            alt="xpct_logo"
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                      <div
                        className="service_button"
                        onClick={() => {
                          window.open("https://xpercent.io", "_blank");
                        }}
                      >
                        서비스 상세 보기
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="row" style={{ marginTop: 10 }}>
                        <div
                          className="col-3"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <img
                            src="assets/product/eugene_logo.png"
                            alt="eugene_logo"
                            style={{ width: "100%" }}
                          />
                        </div>
                        <div className="col-9 xpercent_text">
                          하루 또는 일주일 단위로 단기 상승확률이 높은 종목의
                          시그널을 받아 적극적인 포트폴리오 구성이 가능합니다.
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-12">
                          <img
                            src="assets/product/champion_logo.png"
                            alt="champion_logo"
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                      <div
                        className="service_button"
                        onClick={() => {
                          window.open("/eugene", "_blank");
                        }}
                      >
                        서비스 상세 보기
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


{/* New row */}
        {/* <div className="row g-0" style={{marginTop:"10px"}}>
          <div className="col-12">
            <div
              className=
                "xpercent_show"
                  
      
            
            >
              <div className="row" style={{}}>
                <div className="col-12 col-md-4"> 
                  <div
                    style={{
                      textAlign: "center",
                      backgroundColor: "#16334f",
                      borderRadius: 5,
                      color: "white",
                      fontSize: 15,
                      padding: "5px 0",
                    }}
                  >
               ETF 관리형 자문서비스
                  </div>
                  <div className="row" style={{ marginTop: 10,  }}>
                    <div
                      className="col-3"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src="assets/partnership/DB_investment.png" alt="DB_investment" style={{width:"100%"}}/>
                    </div>
                    <div className="col-9 xpercent_text">
                      리밸런싱 기간에 맞춘 적절한 ETF 비중 분배를 통해 안정적인 EMP를 구축할 수 있습니다. 
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: 10, padding:"0px 10px"}}>
                    <div className="col-12" style={{textAlign:"center",backgroundColor:"#e7e7e7",borderRadius:4}}>
                      <img
                        src="assets/product/DB_investment.png"
                        alt="DB_investment"
                        style={{ width: "80%" }}
                      />
                    </div>
                  </div>
                 
                </div>
                <div className="col-12 col-md-8">
                  <div
                    className="signal_class"
                    style={{
                      textAlign: "center",
                      backgroundColor: "#16334f",
                      borderRadius: 5,
                      color: "white",
                      fontSize: 15,
                      padding: "5px 0",
                    }}
                  >
                  기업용 솔루션                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6" style={{}}>
                      <div className="row" style={{ marginTop: 10 }}>
                        <div
                          className="col-3"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <img
                            src="assets/product/circular_lines.png"
                            alt="circular_lines"
                            style={{ width: "60%" }}
                          />
                        </div>
                        <div className="col-9 xpercent_text">
                        국내외 거시 지표를 활용하여 경기 국면을 예측하고, 이를 적절한 자산 배분으로 연결합니다. 
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: 10 ,padding:"0px 10px"}}>
                        <div className="col-12"style={{textAlign:"center", backgroundColor:"#e7e7e7",borderRadius:4}}>
                          <img
                            src="assets/product/graph_product_logo.png"
                            alt="graph_product_logo"
                            style={{ width: "79%", }}
                          />
                        </div>
                      </div>
                      
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="row" style={{ marginTop: 10 , }}>
                        <div
                          className="col-3"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <img
                            src="assets/product/koreainvestment_logo.jpeg"
                            alt="koreainvestment_logo"
                            style={{ width: "60%" }}
                          />
                        </div>
                        <div className="col-9 xpercent_text">
                          기업의 선호 조건에 부합하는 종목을 대상으로 상승확률이 높은 종목의 시그널을 제공합니다. 
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: 10,padding:"0px 10px"}}>
                        <div className="col-12" style={{textAlign:"center",backgroundColor:"#e7e7e7", borderRadius:4}}>
                          <img
                            src="assets/partnership/korea_investment.png"
                            alt="korea_investment"
                            style={{ width: "79%" }}
                          />
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
}

export default XPercent;
