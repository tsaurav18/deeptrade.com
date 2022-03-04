import './Recruitment.css';

function Recruitment() {
  return (
      <div className="recruitment_container">
          <div className="recruitment_background">
            <div className="row" style={{justifyContent: 'center'}}>
                <div className="recruitment_title">                        
                    <div>Technology</div>
                </div>
            </div>
            <div className="row" style={{justifyContent: 'center'}}>
                <div className="recruitment_content">                        
                    <div>DeepTrade와 함께 할 열정있고 뛰어난 인재들을 찾습니다</div>
                </div>
            </div>
            <div className="row gx-0" style={{padding: '0 300px'}}>
                <div className="col-4 recruitment_info">
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
                <div className="col-4 recruitment_info">
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
                <div className="col-4 recruitment_info">
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
            </div>
        </div>
      </div>
  );
}

export default Recruitment;