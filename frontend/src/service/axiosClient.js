import axios from "axios";
import queryString from "query-string";
import { store } from "../redux/store";

const axiosClient = axios.create({
  baseURL: "http://localhost:4200/",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  },

  paramsSerializer: function (params) {
    return queryString.stringify(params);
  },
});

console.log("Base URL:", axiosClient.defaults.baseURL);

axiosClient.interceptors.request.use(function (config) {
  return config;
});

// axiosClient.interceptors.request.use((config) => {
//   // const token = store.getState()?.auth?.user?.token;

//   // // if (token) {
//   // //   config.headers.Authorization = `${token}`;
//   // // }
//   return config;
// });

axiosClient.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },

  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
