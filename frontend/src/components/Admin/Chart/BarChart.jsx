import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  // Data for bookings and order sales (in PHP)
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Bookings",
        data: [
          120000, 150000, 180000, 100000, 90000, 200000, 160000, 190000, 220000,
          210000, 180000, 240000,
        ], // Example data (in PHP)
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Order Sales",
        data: [
          200000, 230000, 250000, 220000, 180000, 260000, 240000, 290000,
          310000, 320000, 280000, 340000,
        ], // Example data (in PHP)
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options with currency formatting
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bookings and Order Sales (January - December)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // Custom callback for formatting values in PHP
          callback: function (value) {
            return "₱" + value.toLocaleString(); // Format the value as PHP
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
