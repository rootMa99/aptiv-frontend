import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

const DashboardBarChart = (p) =>{
  const [isHover, setIsHover]=useState(0);

  const data = {
    labels: p.data.map((m) => m.name),
    datasets: [
      {
        label: p.nameLabel,
        data: p.data.map((m) => m.nbrHour),
        backgroundColor: "rgb(99, 3, 3)",
        hoverBackgroundColor: "#950101",
        borderColor: "#FAF0E6",
        borderWidth: 1,
      },
    ],
  };
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

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
          color: "#FAF0E6",
          fontWeight: "bold",
        },
      },
      y: {
        grid: {
          color: "#f3f3f34f",
        },
        ticks: {
          color: "#FAF0E6",
          fontWeight: "bold",
        },
        beginAtZero: true,
      },
    },

    plugins: {
      legend: {
        labels: {
          color: "#FAF0E6",
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

          meta.data.forEach((bar, barIndex) => {
            const data = dataset.data[barIndex].toFixed(2);
            const xPos = bar.x;
            const yPos = bar.y - 10;

            ctx.save();
            ctx.textAlign = "center";
            ctx.fillStyle = "#FAF0E6";
            ctx.font = "12px Arial";

            ctx.fillText(data, xPos, yPos);

            ctx.restore();
          });
        });
      },
    },
  };

 
  const styleC= isHover>0 ?   {"cursor": "pointer"} :  {"cursor": "default"};


  return <Bar data={data} options={options} style={styleC} />;
};

export default DashboardBarChart;
