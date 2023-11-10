import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
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
  const data = {
    labels: months,
    datasets:[ {
      label: p.labelName,
      data: p.data.map((d) => d.nbHour),
      backgroundColor: "rgb(99, 3, 3)",
      borderColor: 'rgb(188, 3, 3)',
      fill: true,
      borderWidth:2
    }],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        x: {
            grid: {
                color: '#f3f3f34f'
            }
        },
        y: {
            grid: {
                color: '#f3f3f34f'
            }
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
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
  );

  return <Line data={data} options={options} />;
};

export default DashboardLineChart;
