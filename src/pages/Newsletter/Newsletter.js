import React, { useRef, useState } from "react";
import "./Newsletter.css";

import { ArrowUpOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Newsletter(props) {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const notify = (msg) => toast(msg, { style: { fontSize: 15 } });
  const unsubscribe = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    };
    fetch("https://xpct.net/api/unsubscribe_email", requestOptions)
      .then((response) => response.json())
      .then((data) => setSuccess(true));
  };
  const subscribeNewsletter = (event) => {
    //  prevent page refresh
    event.preventDefault();
    if (email != "") {
      console.log("form submitted ✅");
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      };
      fetch("https://xpct.net/api/auth/register_newsletter/", requestOptions)
        .then((response) => response.json())
        .then((response) => {
          console.log(">>>", response.code, response.msg);
          if (response.code === 201) {
            console.log("into success>>>", response.code, response.msg);
            notify(response.msg);
          } else if (response.code === 401) {
            console.log("into else>>>", response.code, response.msg);
            notify(response.msg);
          } else {
            notify(response.msg);
          }
          setSuccess(true);
          setEmail("");
        });
    } else {
      alert("이메일을 입력해주세요");
    }
  };

  return (
    <div className="newsletter_container">
      <div className="row justify-content-md-center justify-content-sm-center gy-0 gx-0 py-4">
        <div className="newsletter_title">
          <div>위험관리 AI 뉴스레터 </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-md-center gx-0 newsletter_content_container">
          <div class="col col-lg-9 gx-5 left_newletter_container">
            <div className="left_newsletterContainer_title">
              AI 위험관리 뉴스레터 서비스는 딥트레이드의 자산관리 서비스를
              사용하는 고객을 위한 시장 예측 정보 및 AI 분석 정보 전달을 위한
              서비스입니다. 딥트레이드가 자체 개발한 AI 모델을 통해 한달 간 증시
              방향성 예측과 상위 2개 경제 지표, 주식형 자산과 안정형 자산의
              포트폴리오 투자 비율을 제안합니다.
            </div>
          </div>
          <div className="col col-lg-3 gx-5 newsletter_form">
            <form onSubmit={subscribeNewsletter}>
              <div class="mb-3">
                <input
                  placeholder="이메일 주소를 입력해주세요"
                  value={email}
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  style={{ width: 250 }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <button
                type="submit"
                class="btn"
                style={{ backgroundColor: "#990000", color: "#fff" }}
              >
                구독하기
              </button>
            </form>
          </div>
        </div>
        {/* {!success ? (
          <div
            style={{
              backgroundColor: "#900",
              borderRadius: 5,
              color: "#fff",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: "700",
              marginTop: 10,
              padding: "10px 0",
              textAlign: "center",
              width: 200,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onClick={() => {
              unsubscribe();
            }}
          >
            Unsubscribe
          </div>
        ) : (
          <div
            style={{
              fontSize: 20,
              textAlign: "center",
              marginTop: 50,
            }}
          >
            You have been unsubscribed from our newsletter service!
          </div>
        )} */}
      </div>
      <div
        className="up_arrow"
        onClick={() => {
          console.log("clicked");
          props.mainRef.current.scrollIntoView();
        }}
      >
        <ArrowUpOutlined
          style={{ color: "white", fontSize: 20, cursor: "pointer" }}
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Newsletter;
