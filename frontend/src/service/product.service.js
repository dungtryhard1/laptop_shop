import axiosClient from "./axiosClient";

const getToken = () => localStorage.getItem("access_token");

export const productApi = {
  createProduct: function (body) {
    const token = getToken();
    // const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const url = "/admin/product/";
    const config = { headers };
    return axiosClient.post(url, body, config);
  },
  getProduct: function (params) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/product/";
    const config = { headers };
    return axiosClient.get(url, { ...config, params });
  },
  getProductById: function (id) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/product/${id}`;
    const config = { headers };
    return axiosClient.get(url, config);
  },
  deleteProduct: function (id) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/product/${id}`;
    const config = { headers };
    return axiosClient.delete(url, config);
  },
  updateProduct: function (body, id) {
    const token = getToken();
    // const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const url = `/admin/product/${id}`;
    const config = { headers };
    return axiosClient.put(url, body, config);
  },
};
