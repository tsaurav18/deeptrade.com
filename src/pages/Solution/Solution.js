import "../XPercent/XPercent.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import useIntersection from "../useIntersection";

function Solution(props) {
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

      {/* Solution */}
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div
              className={
                showTitle ? "xpercent_title xpercent_show" : "xpercent_title"
              }
              ref={titleRef}
            >
              Solution
            </div>
          </div>
        </div>

        <div className="row g-0" >
  <div className="col-12">
    <div
    className=
      "xpercent_show"   
  >
    <div className="row" >
  
      <div className="col-12">
     
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
             개별 종목 기반 포트폴리오
                  </div>
        <div className="row" style={{ marginTop: 10, height:"73px" }}>
          <div
            className="col-3"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src="assets/deeptrade_logo.png" alt="deeptrade" style={{width:"100%"}}/>
          </div>
          <div className="col-9 xpercent_text">
        장단기 시장 전체 개별 종목 예측 시그널을 토대로 고객 맞춤형 포트폴리오 구성이 가능합니다.  
          </div>
        </div>
        <div className="row" style={{ marginTop: 10, padding:"0px 10px"}}>
          <div className="col-12" style={{textAlign:"center",backgroundColor:"#e7e7e7",borderRadius:4}}>
            <img
              src="assets/product/stockPortfolio.png"
              alt="image"
              style={{ width: "100%" }}
            />
          </div>
        </div>
       
        </div>
          <div className="col-12 col-md-4" style={{}}>
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
                    EMP
                  </div>
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
              고객 투자 유니버스와 시장 상황에 맞춘 수익률과 안정성을 동시에 추구하는 ETF 포트폴리오를 구성할 수 있습니다. 
              </div>
            </div>
            <div className="row" style={{ marginTop: 10 ,padding:"0px 10px"}}>
              <div className="col-12"style={{textAlign:"center", backgroundColor:"#e7e7e7",borderRadius:4}}>
                <img
                  src="assets/product/etfport_logo.png"
                  alt="etf_image"
                  style={{ width: "100%", }}
                />
              </div>
            </div>
            
          </div>
          <div className="col-12 col-md-4">
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
                    위험관리 
                  </div>
            <div className="row" style={{ marginTop: 10 , }}>
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
              시장 상황에 맞는 인덱스 롱-숏 비중을 제공받아 시장 수익률보다 높은 수익률을 추구하는 포트폴리오 구성이 가능합니다.
              </div>
            </div>
            <div className="row" style={{ marginTop: 10,padding:"0px 10px"}}>
              <div className="col-12" style={{textAlign:"center",backgroundColor:"#e7e7e7", borderRadius:4}}>
                <img
                  src="assets/product/riskmang_logo.png"
                  alt="riskmang_logo"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>


       
      </div>
    </div>
  );
}

export default Solution;
