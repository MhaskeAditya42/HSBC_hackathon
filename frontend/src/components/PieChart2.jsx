import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart2 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/getTransactions');
        const result = await response.json();

        // Check if result.data exists and is an array
        if (Array.isArray(result)) {
          setData(result);
        } else {
          console.error('Unexpected data format:', result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading Data...</div>;
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const fraudCounts = data.reduce(
    (acc, item) => {
      const key = item.fraud ? 'true' : 'false';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    { true: 0, false: 0 }
  );

  const chartData = {
    labels: ['Non-Fraud', 'Fraud'],
    datasets: [
      {
        data: [fraudCounts.false, fraudCounts.true],
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