import axios from "axios";
console.log(axios.isCancel("something"));

const productionUrl = "https://xpct.net/api/";

export const instance = axios.create({
  baseURL: productionUrl,

  headers: {},
  validateStatus: function (status) {
    return (
      (status >= 200 && status < 300) || 401
    ); /** Will except responses without error*/
  },
});

instance.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    // console.log(error);
    return Promise.reject(error);
  }
);

export const loginAPI = {
  async dtLogin(formdata) {
    let body = JSON.stringify({
      username: formdata.company_usrnm,
      password: formdata.company_pass,
    });
    let csrf = await instance.get("mobile/get_csrf/");

    return instance
      .post(`dtenter/dt_login/`, body, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf.data["token"],
        },
      })
      .then((res) => {
        return res;
      });
  },
};
