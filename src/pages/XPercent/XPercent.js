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
    const contentTwoInViewport = useIntersection(contentTwoRef, '0px');
    const [showTitle, setShowTitle] = useState(false);
    const [showContentOne, setShowContentOne] = useState(false);
    const [showContentTwo, setShowContentTwo] = useState(false);
  
    useEffect(() => {
      if(titleInViewport) {
            setShowTitle(true);
        }
      if(contentOneInViewport) {
        setShowContentOne(true);
      }
      if(contentTwoInViewport) {
        setShowContentTwo(true);
      }
  
    }, [titleInViewport, contentOneInViewport, contentTwoInViewport])
  return (
      <div className="xpercent_container" ref={props.refProp}>
          <div className="xpercent_grid_container">
            <div className="col-6 xpercent_grid_left">
                    <div className={showTitle ? "xpercent_title xpercent_show" : "xpercent_title"} ref={titleRef}>
                        XPercent
                    </div>
                    <div className={showContentOne ? "xpercent_content xpercent_show" : "xpercent_content"} ref={contentOneRef}>
                        DeepTrade의 XPercent는 자체적으로 개발한 머신러닝 기술을 이용하여 KOSPI와 KOSDAQ에 상장된 전체 종목 중 투자 가치가 높은 종목 정보를 제공하는 서비스입니다.
                    </div>
                    <div className="xpercent_grid_button">
                        <div className={showContentTwo ? "xpercent_button xpercent_show" : "xpercent_button"} onClick={() => {window.open('https://xpct.net', '_blank')}} ref={contentTwoRef}>
                            XPercent 바로가기 
                            <ArrowRightOutlined style={{marginLeft: 10}} />
                        </div>
                    </div>  
            </div>
            <div className="col-6 xpercent_grid_right">
                <img src="assets/xpercent_logo.png" alt="xpercent logo" />
            </div>
        </div>
      </div>
  );
}

export default XPercent;