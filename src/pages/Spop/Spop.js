import { render } from "@testing-library/react";
import React, { useRef, useEffect, useState } from "react";
import "./Spop.css";
import register_info_doc from "../../documents/register_info_doc.pdf";
import service_info_doc from "../../documents/service_info_doc.pdf";

export default function Spop() {
  useEffect(() => {
    document.title = "DeepTrade Technologies | 삼성증권";
  }, []);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="col-2 logo">
          <img
            src="assets/deeptrade_logo.png"
            alt="logo"
            style={{ margin: "0px 20px 0 20px" }}
            onClick={() => {
              window.open("https://deeptrade.co/", "_self");
            }}
          />
        </div>
        <div className="col-10">
          <div
            className="menu"
            style={{ justifyContent: "right", display: "flex" }}
          >
            <div
              className="menu_item"
              style={{ color: "black" }}
              onClick={() => {
                window.open("https://deeptrade.co/", "_self");
              }}
            >
              Home
            </div>
          </div>
        </div>
      </div>
      <div className={"spop_container"}>
        <div className={"spop_background"}>
          <div style={{ height: "35vw" }}>
            <img
              src="../../assets/spop/top_title.png"
              className="spop_top_title_img"
            />
            <div className="spop_top_title_text">
              딥트레이드테크놀로지스의 주식 예측 AI 엔진의 정기적인 포트폴리오
              구성 서비스를 삼성증권 mPop 서비스에서 제공을 시작하였습니다.
              간편하게 딥트레이드테크놀로지스의 AI 엔진을 이용한 자산 관리가
              가능합니다.
            </div>
          </div>
        </div>
      </div>
      <div
        className={"spop_container"}
        style={{ flexDirection: "column", backgroundColor: "#394350" }}
      >
        <div className="service_intro">서비스 소개</div>
        <div className="text_title" style={{ color: "white" }}>
          딥트레이드테크놀로지스 AI 포트폴리오
        </div>
        <div
          className="spop_center_text spop_service_body"
          style={{ color: "white" }}
        >
          딥트레이드테크놀로지스는 삼성증권 플랫폼을 통해 정기적으로 AI
          포트폴리오를 제공해주는 투자 자문 서비스를 제공하고 있습니다. 매달
          전송해드리는 포트폴리오를 수락만 하면 자동으로 리밸런싱 해주는 최적의
          편의성을 갖춘 상품입니다.
        </div>
      </div>
      <div
        className={"spop_container portfolio_outer_container"}
        style={{ flexDirection: "column", backgroundColor: "white" }}
      >
        <div className={"portfolio_container"}>
          <div className="text_title" style={{ color: "#394350" }}>
            AI Portfolio
          </div>
          <div className="spop_portfolio_center_text">
            서울대학교 주가 예측 스타트업 DeepTrade Technologies가 최신 개발한
            주가 예측 모델입니다.
          </div>
          <div className="spop_portfolio_inner_container">
            <div className="spop_portfolio_left_container">
              <img
                src="../../assets/spop/portfolio1.png"
                className="portfolio_img"
              />
            </div>
            <div className="spop_portfolio_right_container">
              <div className="port_top">
                <div className="port_top_title">딥트레이드 알파</div>
                <div className="port_top_body">
                  딥트레이드테크놀로지스 AI 엔진이 구성한 주식 포트폴리오와
                  수익률 상위권 주식형 및 채권형 펀드 및 MMF에 투자하는 액티브
                  로보어드바이저
                </div>
              </div>
              <div className="port_bottom">
                <div className="port_bottom_title">가입 대상</div>
                <div className="port_bottom_body">
                  딥트레이드테크놀로지스의 주가 예측 AI가 포트폴리오 개별 종목을
                  선정하는 포트폴리오를 통해 지수보다 월등히 높은 투자 성과를
                  기대하는 투자자
                </div>
              </div>
            </div>
          </div>
          <div className="spop_portfolio_inner_container">
            <div className="spop_portfolio_left_container">
              <img
                src="../../assets/spop/portfolio2.png"
                className="portfolio_img"
              />
            </div>
            <div className="spop_portfolio_right_container">
              <div className="port_top">
                <div className="port_top_title">딥트레이드 루비 (IRP/DC)</div>
                <div className="port_top_body">
                  딥트레이드테크놀로지스 AI 엔진이 추천하는 국내 및 해외 주식형
                  펀드와 안정성 높은 채권형 펀드 및 MMF에 투자하는 안정적인
                  퇴직연금 관리 서비스
                </div>
              </div>
              <div className="port_bottom">
                <div className="port_bottom_title">가입 대상</div>
                <div className="port_bottom_body">
                  지속적으로 적립되는 퇴직연금 계좌에서 지수보다 높고 안정적인
                  투자 성과를 기대하는 투자자
                </div>
              </div>
            </div>
          </div>
          <div className="spop_portfolio_inner_container">
            <div className="spop_portfolio_left_container">
              <img
                src="../../assets/spop/portfolio3.png"
                className="portfolio_img"
              />
            </div>
            <div className="spop_portfolio_right_container">
              <div className="port_top">
                <div className="port_top_title">딥트레이드 루비 (연금저축)</div>
                <div className="port_top_body">
                  딥트레이드테크놀로지스 AI 엔진이 추천하는 국내 및 해외 주식형
                  펀드와 안정성 높은 채권형 펀드 및 MMF에 투자하는 안정적인
                  연금저축 관리 서비스
                </div>
              </div>
              <div className="port_bottom">
                <div className="port_bottom_title">가입 대상</div>
                <div className="port_bottom_body">
                  연간 최대 400만원 한도의 세액 공제 혜택과 더불어 지수보다 높고
                  안정적인 투자 성과를 기대하는 투자자
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="spop_container" style={{ backgroundColor: "#F9F9F9" }}>
        <div
          className="spop_checkpoint_background"
          style={{ padding: "5vw 0" }}
        >
          <div className="spop_checkpoint_text">체크 포인트</div>
          <div className="spop_checkpoint_inner_container">
            <div className="spop_checkpoint_hashtag">
              #세계 최고 인공지능 학회인 KDD에서 최고 수준의 주가 예측 인공지능
              기술을 인정받았습니다.
            </div>
            <div className="spop_checkpoint_hashtag">
              #실시간 금융 데이터를 반영해 항상 최적의 포트폴리오를 구성합니다.
            </div>
            <div className="spop_checkpoint_hashtag">
              #최적화된 AI 모델을 통해 안정성과 수익을 동시에 추구합니다.
            </div>
            <div className="spop_checkpoint_hashtag">
              #고객의 선호도에 따라 수익/위험 레벨을 선택할 수 있습니다.
            </div>
            <div className="spop_checkpoint_hashtag">
              #업계 최저 수준의 수수료로 고객 부담을 최소화합니다.
            </div>
          </div>
        </div>
      </div>
      <div
        className="spop_container spop_register_mobile"
        style={{ backgroundColor: "#06293a" }}
      >
        <div
          className="spop_register_button"
          onClick={() => {
            window.open(service_info_doc, "_blank");
          }}
        >
          <div>상품 설명서 바로가기</div>
          <div>
            <img src="../../assets/download.png" className="download_icon" />
          </div>
        </div>
        <div
          className="spop_register_button"
          onClick={() => {
            window.open(register_info_doc, "_blank");
          }}
        >
          <div>가입 설명서 바로가기</div>
          <div>
            <img src="../../assets/download.png" className="download_icon" />
          </div>
        </div>
      </div>
    </>
  );
}
