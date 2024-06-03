import axiosClient from "./axiosClient";

const getToken = () => localStorage.getItem("access_token");

export const userOrderApi = {
  createOrder: function (body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/user/order";
    const config = { headers };
    return axiosClient.post(url,body, config);
  },  
  getOrder: function (userId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/user/order/search/${userId}`;
    const config = { headers };
    return axiosClient.get(url, config);
  },
  cancelOrder: function (orderId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/user/order/${orderId}`;
    return axiosClient.put(url, {}, { headers });
  },
  reViewlOrder: function (orderItemId, body) {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    };
    const config = { headers };
    const url = `/user/review/${orderItemId}`;
    return axiosClient.post(url, body, config);
  }
  
  
};
