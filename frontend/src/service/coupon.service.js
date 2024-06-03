import axiosClient from "./axiosClient";

const getToken = () => localStorage.getItem("access_token");

export const couponApi = {
  getCoupon: function () {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/coupon";
    const config = { headers };
    return axiosClient.get(url, config);
  },
  getCouponByCode: function (code) {
    // const token = getToken();
    const url = `/public/coupon/search/${code}`;
    return axiosClient.get(url);
  },
  createCoupon: function (body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/coupon";
    const config = { headers };
    return axiosClient.post(url, body, config);
  },

  getCouponById: function (couponId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/coupon/${couponId}`;
    const config = { headers };
    return axiosClient.get(url, config);
  },
  updateCoupon: function (couponId, body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/coupon/${couponId}`;
    const config = { headers };
    return axiosClient.put(url, body, config);
  },
  removeCoupon: function (couponId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/coupon/${couponId}`;
    const config = { headers };
    return axiosClient.delete(url, config);
  },
};
