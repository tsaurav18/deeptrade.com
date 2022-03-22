import './Technology.css';
import React, { useRef, useState, useEffect } from 'react'; 
import useIntersection from '../useIntersection';

function Technology(props) {
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
      <div className="row gx-0 technology_container" ref={props.refProp}>
        <div className="row technology_title_container">
            <div className="technology_title">
                <div>Technology</div>
            </div>
        </div>
        <div className="row gx-0 tech_icon_container">
            <div className={showContentOne ? "col-4 tech_icon tech_show1" : "col-4 tech_icon"} ref={contentOneRef}>
                <img src="assets/section-4--grid-1.png" alt="img1" />
                <div className="icon_title">
                    Artificial Intelligence (인공지능)
                </div>
                <div className="icon_content">
                고도의 AI 기반 알고리즘을 통해 최첨단 <br />거래 전략을 개발합니다.
                </div>
            </div>
            <div className={showContentTwo ? "col-4 tech_icon tech_show2" : "col-4 tech_icon"} ref={contentTwoRef}>
                <img src="assets/section-4--grid-img-2.png" alt="img1" />
                <div className="icon_title">
                    Up-to-Date Strategies (최신 전략)
                </div>
                <div className="icon_content">
                최신 시장 동향과 기회를 포착하도록 거래 전략을 <br />지속적으로 자동 업데이트 합니다.
                </div>
            </div>
            <div className={showContentThree ? "col-4 tech_icon tech_show3" : "col-4 tech_icon"} ref={contentThreeRef}>
                <img src="assets/section-4--grid-img-3.png" alt="img1" />
                <div className="icon_title">
                    Trading Infrastructure (거래 인프라)
                </div>
                <div className="icon_content">
                    최신 글로벌 금융 및 시장 데이터와 자동 거래 <br />시스템을 포함한 견고한 거래 인프라를 갖추었습니다.
                </div>
            </div>
        </div>
        <div>
            
        </div>
      </div>
  );
}

export default Technology;