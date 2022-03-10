import './Main.css';
import React, { useRef, useState, useEffect } from 'react'; 
import useIntersection from '../useIntersection';

function Main(props) {
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
      <div className="main_container2" ref={props.refProp}>
          <div className = "col-2 left">

          </div>
          <div className = "col-10 right">
            
          </div>
          <div className="image_container">
              <div className="col-2">
              </div>
              <div className="col-10 image_content">
                  <div>
                      <img src="../../assets/logo.png" className="content_img" alt="logo" />
                  </div>
                  <div className={showTitle ? "main_container_title show" : "main_container_title"} ref={titleRef}>
                      AI 투자의 혁신을 주도하는 기업
                  </div>
                  <div className={showContentOne ? "main_container_content show" : "main_container_content"} ref={contentOneRef}>
                      DeepTrade는 서울대학교(SNU)의 연구실에서 Spin-off 된 스타트업 벤처기업입니다.
                  </div>
                  <div className={showContentTwo ? "main_container_content show" : "main_container_content"} ref={contentTwoRef}>
                      DeepTrade는 AI투자, 기계학습, 데이터 마이닝 및 대규모 데이터 처리 분야에서 <br />
                      최첨단 연구를 주도하고 있으며 세계적 수준의 연구 논문(KDD, NeurIPS, SDM)들을 <br />
                      통해 역량을 입증하였습니다.
                  </div>
              </div>
            </div>
      </div>
  );
}

export default Main;