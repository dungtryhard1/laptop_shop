import axiosClient from "./axiosClient";

const getToken = () => localStorage.getItem("access_token");

export const warrantyApi = {
  getWarranty: function () {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/warranty-product";
    const config = { headers };
    return axiosClient.get(url, config);
  },

  createWarranty: function (body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/warranty-product";
    const config = { headers };
    return axiosClient.post(url, body, config);
  },

  getWarrantyById: function (warrantyId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/warranty-product/${warrantyId}`;
    const config = { headers };
    return axiosClient.get(url, config);
  },
  updateWarranty: function (warrantyId, body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/warranty-product/${warrantyId}`;
    const config = { headers };
    return axiosClient.put(url, body, config);
  },
  removeWarranty: function (warrantyId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/warranty-product/${warrantyId}`;
    const config = { headers };
    return axiosClient.delete(url, config);
  },
};
