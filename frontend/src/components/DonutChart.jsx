import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DonutChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/getTransactions');
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  // Process the data to calculate the count of each gender
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

  // Show loading text if data is still being fetched
  if (loading) {
    return <div>Loading Data...</div>;
  }

  return <Doughnut data={chartData} options={options} />;
};

export default DonutChart;