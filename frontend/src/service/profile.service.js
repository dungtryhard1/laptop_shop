import axiosClient from "./axiosClient";

const getToken = () => localStorage.getItem("access_token");

export const profileApi = {
  getUserById: function (userId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/user/profile/${userId}`;
    const config = { headers };
    return axiosClient.get(url, config);
  },
  updateUser: function (userId, body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/user/profile/${userId}`;
    const config = { headers };
    return axiosClient.put(url, body, config);
  },
};
