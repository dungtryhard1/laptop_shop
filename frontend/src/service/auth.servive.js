import axiosClient from "./axiosClient";

export const authApi = {
  login: function (body) {
    const url = "/auth/login";
    return axiosClient.post(url, body);
  },
  register: function (body) {
    const url = "/auth/register";
    return axiosClient.post(url, body);
  },
  sendOtp: function (body) {
    const url = "/auth/gen-otp";
    return axiosClient.post(url, body);
  },
  verifyOtp: function (body) {
    const url = "/auth/verify-otp";
    return axiosClient.post(url, body);
  },
  forgot: function (body) {
    const url = "/auth/forgot-password";
    return axiosClient.post(url, body);
  },
  changePassword: function (body) {
    const url = "/auth/change-password";
    return axiosClient.post(url, body);
  },
};
