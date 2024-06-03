import axiosClient from "./axiosClient";

const getToken = () => localStorage.getItem("access_token");

export const categoryApi = {
  getCategory: function () {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/category-product";
    const config = { headers };
    return axiosClient.get(url, config);
  },

  createCategory: function (body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/category-product";
    const config = { headers };
    return axiosClient.post(url, body, config);
  },

  getCategoryById: function (categoryId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/category-product/${categoryId}`;
    const config = { headers };
    return axiosClient.get(url, config);
  },
  updateCategory: function (categoryId, body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/category-product/${categoryId}`;
    const config = { headers };
    return axiosClient.put(url, body, config);
  },
  removeCategory: function (categoryId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/category-product/${categoryId}`;
    const config = { headers };
    return axiosClient.delete(url, config);
  },
};
