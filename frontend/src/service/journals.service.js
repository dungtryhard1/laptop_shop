import axiosClient from "./axiosClient";

const getToken = () => localStorage.getItem("access_token");

export const journalApi = {
  getJournal: function (params) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/blog";
    const config = { headers };
    return axiosClient.get(url, { ...config, params });
  },

  createJournal: function (body) {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const url = "/admin/blog";
    const config = { headers };
    return axiosClient.post(url, body, config);
  },

  getJournalById: function (journalId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/blog/${journalId}`;
    const config = { headers };
    return axiosClient.get(url, config);
  },
  updateJournal: function (journalId, body) {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const url = `/admin/blog/${journalId}`;
    const config = { headers };
    return axiosClient.put(url, body, config);
  },
  deleteJournal: function (journalId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/blog/${journalId}`;
    const config = { headers };
    return axiosClient.delete(url, config);
  },
};
