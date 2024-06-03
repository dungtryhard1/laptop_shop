import axiosClient from "./axiosClient";

const getToken = () => localStorage.getItem("access_token");

export const userAddressApi = {
  createAddress: function (body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/user/address/";
    const config = { headers };
    return axiosClient.post(url,body, config);
  },
  getAddressById : function (id) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/user/address/${id}`;
    const config = { headers };
    return axiosClient.get(url, config);
  }
};
