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
        data: p.data.map((m) => m.nbrHour),
        backgroundColor: "rgb(99, 3, 3)",
        borderColor: "#f3f3f34f",
        borderWidth: 2,
      },
    ],
  };
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

  const options = {
    scales: {
        x: {
            grid: {
                color: '#f3f3f34f'
            },
            ticks: {
                color: 'white',
                fontWeight: 'bold' 
            }
        },
        y: {
            grid: {
                color: '#f3f3f34f'
            },
            ticks: {
                color: 'white',
                fontWeight: 'bold' 
            },
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
          labels: {
            color: 'white',
          },
        },
      },
  };

  return <Bar data={data} options={options} />;
};

export default DashboardBarChart;
