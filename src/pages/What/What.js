import './What.css';

function What() {
  return (
      <div className="what_container">
          <div className="col-6 left_image">
            <img src="assets/section-1--img.png" alt="section 1" />
          </div>
          <div className="col-6" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <div className="row gx-0 my-4 right_1">
                What We Do
            </div>
            <div className="row gx-0 my-4 right_2">
                투자안을 제시하고, 위험에 대응하는 소프트웨어를 개발하여 시장에서의 <br />기회를 탐색합니다.
            </div>
            <div className="row gx-0 my-4 right_3">
                기계학습과 신경망 기술을 사용하여 거대한 시장과 금융 데이터를 <br />분석합니다.
            </div>
            <div className="row gx-0 my-4 right_4">
                투자를 위한 고도의 정량적 인공지능 기술을 사용하여 시장의 비효율을 <br />감지합니다.
            </div>
          </div>
      </div>
  );
}

export default What;