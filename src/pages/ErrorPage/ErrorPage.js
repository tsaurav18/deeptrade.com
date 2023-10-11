import s from "./ErrorPage.module.css";
import { Link } from "react-router-dom";
import { WEB_APP_ROUTES } from "../../constants/routes";
import LoadingIcon from "../../components/Icons/LoadingIcon/LoadingIcon";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import LoadingIcon from "../components/LoadingIcon";

const ErrorPage = () => {
  const user = useSelector((state) => state.loginReducer);
  const history = useHistory();
  message.info("데이터를 로딩 중 입니다.");
  const dispatch = useDispatch();
  function refresh() {
    // dispatch(logout())
    if (user.is_staff) {
      history.push("/");
      window.location.reload(true);
    } else {
      history.push("/error");
      window.location.reload(true);
    }
  }

  return (
    <div className={`${s.layout}`}>
      <div className={"container"}>
        <div
          className={"row justify-content-center"}
          style={{ paddingTop: "35vh", paddingBottom: "15vh" }}
        >
          {/* <img className={`${s.image} mt-5`} src="/static/icons/error.png" alt="error page image"/> */}
          <LoadingIcon />
        </div>
        <div className={"row justify-content-center"}>
          다음 페이지가 바로 로딩되지 않을 경우:
        </div>
        <div className={"row justify-content-center"}>
          {user.is_staff ? (
            <Link
              className={`${s.link} col-8 col-md-4 col-lg-2 mt-3`}
              to={"enterprise"}
              onClick={refresh}
            >
              <div className={`${s.button} btn col-12`}>홈으로 이동</div>
            </Link>
          ) : (
            <Link
              className={`${s.link} col-8 col-md-4 col-lg-2 mt-3`}
              to={"/"}
              onClick={refresh}
            >
              <div className={`${s.button} btn col-12`}>홈으로 이동</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default ErrorPage;
