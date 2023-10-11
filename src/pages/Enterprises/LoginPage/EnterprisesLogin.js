import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EnterprisesLogin.css";
import { loginAPI } from "../../../api";
import { loginInfo } from "../../../redux/slices/loginSlice";

function EnterprisesLogin() {
  const user_info_reducer = useSelector((state) => state.loginReducer);
  const [formInput, setFormInput] = useState({
    company_usrnm: "",
    company_pass: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     if (formInput.company_pass !== "" && formInput.company_usrnm !== "") {
  //       submitLogin(event);
  //     }
  //   }
  // };

  const submitLogin = async (event) => {
    event.preventDefault();
    const res = await loginAPI.dtLogin(formInput);
    if (res.status === 200) {
      if (res.data) {
        dispatch(loginInfo(res.data));
        toast("로그인되었습니다.");
        setFormInput({ company_usrnm: "", company_pass: "" });
        navigate("/enterprise/service");
      }
    } else {
      if (res.data.msg) {
        toast(res.data.msg);
      }
    }
  };
  // useEffect(() => {
  //   // Add event listeners when the component mounts
  //   document.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     // Clean up the event listener when the component unmounts
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);
  return (
    <div className="loginContainer">
      <div className="logoSection">
        {/* Your logo */}
        <div className="enterprises_logo_wrapper">
          <img src={"/assets/deeptrade_logo.png"} alt="logo" />
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
              onChange={(e) => {
                setFormInput({
                  ...formInput,
                  company_usrnm: e.target.value,
                });
              }}
            />
          </div>
          <div className="inputGroup">
            {/* <label htmlFor="pass">Pass:</label> */}
            <input
              type="password"
              id="pass"
              placeholder="비밀번호 입력해주세요"
              onChange={(e) => {
                setFormInput({ ...formInput, company_pass: e.target.value });
              }}
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
      {/* <div className="infoSection">
        <h3>서비스 안내 가이드</h3>
     
      </div> */}
      <ToastContainer />
    </div>
  );
}

export default EnterprisesLogin;
