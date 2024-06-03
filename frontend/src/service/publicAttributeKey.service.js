import axiosClient from "./axiosClient";

const getToken = () => localStorage.getItem("access_token");

export const publicAttributeKeyApi = {
  getAttribute: function () {
    const url = "/public/attribute-key";
    return axiosClient.get(url);
  },
};
