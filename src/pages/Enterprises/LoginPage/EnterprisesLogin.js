import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EnterprisesLogin.css";
import { loginAPI } from "../../../api";
import { loginInfo } from "../../../redux/slices/loginSlice";
import { useTitle } from "../../../routing/DocumentNameChanger";
import { Oval } from "react-loader-spinner";
function EnterprisesLogin() {
  useTitle("딥트레이드 엔터프라이즈");
  const [loader, setLoader] = useState(false);
  const [formInput, setFormInput] = useState({
    company_usrnm: "",
    company_pass: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitLogin = async (event) => {
    event.preventDefault();

    if (formInput.company_usrnm === "") {
      toast("아이디를 입력해주세요.");
      return;
    } else if (formInput.company_pass === "") {
      toast("비밀번호를 입력해주세요.");
      return;
    }
    setLoader(true);
    const res = await loginAPI.dtLogin(formInput);
    if (res.status === 200) {
      if (res.data) {
        dispatch(loginInfo(res.data));
        toast("로그인 되었습니다.");
        setFormInput({ company_usrnm: "", company_pass: "" });
        navigate("/enterprise/service");
      }
    } else {
      if (res.data.msg) {
        toast(res.data.msg);
        console.log("loader", loader);
        setLoader(false);
      }
    }
    setLoader(false);
  };

  return (
    <div className="loginContainer">
      <div className="logoSection">
        {/* Your logo */}
        <div className="enterprises_logo_wrapper">
          <img src={"/assets/enterprise_logo.png"} alt="logo" />
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
                setFormInput((prevFormInput) => ({
                  ...prevFormInput,
                  company_usrnm: e.target.value,
                }));
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
                setFormInput((prevFormInput) => ({
                  ...prevFormInput,
                  company_pass: e.target.value,
                }));
              }}
            />
          </div>
        </form>
        <button
          className="enterprise_login_btn"
          type="submit"
          onClick={(e) => submitLogin(e)}
        >
          {loader == true ? (
            <Oval
              height={50}
              width={50}
              color="#fff"
              wrapperStyle={{ alignItems: "center", justifyContent: "center" }}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#fff"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : (
            "로그인"
          )}
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
