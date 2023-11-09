import axios from "axios";
console.log(axios.isCancel("something"));

const productionUrl = "https://xpct.net/api/";
const localUrl = "http://13.125.37.183:8888/api/";
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

export const getDtData = {
  async fetchDtData(company_name, modelType, currentSelectedDate) {
    let body = JSON.stringify({
      company_name: company_name,
      model: modelType,
      date: currentSelectedDate,
    });
    let csrf = await instance.get("mobile/get_csrf/");

    return instance
      .post(`dtenter/dt_service/`, body, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf.data["token"],
        },
      })
      .then((res) => {
        return res;
      });
  },
  async getRiskManagementIndicesData() {
    let csrf = await instance.get("mobile/get_csrf/");

    return instance
      .post(`dtenter/risk_management_indices/`, {
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
