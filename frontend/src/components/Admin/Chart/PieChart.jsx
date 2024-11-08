import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register necessary components with Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = () => {
  // Hard-coded data for the pie chart
  const [fileData, setFileData] = useState({
    labels: ["PDF", "JPEG", "PNG", "DOCX", "MP4"],
    datasets: [
      {
        data: [300, 200, 150, 100, 50],
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
  });

  // Uncomment this section to fetch data from the backend instead of using hard-coded data
  /*
  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await client.get(`${process.env.REACT_APP_API_LINK}/top-file-types`, {
          withCredentials: true,
        });
        const fileTypes = response.data.file_types;
        
        setFileData({
          labels: fileTypes.map((file) => file.type),
          datasets: [
            {
              data: fileTypes.map((file) => file.count),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
              hoverOffset: 4,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching file data:", err);
      }
    };

    fetchFileData();
  }, []);
  */

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
              label += `: ${context.raw} Files`;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="p-4 rounded-lg w-full max-w-sm mt-10">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Top 5 Uploaded File Types
        </h2>
        <Pie data={fileData} options={options} />
        <div className="flex justify-between items-center mt-6"></div>
      </div>
    </div>
  );
};

export default PieChart;
