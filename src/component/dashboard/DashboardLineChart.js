import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";

const months = [
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
];
const DashboardLineChart = (p) => {

  const [isHover, setIsHover]=useState(0);


  const data = {
    labels: months,
    datasets: [
      {
        label: p.labelName,
        data: p.data.map((d) => d.nbHour),
        backgroundColor: "#FAF0E6",
        pointHoverBorderColor: "rgb(0, 3, 3)",
        borderColor: "rgb(188, 3, 3)",
        fill: false,
        tension: 0.3,
        borderWidth: 3,
        borderCapStyle: "round",
        //borderDash: [5, 5],
        pointHoverBackgroundColor: "rgb(88, 3, 3)",
        pointHoverRadius: 8,
        pointBorderColor: "rgb(110, 3, 3)",
        pointBorderWidth: 3,
        pointRadius: 7,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    onHover: (event, elements) => {
      if (elements && elements.length > 0) {
        const dataIndex = elements[0].index;
        setIsHover(dataIndex+1);
      } else{
        setIsHover(0)
      }
    },
    scales: {
      x: {
        grid: {
          color: "#f3f3f34f",
        },
        ticks: {
          color: "white",
          fontWeight: "bold",
        },
      },
      y: {
        grid: {
          color: "#f3f3f34f",
        },
        ticks: {
          color: "white",
          fontWeight: "bold",
        },
        y: {
          stacked: true,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      datalabels: {
        display: true,
      },
    },
    animation: {
      onComplete: (animation) => {
        const { chart } = animation;
        const ctx = chart.ctx;

        chart.data.datasets.forEach((dataset, index) => {
          const meta = chart.getDatasetMeta(index);
          meta.data.forEach((point) => {
            const value = point["$context"].raw.toFixed(2);
            const xPos = point.x;
            const yPos = point.y - 15;

            ctx.save();
            ctx.textAlign = "center";
            ctx.fillStyle = "#FAF0E6";
            ctx.font = "12px Arial";

            ctx.fillText(value, xPos, yPos);

            ctx.restore();
          });
        });
      },
    },
  };
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
  );
  const styleC= isHover>0 ?   {"cursor": "pointer"} :  {"cursor": "default"};

  return <Line data={data} options={options} style={styleC} />;
};

export default DashboardLineChart;
