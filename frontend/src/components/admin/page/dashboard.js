import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  FaCartPlus,
  FaGavel,
  FaIdCard,
  FaMoneyBill,
  FaMoneyBillWave,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { dashboardApi } from "../../../service/dashboard.service";
import { useEffect, useState } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Dashboard = () => {
  const date = 31;
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalRate, setTotalRate] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalChart, setTotalChart] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          totalProductRespone,
          totalRateRespone,
          totalOrderRespone,
          totalProfitRespone,
          totalChartRespone,
        ] = await Promise.all([
          dashboardApi.getTotalProduct(),
          dashboardApi.getTotalRating(),
          dashboardApi.getTotalOrder(),
          dashboardApi.getTotalProfit(),
          dashboardApi.getChartData(),
        ]);

        setTotalProduct(totalProductRespone.data);
        setTotalRate(totalRateRespone.data);
        setTotalOrder(totalOrderRespone.data);
        setTotalProfit(totalProfitRespone.data);
        totalChartRespone.data.sort((a, b) => b.sellNumber - a.sellNumber);
        const top10Items = totalChartRespone.data.slice(0, 15);
        setTotalChart(top10Items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const truncateString = (str, maxLength) => {
          if (str.length > maxLength) {
            return str.slice(0, maxLength) + "...";
          } else {
            return str;
          }
        };

        // Sử dụng hàm truncateString trong useEffect
        const newLabels = totalChart.map((item) =>
          truncateString(item.name, 10)
        );

        setLabels(newLabels);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [totalChart]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Static",
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Hot Sale",
        data: totalChart?.map((item) => item.sellNumber),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Top Rating",
        data: totalChart?.map((item) => item.averageRating),
        backgroundColor: "rgba(53, 162, 235, 1)",
      },
    ],
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div className="rounded-3xl border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mt-4 ml-1 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {totalOrder}
              </h4>
              <span className="text-sm font-medium">Total order</span>
            </div>

            <span className="flex mr-3 items-center gap-1 text-sm font-medium text-meta-3">
              <FaCartPlus className="w-5 h-5" />
            </span>
          </div>
        </div>
        <div className="rounded-3xl border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mt-4 ml-1 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                $ {totalProfit}
              </h4>
              <span className="text-sm font-medium">Total Profit</span>
            </div>

            <span className="flex mr-3 items-center gap-1 text-sm font-medium text-meta-3">
              <FaMoneyBillWave className="w-5 h-5" />
            </span>
          </div>
        </div>
        <div className="rounded-3xl border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mt-4 ml-1 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {totalProduct}
              </h4>
              <span className="text-sm font-medium">Total Product</span>
            </div>

            <span className="flex mr-3 items-center gap-1 text-sm font-medium text-meta-3">
              <FaGavel className="w-5 h-5" />
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mt-4 ml-1 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {totalRate?.toFixed(2)}
              </h4>
              <span className="text-sm font-medium">Average Rating</span>
            </div>

            <span className="flex mr-3 items-center gap-1 text-sm font-medium text-meta-3">
              <FaStar className="w-5 h-5" />
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Bar options={options} data={data} />
      </div>
      {/* <div className="mt-6">
              <Bar options={options} data={data} />
          </div> */}
    </>
  );
};

export default Dashboard;
