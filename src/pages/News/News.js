import './News.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

function News(props) {
  return (
      <div className="news_container" ref={props.refProp}>
          <div className="news_title_container">
            <div className="news_title">
                News
            </div>
          </div>
          <div className="news_slide_container">
            <Swiper
                modules={[Navigation]}
                breakpoints={{
                    600: {
                        slidesPerView: 1,
                        width: 480
                    },
                    800: {
                        slidesPerView: 2,
                        width: 800
                    },
                    1200: {
                        slidesPerView: 2,
                        width: 1200
                    },
                    1600: {
                        slidesPerView:3,
                        width: 1600
                    },
                    2000: {
                        slidesPerView:3,
                        width: 2000
                    }
                }}
                width="350"
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                navigation = {true}
                >
                    <SwiperSlide>
                        <div className="news_slide">
                            <div className="news_image">
                                <img src="assets/news/news6.png" alt="news6" />
                            </div>
                            <div className="news_content">
                                <h6>딥트레이드, (주)푸시와 AI 주가 예측 알고리즘 서비스 개시</h6>
                                <p>2021/11</p>
                                <p>딥트레이드의 인공지능 기술을 통해 주식 종목을 추천하는 XPercent 서비스를
                                    (주)푸시에 '푸시블랙 알고리즘'이라는 이름으로 공급을 시작하였습니다.    <br />
                                    <button className="news_link_button" onClick={()=>window.open("https://news.mt.co.kr/mtview.php?no=2021110309182225907", '_blank')}>기사 보기</button>

                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="news_slide">
                            <div className="news_image">
                                <img src="assets/news/news7.png" alt="news7" />
                            </div>
                            <div className="news_content">
                                <h6>딥트레이드,유진투자증권 '종목쏙쏙' 내 XPercent 서비스 개시</h6>
                                <p>2021/09</p>
                                <p>딥트레이드의 인공지능 기술을 통해 주식 종목을 추천하는 XPercent 서비스를
                                    유진투자증권의 '종목쏙쏙' MTS/HTS 서비스에서 제공을 시작하였습니다.
                                    딥트레이드의 추천 종목을 유진투자증권 계좌와 연결하여 바로 매매할 수 있습니다.<br />
                                    <button className="news_link_button" onClick={()=>window.open("https://www.hankyung.com/finance/article/2021091314766", '_blank')}>기사 보기</button>
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
                                <h6>딥트레이드, 서울대학교-동서스타트업 프로듀스34 대회 수상</h6>
                                <p>2021/09</p>
                                <p>딥트레이드가 서울대학교와 동서 기업이 함께 주최한 프로듀스34 대회에서
                                    IR부문 금상(1위) 및 특별상을 수상하였습니다.<br />
                                    <button className="news_link_button" onClick={()=>window.open("http://www.aitimes.kr/news/articleView.html?idxno=22145", '_blank')}>기사 보기</button>
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
                                <h6>딥트레이드, 투자자문업 등록 완료</h6>
                                <p>2021/09</p>
                                <p>딥트레이드가 금융감독원으로부터 투자자문업 운영 적격 판전을 받았으며, 엄격한 심사
                                    끝에 투자자문업 자격을 취득하였고 등록 완료 하였습니다.
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
                                <h6>딥트레이드, 인공지능 분야 최우수 학회 KDD 2021에 논문 게재 승인</h6>
                                <p>2021/05</p>
                                <p>인공지능 분야 최고 학회 중 하나인 SIGKDD 2021에 주가 예측을 주제로 한 딥트레이드의
                                    “Accurate
                                    Multivariate Stock Movement Prediction via Data-Axis
                                    Transformer with Multi-Level Contexts” 논문 게재가 승인되었습니다.
                                    해당 논문은 미국, 중국, 영국, 일본 시장에서 기존 State Of The Art(SOTA)보다 우수한 성능을 낸 주가 예측 방법을
                                    제시합니다.<br />
                                    <button className="news_link_button" onClick={()=>window.open("http://www.startupn.kr/news/articleView.html?idxno=12746", '_blank')}>기사 보기</button>
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
                                <h6>딥트레이드, 2021 해동 주니어 지원 프로그램 수상</h6>
                                <p>2021/03</p>
                                <p>해동 과학 문화 재단이 주관하는 서울대학교 내 스타트업 경진 대회에서
                                    딥트레이드는 우수 스타트업으로 선정되어 창업 지원금 1천만원을 수상하였습니다.<br />
                                    <button className="news_link_button" onClick={()=>window.open("http://press.newslook.co.kr/newsRead.php?no=919731", '_blank')}>기사 보기</button>
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="news_slide">
                            <div className="news_image">
                                <img src="assets/news/news4.png" alt="news5" />
                            </div>
                            <div className="news_content">
                                <h6>딥트레이드, 강화학습 포트폴리오 관리 특허 출원</h6>
                                <p>2021/03</p>
                                <p>딥트레이드가 포트폴리오 관리에 사용하는 개선된 강화학습 방법론에 대해
                                    특허를 출원하였습니다.
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="news_slide">
                            <div className="news_image">
                                <img src="assets/news/news2.png" alt="news5" />
                            </div>
                            <div className="news_content">
                             <h6>VC 투자회사 스프링캠프로부터 시드투자 유치</h6>
                                <p>2020/12</p>
                                <p>딥트레이드가 '오늘의 집', '클래스 101' 등의 검증된 서비스에 투자한
                                    투자 전문 VC 회사인 스프링캠프로부터 시드투자 유치를 하였습니다.</p>
                                <button className="news_link_button" onClick={()=>window.open("https://www.venturesquare.net/822952", '_blank')}>기사 보기</button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="news_slide">
                            <div className="news_image">
                                <img src="assets/news/news3.png" alt="news5" />
                            </div>
                            <div className="news_content">
                                <h6>딥트레이드, 데이터 마이닝 분야 최우수 학회 SDM 2021에 논문 게재 승인</h6>
                                <p>2020/12</p>
                                <p>데이터 마이닝 분야 최고 학회 중 하나인 SDM 2021에 'Attention-Based
                                    Autoregression for Accurate and
                                    Efficient Multivariate Time Series Forecasting' 논문 게재가 승인되었습니다. 해당 논문은 주식
                                    가격,
                                    교통량, 실내 온도 등 여러 변수로 이루어진 시계열 데이터(time series)를 예측할 때 변수간 관계를 자동으로 학습하는 새로운
                                    예측
                                    모델을 제안합니다.
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