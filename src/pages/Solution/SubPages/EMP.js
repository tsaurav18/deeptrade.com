import React, { useRef, useState, useEffect } from 'react';
import "./StockPortfolio.css"
import useIntersection from '../../useIntersection';
function EMP() {
  const contentOneRef = useRef(null);
  const contentTwoRef = useRef(null);
  const contentThreeRef = useRef(null);
  const contentOneInViewport = useIntersection(contentOneRef, '0px');
  const contentTwoInViewport = useIntersection(contentTwoRef, '0px');
  const contentThreeInViewport = useIntersection(contentThreeRef, '0px');
  const [showContentOne, setShowContentOne] = useState(false);
  const [showContentTwo, setShowContentTwo] = useState(false);
  const [showContentThree, setShowContentThree] = useState(false);

  useEffect(() => {
    if(contentOneInViewport) {
      setShowContentOne(true);
    }
    if(contentTwoInViewport) {
        setShowContentTwo(true);
    }
    if(contentThreeInViewport) {
      setShowContentThree(true);
  }

  }, [contentOneInViewport, contentTwoInViewport, contentThreeInViewport])
  return (
    <div><div style={{ display: "flex", alignItems: "center" }}>
    <div className="col-2 logo">
      <img
        src="assets/deeptrade_logo.png"
        alt="logo"
        style={{ margin: "0px 20px 0 20px" }}
        onClick={() => {
          window.open("https://deeptrade.co/", "_self");
        }}
      />
    </div>
    <div className="col-10">
      <div
        className="menu"
        style={{ justifyContent: "right", display: "flex" }}
      >
        <div
          className="menu_item"
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
 
  <div
    className={"spop_container"}
    style={{ flexDirection: "column", backgroundColor: "#394350" }}
  >
    <div className="service_intro">ETF Managed Portfolio</div>
    {/* <div className="text_title" style={{ color: "white" }}>
    개별 종목 기반 포트폴리오
    </div> */}
    <div
      className="spop_center_text spop_service_body"
      style={{ color: "white", }}
    >
      딥트레이드테크놀로지스 연구진은 딥러닝 및 강화학습 등의 최신 인공지능 기술을 결합하여 ETF 활용 포트폴리오 구성 기술을 개발하였습니다.
<br/>
ETF 종목에 구애 받지 않고 사용자 요구에 따라 구성이 가능하며, 구성된 종목들 간의 현 시장 상황에 맞는 적절한 비중을 추천합니다.
    </div>
  </div>
  <div
    className={"spop_container portfolio_outer_container"}
    style={{ flexDirection: "column", backgroundColor: "white" }}
  >
    <div className={"portfolio_container"} style={{paddingBottom:"3vw"}}>
      <div className="text_title" style={{ color: "#394350" }}>
      딥트레이드 EMP 기술의 특징
      </div>
      {/* <div className="spop_portfolio_center_text">
        서울대학교 주가 예측 스타트업 DeepTrade Technologies가 최신 개발한
        주가 예측 모델입니다.
      </div> */}
      <div className="spop_portfolio_inner_container">
       
        <div className="spop_portfolio_right_container"  >
          <div className="port_top">
            <div className="port_top_title">예측 프로세스
</div>
            <div className="port_top_body">
           * ETF 투자 유니버스를 자유롭게 설정할 수 있습니다.
<br/>
           * 최신 인공지능 기술이 유니버스 종목 간의 관계를 분석하여 현 주식 상황에 맞게 각 비중을 조절합니다.

            </div>
          </div>
        
        </div>
      </div>
      <div className="spop_portfolio_inner_container">
      
        <div className="spop_portfolio_right_container" >
          <div className="port_top">
            <div className="port_top_title">장점</div>
            <div className="port_top_body">
      * 국내/해외 및 주식형/채권형/혼합/대체투자 등 다양한 ETF에 대해 적용 가능 합니다.
<br/>
      * 수익률 추구 뿐만 아니라 MDD도 모델이 고려하여 안정성과 수익성 둘 다 추구하는 입체적인 모델입니다.


            </div>
          </div>
      
        </div>
      </div>
     
    </div>
  </div>
  <div
    className={"spop_container"}
    style={{ flexDirection: "column", backgroundColor: "rgb(240 240 240)" }}
  >
  {/* <div className="row gx-0 tech_icon_container" style={{padding:"118px 0px"}}>
            <div className={showContentOne ? "col-4 tech_icon_ tech_show1" : "col-4 tech_icon_"} ref={contentOneRef}>
                <img src="assets/section-4--grid-1.png" alt="img1" />
                <div className="icon_title">
                   ETF 투자 유니버스 설정 <br/>(고객 맞춤 유니버스)
                </div>
               
            </div>
            <div className={showContentTwo ? "col-4 tech_icon_ tech_show2" : "col-4 tech_icon_"} ref={contentTwoRef}>
                <img src="assets/section-4--grid-img-2.png" alt="img1" />
                <div className="icon_title_">
                   딥러닝과 강화학습을 활용한 ETF 종목 비중 조절
                </div>
               
            </div>
            <div className={showContentThree ? "col-4 tech_icon_ tech_show3" : "col-4 tech_icon_"} ref={contentThreeRef}>
                <img src="assets/section-4--grid-img-3.png" alt="img1" />
                <div className="icon_title_">
                     ETF 포트폴리오 구성
                </div>
               
            </div>
        </div> */}
        <img src='assets/solution/etf_pic1.png' className='sol_img' alt='arrow'></img>

        </div>
        <div
    className={"spop_container"}
    style={{ flexDirection: "column", backgroundColor: "#394350" }}
  >
        <div className="service_intro">딥트레이드 EMP 기술 성과</div>
        <div className="row gx-0 tech_icon_container">
          
        <div className="register_normal_text" style={{marginBottom:"20px", marginTop:"20px"}}>
      <div style={{color:"#FFF",fontSize: "1.2vw"}}> *  코스피 대비 X% 수익 달성 (지난 3년 기준)</div>
<br/>
<div style={{color:"#FFF",fontSize: "1.2vw"}}>* Y% MDD 달성 (지난 3년 기준)</div>

            </div>
       <img src='../../../assets/solution/etf_pic.png'/>

            </div>
      
        </div>
  
  
  </div>
  )
}

export default EMP