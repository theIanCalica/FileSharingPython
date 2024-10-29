import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register necessary components with Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = () => {
  // Data for the pie chart
  const data = {
    labels: ["Pizza", "Burger", "Sushi", "Pasta", "Tacos"],
    datasets: [
      {
        data: [150, 120, 90, 80, 70],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverOffset: 4,
      },
    ],
  };

  // Options for the pie chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (context.parsed) {
              label += `: ${context.raw} Orders`;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-4">Top 5 Foods</h2>
      <Pie data={data} options={options} />
      <div className="flex justify-between items-center mt-6">
        {/* Left side: View More */}
        <div className="text-blue-500 cursor-pointer hover:underline">
          View More
        </div>

        {/* Right side: Download Report */}
        <button className="bg-transparent border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white transition-colors duration-300">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default PieChart;
