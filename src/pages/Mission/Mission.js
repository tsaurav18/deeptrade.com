import "./Mission.css";
import React, { useRef, useState, useEffect } from "react";
import useIntersection from "../useIntersection";

function Mission(props) {
  const titleRef = useRef(null);
  const contentOneRef = useRef(null);
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
    <div className="mission_container" ref={props.refProp}>
      <div className="mission_grid_container">
        <div className="col-6"></div>
        <div className="col-10 col-md-10 col-xl-6 mission_grid_right">
          <div
            className={
              showTitle ? "mission_title mission_show" : "mission_title"
            }
            ref={titleRef}
          >
            Mission
          </div>
          <div
            className={
              showContentOne
                ? "mission_content mission_show"
                : "mission_content"
            }
            ref={contentOneRef}
          >
            DeepTrade Technologies는 최신의 AI 기술과 금융 데이터를 활용해
            투자에 반영하는 AI 로보 어드바이저의 선구자로서 시장의 복잡한 패턴을
            분석하여 사용자들이 인덱스보다 X% 더 높은 수익률을 얻을 수 있도록
            끊임없이 노력합니다.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mission;
