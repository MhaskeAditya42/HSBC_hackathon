import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart2 = ({ data }) => {
  const fraudCounts = data.reduce(
    (acc, item) => {
      acc[item.fraud] = (acc[item.fraud] || 0) + 1;
      return acc;
    },
    { 0: 0, 1: 0 }
  );

  const chartData = {
    labels: ['Non-Fraud', 'Fraud'],
    datasets: [
      {
        data: [fraudCounts[0], fraudCounts[1]],
        backgroundColor: ['#42A5F5', '#EF5350'],
        borderColor: '#FFFFFF',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart2;
