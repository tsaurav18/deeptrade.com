import './What.css';
import React, { useRef, useState, useEffect } from 'react'; 
import useIntersection from '../useIntersection';

function What(props) {
  const titleRef = useRef(null);
  const contentOneRef = useRef(null);
  const contentTwoRef = useRef(null);
  const contentThreeRef = useRef(null);
  const titleInViewport = useIntersection(titleRef, '0px');
  const contentOneInViewport = useIntersection(contentOneRef, '0px');
  const contentTwoInViewport = useIntersection(contentTwoRef, '0px');
  const contentThreeInViewport = useIntersection(contentThreeRef, '0px');

  const [showTitle, setShowTitle] = useState(false);
  const [showContentOne, setShowContentOne] = useState(false);
  const [showContentTwo, setShowContentTwo] = useState(false);
  const [showContentThree, setShowContentThree] = useState(false);

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
    if(contentThreeInViewport) {
      setShowContentThree(true);
  }

  }, [titleInViewport, contentOneInViewport, contentTwoInViewport, contentThreeInViewport])


  return (
      <div className="what_container" ref={props.refProp}>
          <div className="col-6 left_image">
            <img src="assets/section-1--img.png" alt="section 1" />
          </div>
          <div className="col-6" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <div className={showTitle ? "row gx-0 my-2 my-xl-4 right_1 what_show" : "row gx-0 my-2 my-xl-4 right_1"} ref={titleRef}>
                What We Do
            </div>
            <div className={showContentOne ? "row gx-0 my-2 my-xl-4 right_2 what_show" : "row gx-0 my-2 my-xl-4 right_2"} ref={contentOneRef}>
                투자안을 제시하고, 위험에 대응하는 소프트웨어를 개발하여 시장에서의 <br className="break" />기회를 탐색합니다.
            </div>
            <div className={showContentTwo ? "row gx-0 my-2 my-xl-4 right_3 what_show" : "row gx-0 my-2 my-xl-4 right_3"} ref={contentTwoRef}>
                기계학습과 신경망 기술을 사용하여 거대한 시장과 금융 데이터를 <br className="break" />분석합니다.
            </div>
            <div className={showContentThree ? "row gx-0 my-2 my-xl-4 right_4 what_show" : "row gx-0 my-2 my-xl-4 right_4"} ref={contentThreeRef}>
                투자를 위한 고도의 정량적 인공지능 기술을 사용하여 시장의 비효율을 <br className="break" />감지합니다.
            </div>
          </div>
      </div>
  );
}

export default What;