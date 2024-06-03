import axiosClient from "./axiosClient";

const getToken = () => localStorage.getItem("access_token");

export const orderStatusApi = {
  getOrderStatus: function () {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/order";
    const config = { headers };
    return axiosClient.get(url, config);
  },

  getOrderStatusById: function (orderId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/order/${orderId}`;
    const config = { headers };
    return axiosClient.get(url, config);
  },
  updateOrderStatus: function (orderId, body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/order/${orderId}`;
    const config = { headers };
    return axiosClient.put(url, body, config);
  },
};
