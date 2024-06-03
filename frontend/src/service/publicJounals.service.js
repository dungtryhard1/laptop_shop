import axiosClient from "./axiosClient";

export const publicjournalsApi = {
  getCategoryJounals: function () {
    const url = "/public/category-blog/";
    return axiosClient.get(url);
  },
  getJounals: function (params) {
    const url = "/public/blog/";
    return axiosClient.get(url, { params });
  },
  getJounalByID: function (id) {
    const url = `/public/blog/${id}`;
    return axiosClient.get(url);
  },
};
