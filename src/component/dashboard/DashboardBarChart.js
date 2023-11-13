import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const DashboardBarChart = (p) => {
  const data = {
    labels: p.data.map((m) => m.name),
    datasets: [
      {
        label: p.nameLabel,
        data: p.data.map((m) => m.nbrHour.toFixed(2)),
        backgroundColor: "rgb(99, 3, 3)",
        borderColor: "#f3f3f34f",
        borderWidth: 2,
      },
    ],
  };
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
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
        beginAtZero: true,
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

          meta.data.forEach((bar, barIndex) => {
            const data = dataset.data[barIndex];
            const xPos = bar.x;
            const yPos = bar.y - 10; 

            ctx.save();
            ctx.textAlign = "center";
            ctx.fillStyle = "#f3f3f34f";
            ctx.font = "12px Arial";

            
            ctx.fillText(data, xPos, yPos);

            ctx.restore();
          });
        });
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default DashboardBarChart;
