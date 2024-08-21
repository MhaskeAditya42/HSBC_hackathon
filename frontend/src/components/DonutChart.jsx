import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DonutChart = ({ data }) => {
  const genderCounts = data.reduce(
    (acc, item) => {
      acc[item.gender] = (acc[item.gender] || 0) + 1;
      return acc;
    },
    { M: 0, F: 0 }
  );

  const chartData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [genderCounts['M'], genderCounts['F']],
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

  return <Doughnut data={chartData} options={options} />;
};

export default DonutChart;
