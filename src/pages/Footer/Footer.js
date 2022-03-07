import './Footer.css';
import { ArrowRightOutlined } from "@ant-design/icons";

function Footer() {
  return (
      <div className="footer_container">
        <div className="row" style={{justifyContent: 'center'}}>
            <div className="footer_title">
                <div>제휴문의</div>
            </div>
        </div>
        <div className="row">
            <div className="col-3">

            </div>
            <div className="col-6">
                <div className="footer_body_title">
                    증권사/기타 금융사
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-3">

            </div>
            <div className="col-6">
                <div className="footer_body_content">
                    세계 최고 성능의 딥트레이드 AI 로보 어드바이저를 활용 할 금융사의 소중한 제안을 기다리고 있습니다.
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-3">

            </div>
            <div className="col-6">
                <div className="footer_body_title">
                    자산운용사
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-3">

            </div>
            <div className="col-6">
                <div className="footer_body_content">
                    압도적인 지수 초과 수익을 제공하는 딥트레이드의 AI 로보 어드바이저 엔진 기반 펀드를 제공 할 자산운용사의 소중한 제안을 기다리고 있습니다.
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-3">

            </div>
            <div className="col-6">
                <div className="footer_grid_button">
                    <div className="footer_button">
                        제휴 문의 바로가기 
                        <ArrowRightOutlined style={{marginLeft: 10}} />
                    </div>
                </div> 
            </div>
        </div>
        <div className="row">
            <div className="col-2">

            </div>
            <div className="col-8">
                <div className="divider_2"></div>
            </div>
        </div>
        <div className="row" style={{justifyContent: 'center'}}>
            <div className="footer_title">
                <div>Service Contact</div>
            </div>
        </div>
        <div className="row">
            <div className="col-3">

            </div>
            <div className="col-6">
                <div className="row">
                    <div className="col-4">
                        <div className="footer_body_content">
                            DeepTrade 블로그
                        </div>
                        <div className="footer_body_content_und" style={{width: 225}}>
                            네이버 블로그 바로가기
                            <ArrowRightOutlined style={{marginLeft: 10}} />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="footer_body_content">
                            담당자 이메일
                        </div>
                        <div className="footer_body_content_und" style={{width: 290}}>
                            deeptrade.contact@gmail.com
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="footer_body_content">
                            오시는 길
                        </div>
                        <div className="footer_body_content_und">
                            서울시 관악구 관악로1 서울대학교 컴퓨터연구소
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
  );
}

export default Footer;