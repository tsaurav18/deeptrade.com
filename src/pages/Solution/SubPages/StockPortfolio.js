import React, { useRef, useState, useEffect } from 'react';
import "./StockPortfolio.css"
import useIntersection from '../../useIntersection';
function StockPortfolio() {
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
    <div> <div style={{ display: "flex", alignItems: "center" }}>
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
    <div className="service_intro">개별 종목 기반 포트폴리오</div>
    {/* <div className="text_title" style={{ color: "white" }}>
    개별 종목 기반 포트폴리오
    </div> */}
    <div
      className="spop_center_text spop_service_body"
      style={{ color: "white", }}
    >
      딥트레이드테크놀로지스 연구진은 딥러닝 등의 최신 인공지능 기술을 사용하여 국내 상장 전체 종목(코스피, 코스닥)의 방향성 예측 기술을 개발하였습니다.<br/>
어떠한 시장 상황에서도 상승하는 종목을 발굴할 수 있으며, 사용자 컴플라이언스를 고려하여 사용자 맞춤형 최적 포트폴리오를 구성할 수 있습니다.
    </div>
  </div>
  <div
    className={"spop_container portfolio_outer_container"}
    style={{ flexDirection: "column", backgroundColor: "white" }}
  >
    <div className={"portfolio_container"} style={{paddingBottom:"3vw"}}>
      <div className="text_title" style={{ color: "#394350" }}>
      개별 종목 기반 포트폴리오의 특징
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
           * 최신 인공지능과 다양한 국내외 금융데이터를 활용하여 각 종목별 상승 확률을 계산합니다.<br/>
           * 다양한 리스크 컴플라이언스를 활용해 안전하면서도 상승 확률이 높은 종목으로 포트폴리오를 구성합니다.

            </div>
          </div>
        
        </div>
      </div>
      <div className="spop_portfolio_inner_container">
      
        <div className="spop_portfolio_right_container" >
          <div className="port_top">
            <div className="port_top_title">장점</div>
            <div className="port_top_body">
      * 국내 거래소 전체 종목(코스피, 코스닥)의 상승확률을 예측할 수 있습니다.<br/>
      * 1일에서 최대 6개월까지 다양한 기간 동안의 상승 종목 예측을 통해 시의적절한 투자가 가능합니다.

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
                <div className="icon_title_">
                   전체 종목 상승 확률 
                </div>
               
            </div>
            <div className={showContentTwo ? "col-4 tech_icon_ tech_show2" : "col-4 tech_icon_"} ref={contentTwoRef}>
                <img src="assets/section-4--grid-img-2.png" alt="img1" />
                <div className="icon_title_">
                   리스크 컴플라이언스
                </div>
               
            </div>
            <div className={showContentThree ? "col-4 tech_icon_ tech_show3" : "col-4 tech_icon_"} ref={contentThreeRef}>
                <img src="assets/section-4--grid-img-3.png" alt="img1" />
                <div className="icon_title">
                    포트폴리오 구성
                </div>
               
            </div>
        </div> */}
<img src='assets/solution/stockport_pic.png' className='sol_img' alt='arrow'></img>

        </div>
        <div
    className={"spop_container"}
    style={{ flexDirection: "column", backgroundColor: "#394350"}}
  >
        <div className="service_intro">개별 종목 기반 포트폴리오의 성과</div>
        <div className="row gx-0 tech_icon_container">
          
        <div className="register_normal_text" style={{marginBottom:"20px", marginTop:"20px"}}>
     <div style={{color:"#FFF",fontSize: "1.2vw"}}>  *  해당 기술 기반 서비스 유진투자증권 2년 이상 제공 중</div>
     <div style={{color:"#FFF",fontSize: "1.2vw"}}>  * 22년 하락장에서 지수대비 50%p 수익</div>
            </div>
       <img src='../../../assets/solution/stockportfolio_img.png'/>

            </div>
      
        </div>
</div>
  )
}

export default StockPortfolio