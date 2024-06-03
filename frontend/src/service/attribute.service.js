import axiosClient from "./axiosClient";

const getToken = () => localStorage.getItem("access_token");

export const attributeApi = {
  getAttribute: function () {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/attribute-type";
    const config = { headers };
    return axiosClient.get(url, config);
  },

  createAttribute: function (body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/attribute-type";
    const config = { headers };
    return axiosClient.post(url, body, config);
  },

  getAttributeById: function (attributeId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/attribute-type/${attributeId}`;
    const config = { headers };
    return axiosClient.get(url, config);
  },
  updateAttribute: function (attributeId, body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/attribute-type/${attributeId}`;
    const config = { headers };
    return axiosClient.put(url, body, config);
  },
  removeAttribute: function (attributeId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/attribute-type/${attributeId}`;
    const config = { headers };
    return axiosClient.delete(url, config);
  },
  getDetailAttribute: function () {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/attribute";
    const config = { headers };
    return axiosClient.get(url, config);
  },
};
