import './Recruitment.css';
import React, { useRef, useState, useEffect } from 'react'; 
import useIntersection from '../useIntersection';

function Recruitment() {
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
      <div className="recruitment_container">
          <div className="recruitment_background">
            <div className="row gx-0" style={{justifyContent: 'center'}}>
                <div className="recruitment_title">                        
                    <div>Recruitment</div>
                </div>
            </div>
            <div className="row gx-0" style={{justifyContent: 'center'}}>
                <div className="recruitment_content">                        
                    <div>DeepTrade와 함께 할 열정있고 뛰어난 인재들을 찾습니다</div>
                </div>
            </div>
            <div className="row gx-0 recruitment_content_container">
                <div className={showContentOne ? "col-3 recruitment_info recruitment_show1" : "col-3 recruitment_info"} ref={contentOneRef}>
                    <div className="recruitment_info_container">
                        <div className="recruitment_info_title">
                            웹 개발자
                        </div>
                        <div className="divider"></div>
                        <div className="recruitment_info_content_title">
                            Front-End
                        </div>
                        <div className="recruitment_info_content_body">
                            React 및 React Native 사용 경험 보유
                        </div>
                        <div className="recruitment_info_content_title">
                            Back-End
                        </div>
                        <div className="recruitment_info_content_body">
                            MySQL or NoSQL 기반의 아키텍처 개발 경험 보유
                        </div>
                    </div>
                </div>
                <div className={showContentTwo ? "col-3 recruitment_info recruitment_show2" : "col-3 recruitment_info"} ref={contentTwoRef}>
                    <div className="recruitment_info_container">
                        <div className="recruitment_info_title">
                            앱 개발자
                        </div>
                        <div className="divider"></div>
                        <div className="recruitment_info_content_body" style={{marginTop: 20}}>
                            Java, Kotlin, Swift 등의 사용 경험 보유
                        </div>
                        <div className="recruitment_info_content_body">
                            RESTful API 및 React Native 등의 사용 경험
                        </div>
                    </div>
                </div>
                <div className={showContentThree ? "col-3 recruitment_info recruitment_show3" : "col-3 recruitment_info"} ref={contentThreeRef}>
                    <div className="recruitment_info_container">
                        <div className="recruitment_info_title">
                            주가 예측 알고리즘 개발 연구원
                        </div>
                        <div className="divider"></div>
                        <div className="recruitment_info_content_body" style={{marginTop: 20}}>
                            머신러닝 및 딥러닝 알고리즘을 이용 가능하고 구현 능력 보유
                        </div>
                    </div>
                </div>
                <div className={showContentThree ? "col-3 recruitment_info recruitment_show3" : "col-3 recruitment_info"} ref={contentThreeRef}>
                    <div className="recruitment_info_container">
                        <div className="recruitment_info_title">
                            Business Developer
                        </div>
                        <div className="divider"></div>
                        <div className="recruitment_info_content_body" style={{marginTop: 20}}>
                            신규 사업 개발
                        </div>
                        <div className="recruitment_info_content_body">
                            투자자산운용사 우대
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
  );
}

export default Recruitment;