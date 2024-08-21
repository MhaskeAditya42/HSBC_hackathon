import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, CategoryScale, LinearScale } from 'chart.js';

// Registering required components for Chart.js
ChartJS.register(Title, Tooltip, Legend, PointElement, CategoryScale, LinearScale);

const ScatterPlot = ({ data }) => {
  // Prepare data for Scatter Plot
  const zipCodeCount = data.reduce((acc, item) => {
    acc[item.zipcodeOri] = (acc[item.zipcodeOri] || 0) + 1;
    return acc;
  }, {});

  // Convert zipCodeCount object to arrays for chart data
  const zipCodes = Object.keys(zipCodeCount);
  const counts = Object.values(zipCodeCount);

  // Scatter plot data
  const chartData = {
    datasets: [
      {
        label: 'Zip Code Distribution',
        data: zipCodes.map((zipCode, index) => ({
          x: zipCode, // Zip code as x-axis value
          y: counts[index], // Count as y-axis value
        })),
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1,
        pointRadius: 5,
      },
    ],
  };

  // Scatter plot options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.raw.x}: ${tooltipItem.raw.y}`;
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
        type: 'category', // Use category scale for non-numeric x-values
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
  };

  return <Scatter data={chartData} options={options} />;
};

export default ScatterPlot;
