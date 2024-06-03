import axiosClient from "./axiosClient";

const getToken = () => localStorage.getItem("access_token");

export const dashboardApi = {
    getChartData: function () {
        const token = getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const url = "/admin/total/chart";
        const config = { headers };
        return axiosClient.get(url, config);
    },
    getTotalRating: function () {
        const token = getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const url = "/admin/total/rating";
        const config = { headers };
        return axiosClient.get(url, config);
    },
    getTotalProfit: function () {
        const token = getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const url = "/admin/total/profit";
        const config = { headers };
        return axiosClient.get(url, config);
    },
    getTotalProduct: function () {
        const token = getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const url = "/admin/total/product";
        const config = { headers };
        return axiosClient.get(url, config);
    },
    getTotalOrder: function () {
        const token = getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const url = "/admin/total/order";
        const config = { headers };
        return axiosClient.get(url, config);
    },
};
