import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.cregister(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BarChart = ({ data }) => {
  
  const zipCodeAmount = data.reduce((acc, item) => {
    acc[item.zipcodeOri] = (acc[item.zipcodeOri] || 0) + item.amount;
    return acc;
  }, {});

  const zipCodes = Object.keys(zipCodeAmount);
  const amounts = Object.values(zipCodeAmount);

  const chartData = {
    labels: zipCodes,
    datasets: [
      {
        label: 'Total Amount Spent',
        data: amounts,
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1,
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
    scales: {
      x: {
        title: {
          display: true,
          text: 'Zip Code',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
