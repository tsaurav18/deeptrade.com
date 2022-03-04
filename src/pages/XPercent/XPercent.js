import './XPercent.css';
import { ArrowRightOutlined } from "@ant-design/icons";

function XPercent() {
  return (
      <div className="xpercent_container">
          <div className="xpercent_grid_container">
            <div className="col-6 xpercent_grid_left">
                    <div className="xpercent_title">
                        XPercent
                    </div>
                    <div className="xpercent_content">
                        DeepTrade의 XPercent는 자체적으로 개발한 머신러닝 기술을 이용하여 <br />KOSPI와 KOSDAQ에 상장된 전체 종목 중 투자 가치가 높은 종목 정보를 <br />제공하는 서비스입니다.
                    </div>
                    <div className="xpercent_grid_button">
                        <div className="xpercent_button">
                            XPercent 바로가기 
                            <ArrowRightOutlined style={{marginLeft: 10}} />
                        </div>
                    </div>  
            </div>
            <div className="col-6">
                <img src="assets/xpercent_logo.png" alt="xpercent logo" style={{width: 500, height: 500}} />
            </div>
        </div>
      </div>
  );
}

export default XPercent;