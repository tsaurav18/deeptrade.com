import './Technology.css';

function Technology() {
  return (
      <div className="row gx-0 technology_container">
        <div className="row" style={{margin: '100px 0', justifyContent: 'center'}}>
            <div className="technology_title">
                <div>Technology</div>
            </div>
        </div>
        <div className="row gx-0" style={{padding: '0 300px'}}>
            <div className="col-4 tech_icon">
                <img src="assets/section-4--grid-1.png" alt="img1" />
                <div className="icon_title">
                    Artificial Intelligence (인공지능)
                </div>
                <div className="icon_content">
                    고도의 인공지능 기반 알고리즘을 통해 최첨단 <br />거래 전략을 개발합니다.
                </div>
            </div>
            <div className="col-4 tech_icon">
                <img src="assets/section-4--grid-img-2.png" alt="img1" />
                <div className="icon_title">
                    Up-to-Date Strategies (최신 전략)
                </div>
                <div className="icon_content">
                    최신 시장 동향과 기회를 포착할 수 있도록 거래 <br />전략을 지속적으로 자동 업데이트 합니다.
                </div>
            </div>
            <div className="col-4 tech_icon">
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