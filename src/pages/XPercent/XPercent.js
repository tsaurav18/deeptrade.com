import './XPercent.css';
import { ArrowRightOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from 'react'; 
import useIntersection from '../useIntersection';

function XPercent(props) {
    const titleRef = useRef(null);
    const contentOneRef = useRef(null);
    const contentTwoRef = useRef(null);
    const titleInViewport = useIntersection(titleRef, '0px');
    const contentOneInViewport = useIntersection(contentOneRef, '0px');
    const [showTitle, setShowTitle] = useState(false);
    const [showContentOne, setShowContentOne] = useState(false);
  
    useEffect(() => {
      if(titleInViewport) {
            setShowTitle(true);
        }
      if(contentOneInViewport) {
        setShowContentOne(true);
      }
  
    }, [titleInViewport, contentOneInViewport])
  return (
      <div ref={props.refProp}>
          <div className="xpercent_grid_container container-xxl">
            <div className="row">
              <div className="col-12">
                <div className={showTitle ? "xpercent_title xpercent_show" : "xpercent_title"} ref={titleRef}>
                    Service
                </div>
              </div>
            </div>
            <div className="row g-0">
              <div className="col-12">
                      <div className={showContentOne ? "xpercent_content xpercent_show" : "xpercent_content"} ref={contentOneRef}>
                        <div className="row">
                          <div className="col-12 col-md-4">
                                <div style={{textAlign: 'center', backgroundColor: '#16334f', borderRadius: 5, color: 'white', fontSize: 15, padding: '5px 0'}}>
                                  모델 포트폴리오형 자문서비스
                                </div>
                                <div className="row" style={{marginTop: 10}}>
                                  <div className="col-3" style={{display: 'flex', alignItems: 'center'}}>
                                    <img src="assets/product/samsung_logo.png" alt="samsung_logo" style={{width: '100%'}} />
                                  </div>
                                  <div className="col-9 xpercent_text">
                                    정기적으로 편리하게 일괄 리밸런싱을 통해 장기적인 우상향 포트폴리오 서비스를 제공받을 수 있습니다.
                                  </div>
                                </div>
                                <div className="row" style={{marginTop: 10}}>
                                  <div className="col-12">
                                    <img src="assets/product/mpop.png" alt="monimo" style={{width: '100%'}} />
                                  </div>
                                </div>
                          </div>
                          <div className="col-12 col-md-8">
                                <div className="signal_class" style={{textAlign: 'center', backgroundColor: '#16334f', borderRadius: 5, color: 'white', fontSize: 15, padding: '5px 0'}}>
                                  시그널형 자문서비스
                                </div>
                                <div className="row">
                                  <div className="col-12 col-md-6">
                                    <div className="row" style={{marginTop: 10}}>
                                      <div className="col-3" style={{display: 'flex', alignItems: 'center'}}>
                                        <img src="assets/product/deep_logo.png" alt="deeptrade_logo" style={{width: '100%'}} />
                                      </div>
                                      <div className="col-9 xpercent_text">
                                        장/단기 상승확률이 높은 종목의 시그널을 섹터별로 제공받아 사용자의 성향에 적합한 포트폴리오 구성이 가능합니다.
                                      </div>
                                    </div>
                                    <div className="row" style={{marginTop: 10}}>
                                      <div className="col-12">
                                        <img src="assets/product/xpct_logo.png" alt="xpct_logo" style={{width: '100%'}} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="row" style={{marginTop: 10}}>
                                      <div className="col-3" style={{display: 'flex', alignItems: 'center'}}>
                                        <img src="assets/product/eugene_logo.png" alt="eugene_logo" style={{width: '100%'}} />
                                      </div>
                                      <div className="col-9 xpercent_text">
                                        하루 또는 일주일 단위로 단기 상승확률이 높은 종목의 시그널을 받아 적극적인 포트폴리오 구성이 가능합니다.
                                      </div>
                                    </div>
                                    <div className="row" style={{marginTop: 10}}>
                                      <div className="col-12">
                                        <img src="assets/product/champion_logo.png" alt="champion_logo" style={{width: '100%'}} />
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

export default XPercent;