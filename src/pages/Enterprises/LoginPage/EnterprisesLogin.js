import React from "react";
import "./EnterprisesLogin.css";
function EnterprisesLogin() {
  return (
    <div className="loginContainer">
      <div className="logoSection">
        {/* Your logo */}
        <div className="enterprises_logo_wrapper">
          <div>딥트레이드 로고</div>
          <span>&</span>
          <div>소개 및 안내 문구</div>
        </div>
        {/* <img src="logo.png" alt="Logo" /> */}
      </div>
      <div className="formSection">
        <form>
          <div className="inputGroup">
            {/* <label htmlFor="id">ID:</label> */}
            <input type="text" id="id" placeholder="아이디 입력해주세요" />
          </div>
          <div className="inputGroup">
            {/* <label htmlFor="pass">Pass:</label> */}
            <input
              type="password"
              id="pass"
              placeholder="비밀번호 입력해주세요"
            />
          </div>
        </form>
        <button className="enterprise_login_btn" type="submit">
          로그인
        </button>
      </div>
      <div className="infoSection">
        <h3>서비스 안내 가이드</h3>
        {/* Your service information */}
      </div>
    </div>
  );
}

export default EnterprisesLogin;
