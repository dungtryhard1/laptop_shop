import axiosClient from "./axiosClient";

// const getToken = () => localStorage.getItem("access_token");

export const publicProductApi = {
  getAllProduct: function (params) {
    const url = "/public/product/";
    return axiosClient.get(url, { params });
  },
  getTopSellingProduct: function () {
    const url = "/public/product/top-selling";
    return axiosClient.get(url);
  },
  getTopNewProduct: function () {
    const url = "/public/product/top-new";
    return axiosClient.get(url);
  },
  getProductByID: function (id) {
    const url = `/public/product/${id}`;
    return axiosClient.get(url);
  },
  getAtrribute: function () {
    const url = `/public/attribute`;
    return axiosClient.get(url);
  },
  getcategory: function () {
    const url = `/public/category-product/`;
    return axiosClient.get(url);
  },
  getSupplier: function () {
    const url = `/public/supplier/`;
    return axiosClient.get(url);
  },
  getAttribute: function () {
    const url = `public/attribute-key/`;
    return axiosClient.get(url);
  },
};
