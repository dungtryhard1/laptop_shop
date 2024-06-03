import axiosClient from "./axiosClient";

const getToken = () => localStorage.getItem("access_token");

export const categoryJournalApi = {
  getCategoryJournal: function () {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/category-blog";
    const config = { headers };
    return axiosClient.get(url, config);
  },

  createCategoryJournal: function (body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/category-blog";
    const config = { headers };
    return axiosClient.post(url, body, config);
  },

  getCategoryJournalById: function (categoryId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/category-blog/${categoryId}`;
    const config = { headers };
    return axiosClient.get(url, config);
  },
  updateCategoryJournal: function (categoryId, body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/category-blog/${categoryId}`;
    const config = { headers };
    return axiosClient.put(url, body, config);
  },
  deleteCategoryJournal: function (categoryId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/category-blog/${categoryId}`;
    const config = { headers };
    return axiosClient.delete(url, config);
  },
};
