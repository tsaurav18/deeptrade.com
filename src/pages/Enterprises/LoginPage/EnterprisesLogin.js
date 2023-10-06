import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EnterprisesLogin.css";
import { loginAPI } from "../../../api";
import { loginInfo } from "../../../redux/slices/loginSlice";
function EnterprisesLogin() {
  const [formInput, setFormInput] = useState({
    company_usrnm: "",
    company_pass: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const submitLogin = async (event) => {
    event.preventDefault();
    console.log("formInput", formInput);
    const res = await loginAPI.dtLogin(formInput);
    if (res.status === 200) {
      if (res.data) {
        dispatch(loginInfo(res.data));
        toast("로그인되었습니다.");
        setFormInput({ company_usrnm: "", company_pass: "" });
        navigate("/enterprise/service");
      }
    } else {
      console.log(res);
      if (res.data.msg) {
        toast(res.data.msg);
      }
    }
  };
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
            <input
              type="text"
              placeholder="아이디 입력해주세요"
              onChange={(text) =>
                setFormInput({ ...formInput, company_usrnm: text.target.value })
              }
            />
          </div>
          <div className="inputGroup">
            {/* <label htmlFor="pass">Pass:</label> */}
            <input
              type="password"
              id="pass"
              placeholder="비밀번호 입력해주세요"
              onChange={(text) =>
                setFormInput({ ...formInput, company_pass: text.target.value })
              }
            />
          </div>
        </form>
        <button
          className="enterprise_login_btn"
          type="submit"
          onClick={(e) => submitLogin(e)}
        >
          로그인
        </button>
      </div>
      <div className="infoSection">
        <h3>서비스 안내 가이드</h3>
        {/* Your service information */}
      </div>
      <ToastContainer />
    </div>
  );
}

export default EnterprisesLogin;
