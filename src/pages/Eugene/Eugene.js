import { render } from '@testing-library/react';
import React, { useRef, useEffect, useState } from 'react';
import "./Eugene.css";

export default function Eugene() {
    useEffect(() => {
        document.title = "DeepTrade | 유진투자증권";
    }, [])

    return (
        <>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div className="col-2 logo">
                    <img 
                        src="assets/deeptrade_logo.png" 
                        alt = "logo" 
                        style={{margin: '0px 20px 0 20px', cursor: 'pointer'}} 
                        onClick={() => {
                            window.open('https://deeptrade.co/', '_self');
                        }}
                    />
                </div>
                <div className="col-10">
                <div className="menu" style={{justifyContent: 'right', display: 'flex'}}>
                    <div 
                        className="menu_item" 
                        style={{color: 'black'}} 
                        onClick={() => {
                        window.open('https://deeptrade.co/', '_self');
                        }}
                        >
                    Home
                    </div>
                </div>
                </div>
            </div>
            <div className={'eugene_container'}>
                <div className={'eugene_background'}>
                    <div style={{height: '35vw'}}>
                        <img src="../../assets/eugene/top_title.png" className="eugene_top_title_img" />
                        <div className="eugene_top_title_text" >
                            딥트레이드의 인공지능 기술을 통해 주식 종목을 추천하는 XPercent 서비스를 유진투자증권의 '종목쏙쏙' MTS/HTS 서비스에서 제공을 시작하였습니다. 딥트레이드의 추천 종목을 유진투자증권 계좌와 연결하여 바로 매매할 수 있습니다.
                        </div>
                    </div>
                </div>
            </div>
            <div className={'eugene_container'} style={{flexDirection: 'column'}} >
                <div className="eugene_service_intro">
                    서비스 소개
                </div>
                <div className="text_title">
                    What is XPercent?
                </div>
                <img src="../../assets/eugene/eugene_xpct_logo.png" className="eugene_intro_title" />
                <div className="eugene_center_text">
                    서울대학교 핀테크 스타트업 DeepTrade가 개발한 최고 성능의 주가 예측 모델입니다.
                </div>
                <div className="intro_inner_container">
                    <div className="eugene_hashtag">
                        #AI Invester
                    </div>
                    <div className="eugene_hashtag">
                        #주가 예측
                    </div>
                    <div className="eugene_hashtag">
                        #XPercent
                    </div>
                    <div className="eugene_hashtag">
                        #AI
                    </div>
                    <div className="eugene_hashtag">
                        #Deeptrade
                    </div>
                </div>
            </div>
            <div className={'eugene_container mobile_container'} style={{flexDirection: 'column', backgroundColor: '#f9f9f9'}} >
                <div className="text_title">
                    AI Investor?
                </div>
                <div className="eugene_center_text">
                    AI 기술을 활용한 주가 데이터 및 거시 경제 데이터를 기반으로 전체 종목의 상승확률을 예측합니다.
                </div>
                <div className="three_container">
                    <div className="three_container_ind">
                        <img src="../../assets/eugene/eugene_step01.png" className="eugene_steps" />
                        <div className="three_container_text">
                            실시간 주가 데이터 및
                            거시 경제 데이터 수집
                        </div>
                    </div>
                    <div className="three_container_ind">
                        <img src="../../assets/eugene/eugene_step02.png" className="eugene_steps" />
                        <div className="three_container_text">
                            XPercent의 주가 예측 엔진을 통해 개별 종목들의 기간별 상승 확률을 계산
                        </div>
                    </div>
                    <div className="three_container_ind">
                        <img src="../../assets/eugene/eugene_step03.png" className="eugene_steps" />
                        <div className="three_container_text">
                            상승확률이 가장 높게 계산된 종목을 선정하여 추천
                        </div>
                    </div>
                </div>
            </div>
            <div className="eugene_container" style={{backgroundColor: '#F9F9F9'}}>
                <div className="eugene_checkpoint_background" style={{display: 'flex'}}>
                    <div className="checkpoint_inner_container">
                        <div style={{marginTop: '2vw'}}>
                            <div className="checkpoint_text">
                                체크 포인트
                            </div>
                        </div>
                        <div className="checkpoint_right_container">
                            <div className="checkpoint_right_inner_container">
                                <div>
                                    <div className="eugene_checkpoint_sect1">
                                        <div className="checkpoint_title">
                                            #금융 빅데이터 수집
                                        </div>
                                        <div className="checkpoint_body">
                                            투자분석에 필요한 금융 데이터를 실시간으로 업데이트합니다.
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="eugene_checkpoint_sect2">
                                        <div className="checkpoint_title">
                                            #실시간 거래 안정성 극대화
                                        </div>
                                        <div className="checkpoint_body">
                                            거래량 및 시가총액 데이터에 기반하여 거래 가능성이 높은 종목을 제공하며, 위험도가 높은 관리종목을 제외하여 안정성을 강화했습니다.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{marginTop: '2vw'}}>
                                <div className="eugene_checkpoint_sect3">
                                    <div className="checkpoint_title">
                                        #최고수준 인공지능 기술을 활용한 종목 선정
                                    </div>
                                    <div className="checkpoint_body" style={{marginTop: '1vw'}}>
                                        DeepTrade가 보유한 최고 수준의 인공지능 기술에 의하여 선정된 상승확률이 가장 높은 종목을 제공합니다. <br />
                                        DeepTrade는 시장의 변화를 반영하기 위해 인공지능 모델을 꾸준히 업데이트합니다.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'eugene_container'} style={{flexDirection: 'column'}} >
                <div className="eugene_service_intro">
                    가입 방법
                </div>
                <div className="eugene_register_container">
                    <div>
                        <div className="register_title">
                            대상고객
                        </div>
                        <div className="register_normal_text">
                            쏙쏙(모바일)계좌, 은행제휴 계좌, 방문고객 (다계좌 신청가능)
                        </div>
                    </div>
                    <div style={{marginTop: '1.5vw'}}>
                        <div className="register_title">
                            신청방법
                        </div>
                        <div className="steps_container">
                            <div className="steps_inner_container">
                                <img src="../../assets/eugene/eugene_register_step1.png" className="steps_image" />
                                <div className="steps_text">
                                    HTS / MTS 실행
                                </div>
                            </div>
                            <div className="inverted_chevron">
                                {'>'}
                            </div>
                            <div className="steps_inner_container">
                                <img src="../../assets/eugene/eugene_register_step2.png" className="steps_image" />
                                <div className="steps_text">
                                    종목쏙쏙
                                </div>
                            </div>
                            <div className="inverted_chevron">
                                {'>'}
                            </div>
                            <div className="steps_inner_container">
                                <img src="../../assets/eugene/eugene_register_step3.png" className="steps_image" />
                                <div className="steps_text">
                                    XPercent
                                </div>
                            </div>
                            <div className="inverted_chevron">
                                {'>'}
                            </div>
                            <div className="steps_inner_container">
                                <img src="../../assets/eugene/eugene_register_step4.png" className="steps_image" />
                                <div className="steps_text">
                                    XPercent 신청 / 해지
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop: '1.5vw'}}>
                        <div className="register_title">
                            화면이용안내
                        </div>
                        <img src="../../assets/eugene/eugene_register_info.png" className="register_info_img" />
                    </div>
                    <div style={{marginTop: '1.5vw', marginBottom: '3vw'}}>
                        <div className="register_title">
                            서비스 신청안내
                        </div>
                        <div className="register_list_title">
                            신청요건
                        </div>
                        <div className="register_dot_top_container">
                            <img src="../../assets/eugene/eugene_register_dot.png" className="dot" />
                            <div style={{marginLeft: '0.6vw'}}>
                                제휴은행/비대면/방문 개설계좌 보유고객만 가능합니다.
                            </div>
                        </div>
                        <div className="register_dot_bottom_container">
                            <img src="../../assets/eugene/eugene_register_dot.png" className="dot" />
                            <div style={{marginLeft: '0.6vw'}}>
                                매월 말일 기준 서비스 유지조건 미달인 경우, 익일 자동으로 서비스 해지처리 됩니다.
                            </div>
                        </div>
                        <div className="register_dot_bottom_container">
                            <div style={{width: '0.4vw'}}></div>
                            <div style={{marginLeft: '0.6vw'}}>
                                (서비스 신청계좌 예탁자산 100만원 미만이며, 최근 3개월 무거래인 경우)
                            </div>
                        </div>

                        <div className="register_list_title">
                            수수료율
                        </div>
                        <div className="register_dot_top_container">
                            <img src="../../assets/eugene/eugene_register_dot.png" className="dot" />
                            <div style={{marginLeft: '0.6vw'}}>
                                가입 신청 익일부터 국내 온라인 주식거래 수수료율이 0.1%적용됩니다.
                            </div>
                        </div>
                        <div className="register_dot_bottom_container">
                            <div style={{width: '0.4vw'}}></div>
                            <div style={{marginLeft: '0.6vw'}}>
                                (종목 쏙쏙서비스 1개 신청시 0.1%, 2개 신청시 0.2%의 거래 수수료율 적용)
                            </div>
                        </div>
                        <div className="register_dot_bottom_container">
                            <img src="../../assets/eugene/eugene_register_dot.png" className="dot" />
                            <div style={{marginLeft: '0.6vw'}}>
                                종목쏙쏙 서비스 신청 갯수에 따라 국내 온라인 주식거래 수수료율이 차등적용됩니다.
                            </div>
                        </div>
                        <div className="register_dot_bottom_container">
                            <div style={{width: '0.4vw'}}></div>
                            <div style={{marginLeft: '0.6vw'}}>
                                (서비스 신청계좌 예탁자산 100만원 미만이며, 최근 3개월 무거래)인 경우
                            </div>
                        </div>
                        <div className="register_dot_bottom_container">
                            <img src="../../assets/eugene/eugene_register_dot.png" className="dot" />
                            <div style={{marginLeft: '0.6vw'}}>
                                XPercent 서비스 해지 시 익일부터 서비스 신청 이전 수수료율과 동일하게 적용됩니다.
                            </div>
                        </div>

                        <div className="register_list_title">
                            무료이벤트 체험 제공
                        </div>
                        <div className="register_dot_bottom_container">
                            <img src="../../assets/eugene/eugene_register_dot.png" className="dot" />
                            <div style={{marginLeft: '0.6vw'}}>
                                고객 ID 기준, 최초 서비스 신청고객의 경우 신청일로부터 3주간 무료체험기간 제공합니다.
                            </div>
                        </div>
                        <div className="register_dot_bottom_container">
                            <img src="../../assets/eugene/eugene_register_dot.png" className="dot" />
                            <div style={{marginLeft: '0.6vw'}}>
                                무료 체험기간 중 서비스 해지 후 재신청시 거래수수료율 0.1% 적용됩니다.
                            </div>
                        </div>
                        <div className="register_dot_bottom_container">
                            <div style={{width: '0.4vw'}}></div>
                            <div style={{marginLeft: '0.6vw'}}>
                                (체험기간 종료 또는 거래수수료율이 올라가면 무료체험 종료일자 항목에 해당사항이 없음으로 표기됨)
                            </div>
                        </div>
                        <div className="register_dot_bottom_container">
                            <img src="../../assets/eugene/eugene_register_dot.png" className="dot" />
                            <div style={{marginLeft: '0.6vw'}}>
                            3주 무료체험 기간 종료시 국내 수수료율 0.1%는 자동 변경되므로 이용을 원하지 않으면 반드시 해지 처리하세요.
                            </div>
                        </div>

                        <div className="register_list_title">
                            알림(Push)
                        </div>
                        <div className="register_dot_bottom_container">
                            <img src="../../assets/eugene/eugene_register_dot.png" className="dot" />
                            <div style={{marginLeft: '0.6vw'}}>
                                MTS 푸시알림 신청 후 MTS를 삭제하면 푸시메세지 수신이 불가하며, SMS 문자발송 신청 후 휴대전화번호가 변경될 경우, SMS 문자발송 연락처를 수정해주세요.
                            </div>
                        </div>
                        <div className="register_dot_bottom_container">
                            <div style={{width: '0.4vw'}}></div>
                            <div style={{marginLeft: '0.6vw'}}>
                                (푸시 알림은 스마트폰 OS제공사의 시스템 사정 및 개별통신상태에 따라 수신 지연/누락이 발생이 생길 수도 있음)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'eugene_container'} style={{backgroundColor: "#f9f9f9", flexDirection: 'column'}} >
                <div className="eugene_service_intro">
                    서비스 사용방법
                </div>
                <div className="instructions_container">
                    <div className="instructions_margin">
                        <div className="instructions_inner_container">
                            <div className="instructions_title">
                                01. 홈화면
                            </div>
                            <div className="instructions_border">
                            </div>
                        </div>
                        <div className="instructions_body">
                            1일 모델/1주 모델의 성과를 확인할 수 있습니다.
                        </div>
                    </div>
                    <div className="instructions_margin">
                        <div className="instructions_inner_container">
                            <div className="instructions_title">
                                02. 시그널 화면
                            </div>
                            <div className="instructions_border">
                            </div>
                        </div>
                        <div className="instructions_body">
                            1일 모델/1주 모델의 실시간 추천 현황을 확인할 수 있습니다. 매일 오전 8시 30분에 공개되는 XPercent의 1일/1주 기준 추천 종목을 확인하세요.
                        </div>
                    </div>
                    <div className="instructions_margin">
                        <div className="instructions_inner_container">
                            <div className="instructions_title">
                                03. 추천내역 화면
                            </div>
                            <div className="instructions_border">
                            </div>
                        </div>
                        <div className="instructions_body">
                            1일 모델/1주 모델의 과거 추천내역을 확인할 수 있습니다. 과거 추천 성과를 확인하고 XPercent의 성능을 검증하세요.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}