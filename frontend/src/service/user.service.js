import axiosClient from "./axiosClient";

const getToken = () => localStorage.getItem("access_token");

export const userApi = {
  getUser: function (params) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/user";
    const config = { headers };
    return axiosClient.get(url, { ...config, params });
  },
  updateUser: function (userId, body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/user/${userId}`;
    const config = { headers };
    return axiosClient.put(url, body, config);
  },
  // getUserById: function (userId) {
  //   const token = getToken();
  //   const headers = token ? { Authorization: `Bearer ${token}` } : {};
  //   const url = `/admin/user/${userId}`;
  //   const config = { headers };
  //   return axiosClient.get(url, config);
  // },
};
