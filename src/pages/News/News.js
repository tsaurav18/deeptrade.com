import "./News.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

function News(props) {
  return (
    <div className="news_container" ref={props.refProp}>
      <div className="news_title_container">
        <div className="news_title">News</div>
      </div>
      <div className="news_slide_container">
        <Swiper
          modules={[Navigation]}
          breakpoints={{
            600: {
              slidesPerView: 1,
              width: 480,
            },
            800: {
              slidesPerView: 2,
              width: 800,
            },
            1200: {
              slidesPerView: 2,
              width: 1200,
            },
            1600: {
              slidesPerView: 3,
              width: 1600,
            },
            2000: {
              slidesPerView: 3,
              width: 2000,
            },
          }}
          width="350"
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={true}
        >
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/new15.png" alt="news13" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, NH투자증권 및 펀도라의 고객을 대상으로
                  자문 상품 제공 개시
                </h6>
                <p>2022/12</p>
                <p>
                  딥트레이드테크놀로지스가 코스콤의 자문 플랫폼인 펀도라에서
                  NH투자증권의 고객을 대상으로 자문 상품 판매를 개시했습니다.
                  딥트레이드테크놀로지스는 NH투자증권의 고객을 대상으로 자체
                  개발한 인공지능 기술을 활용하여 위험자산과 안전자산의 비중을
                  조절하여 다양한 펀드 및 ETF로 구성된 포트폴리오를 고객
                  유형별로 제공합니다.{" "}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/new14.png" alt="news13" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, 데이터 마이닝 우수 학회에 텍스트 활용
                  주가 예측을 주제로 논문 게재
                </h6>
                <p>2022/10</p>
                <p>
                  딥트레이드테크놀로지스가 데이터 마이닝 우수 학회인 BigData
                  22에 텍스트와 가격 데이터를 결합하여 정확한 주가 예측을
                  수행하는 인공지능 기술을 주제로 논문을 게재했습니다.
                  딥트레이드테크놀로지스는 본 논문에서 경쟁 인공지능 기술 대비
                  가장 우수한 예측 정확도를 보였습니다.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/new13.png" alt="news13" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스 X KB증권 로보어드바이저 개발 MOU 체결
                </h6>
                <p>2022/09</p>
                <p>
                  딥트레이드테크놀로지스가 KB증권과 로보어드바이저 개발을 위한
                  API 사용에 대한 MOU를 체결하였습니다(2022.09).
                  딥트레이드테크놀로지스는 인공지능 로보어드바이저 XPercent의
                  사용자 편의성을 향상시키기 위한 고도화 협업을 KB 증권과
                  진행합니다. 본 협업을 통해 XPercent의 사용자는 계좌 개설 및
                  포트폴리오 자문 내역에 대한 매매를 KB증권을 통해 편리하게
                  편리하게 사용할 수 있을 것으로 기대됩니다. 그 외에도 KB
                  증권과의 협업을 통해 XPercent에 다양한 편의 기능을 추가할
                  예정이며 완성된 XPercent는 앱 버전으로 연내 출시 예정입니다.{" "}
                  <a
                    href="https://news.mt.co.kr/mtview.php?no=2022100517433057424)%EA%B0%80"
                    target="_blank"
                  >
                    (머니투데이 2022/10/6)
                  </a>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/new12.png" alt="news12" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스 X 퀀팃 로보어드바이저 공동 연구/사업화
                  MOU 체결
                </h6>
                <p>2022/08</p>
                <p>
                  딥트레이드테크놀로지스가 금융 투자 및 운용 솔루션 공급 핀테크
                  기업인 퀀팃과 AI 로보어드바이저 서비스 고도화를 위한 협업
                  MOU를 체결하였습니다 (2022.08.22). 본 협약은
                  딥트레이드테크놀로지스의 AI 로보 어드바이저와 퀀팃의
                  로보어드바이저 및 운영 플랫폼 기술을 접목하여 성능 향상 및
                  사업화를 목표로 합니다.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/new11.png" alt="news11" />
              </div>
              <div className="news_content">
                <h6>딥트레이드테크놀로지스, 삼성증권에서 자문사 서비스 제공</h6>
                <p>2022/06</p>
                <p>
                  딥트레이드테크놀로지스가 삼성증권 고객들에게 자문 서비스를
                  제공합니다. 해당 서비스는 일반형, 연금형, IRP 형 등 다양한
                  고객 자산 유형별로 고객에게 투자 포트폴리오를 제공하며 고객은
                  일괄매매형 및 자율형 거래를 통해 편하게 포트폴리오를 매매할 수
                  있습니다. 딥트레이드테크놀로지스는 더 많은 고객들의 자산을
                  안정적으로 증식시키기 위해 꾸준히 노력하고 있습니다.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/new10.png" alt="news10" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, 2022 창업도약패키지 대기업협업형 최종
                  선정
                </h6>
                <p>2022/05</p>
                <p>
                  딥트레이드테크놀로지스가 한국기술벤처재단과 KB금융 그룹이
                  주관하는 창업도약패키지 대기업협업형 프로그램에 최종
                  선정되었습니다. 창업도약패키지 프로그램은 21년 기준 13.5:1의
                  매우 높은 경쟁률을 보인 프로그램으로, 딥트레이드테크놀로지스는
                  KB 금융 그룹과 AI 기반 로보어드바이저 관련 다양한 협력을
                  진행할 계획입니다.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/new7.png" alt="news7" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스 XPercent, 6개월만에 약 30%의 지수 대비
                  초과 수익 확보
                </h6>
                <p>2022/03</p>
                <p>
                  딥트레이드테크놀로지스의 유진투자증권내 XPercent 서비스가
                  서비스를 개시한 2021년 9월 이후 2022/2 까지 14.73%의 수익율을
                  기록했습니다 (1주 모델). 이는 동 기간 코스피 지수 대비 29.18%,
                  코스닥 지수 대비 29.7% 의 초과 수익을 올린 것입니다.
                  딥트레이드테크놀로지스 로보 어드바이저는 금융 서비스에 혁신을
                  가져오고 있습니다.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/new7.png" alt="news7" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스,유진투자증권 '종목쏙쏙' 내 XPercent
                  서비스 개시
                </h6>
                <p>2021/09</p>
                <p>
                  딥트레이드테크놀로지스의 인공지능 기술을 통해 주식 종목을
                  추천하는 XPercent 서비스를 유진투자증권의 '종목쏙쏙' MTS/HTS
                  서비스에서 제공을 시작하였습니다. 딥트레이드테크놀로지스의
                  추천 종목을 유진투자증권 계좌와 연결하여 바로 매매할 수
                  있습니다.
                  <br />
                  <button
                    className="news_link_button"
                    onClick={() =>
                      window.open(
                        "https://www.hankyung.com/finance/article/2021091314766",
                        "_blank"
                      )
                    }
                  >
                    기사 보기
                  </button>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/news9.png" alt="news1" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, 서울대학교-동서스타트업 프로듀스34
                  대회 수상
                </h6>
                <p>2021/09</p>
                <p>
                  딥트레이드테크놀로지스가 서울대학교와 동서 기업이 함께 주최한
                  프로듀스34 대회에서 IR부문 금상(1위) 및 특별상을
                  수상하였습니다.
                  <br />
                  <button
                    className="news_link_button"
                    onClick={() =>
                      window.open(
                        "http://www.aitimes.kr/news/articleView.html?idxno=22145",
                        "_blank"
                      )
                    }
                  >
                    기사 보기
                  </button>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/news8.jpg" alt="news2" />
              </div>
              <div className="news_content">
                <h6>딥트레이드테크놀로지스, 투자자문업 등록 완료</h6>
                <p>2021/09</p>
                <p>
                  딥트레이드테크놀로지스가 금융감독원으로부터 투자자문업 운영
                  적격 판전을 받았으며, 엄격한 심사 끝에 투자자문업 자격을
                  취득하였고 등록 완료 하였습니다.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/news5.png" alt="news5" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, 인공지능 분야 최우수 학회 KDD 2021에
                  논문 게재 승인
                </h6>
                <p>2021/05</p>
                <p>
                  인공지능 분야 최고 학회 중 하나인 SIGKDD 2021에 주가 예측을
                  주제로 한 딥트레이드테크놀로지스의 “Accurate Multivariate
                  Stock Movement Prediction via Data-Axis Transformer with
                  Multi-Level Contexts” 논문 게재가 승인되었습니다. 해당 논문은
                  미국, 중국, 영국, 일본 시장에서 기존 State Of The
                  Art(SOTA)보다 우수한 성능을 낸 주가 예측 방법을 제시합니다.
                  <br />
                  <button
                    className="news_link_button"
                    onClick={() =>
                      window.open(
                        "http://www.startupn.kr/news/articleView.html?idxno=12746",
                        "_blank"
                      )
                    }
                  >
                    기사 보기
                  </button>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/news1.png" alt="news4" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, 2021 해동 주니어 지원 프로그램 수상
                </h6>
                <p>2021/03</p>
                <p>
                  해동 과학 문화 재단이 주관하는 서울대학교 내 스타트업 경진
                  대회에서 딥트레이드테크놀로지스는 우수 스타트업으로 선정되어
                  창업 지원금 1천만원을 수상하였습니다.
                  <br />
                  <button
                    className="news_link_button"
                    onClick={() =>
                      window.open(
                        "http://press.newslook.co.kr/newsRead.php?no=919731",
                        "_blank"
                      )
                    }
                  >
                    기사 보기
                  </button>
                </p>
              </div>
            </div>
          </SwiperSlide>
          {/* <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/news4.png" alt="news5" />
              </div>
              <div className="news_content">
                <h6>딥트레이드테크놀로지스, 강화학습 포트폴리오 관리 특허 출원</h6>
                <p>2021/03</p>
                <p>
                  딥트레이드테크놀로지스가 포트폴리오 관리에 사용하는 개선된 강화학습
                  방법론에 대해 특허를 출원하였습니다.
                </p>
              </div>
            </div>
          </SwiperSlide> */}
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/news2.png" alt="news5" />
              </div>
              <div className="news_content">
                <h6>VC 투자회사 스프링캠프로부터 시드투자 유치</h6>
                <p>2020/12</p>
                <p>
                  딥트레이드테크놀로지스가 '오늘의 집', '클래스 101' 등의 검증된
                  서비스에 투자한 투자 전문 VC 회사인 스프링캠프로부터 시드투자
                  유치를 하였습니다.
                </p>
                <button
                  className="news_link_button"
                  onClick={() =>
                    window.open(
                      "https://www.venturesquare.net/822952",
                      "_blank"
                    )
                  }
                >
                  기사 보기
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/news3.png" alt="news5" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, 데이터 마이닝 분야 최우수 학회 SDM
                  2021에 논문 게재 승인
                </h6>
                <p>2020/12</p>
                <p>
                  데이터 마이닝 분야 최고 학회 중 하나인 SDM 2021에
                  'Attention-Based Autoregression for Accurate and Efficient
                  Multivariate Time Series Forecasting' 논문 게재가
                  승인되었습니다. 해당 논문은 주식 가격, 교통량, 실내 온도 등
                  여러 변수로 이루어진 시계열 데이터(time series)를 예측할 때
                  변수간 관계를 자동으로 학습하는 새로운 예측 모델을 제안합니다.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default News;
