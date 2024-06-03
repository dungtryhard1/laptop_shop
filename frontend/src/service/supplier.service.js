import axiosClient from "./axiosClient";

const getToken = () => localStorage.getItem("access_token");

export const supplierApi = {
  getSupplier: function () {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/supplier-product";
    const config = { headers };
    return axiosClient.get(url, config);
  },

  createSupplier: function (body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = "/admin/supplier-product";
    const config = { headers };
    return axiosClient.post(url, body, config);
  },

  getSupplierById: function (supplierId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/supplier-product/${supplierId}`;
    const config = { headers };
    return axiosClient.get(url, config);
  },
  updateSupplier: function (supplierId, body) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/supplier-product/${supplierId}`;
    const config = { headers };
    return axiosClient.put(url, body, config);
  },
  removeSupplier: function (supplierId) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = `/admin/supplier-product/${supplierId}`;
    const config = { headers };
    return axiosClient.delete(url, config);
  },
};
