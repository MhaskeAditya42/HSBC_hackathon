import { useState } from 'react';
import './App.css';
import data from '../data.json';
import BarGraph from './components/BarGraph';
import ScatterPlot from './components/ScatterPlot';
import PieChart2 from './components/PieChart2';
// import BarChart2 from './components/BarChart2';
import DonutChart from './components/DonutChart';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <h1>Financial API Driven Dashboard</h1>
    <div className="container">
      
      <div className="grid-item">
        <p>Bar Chart Example</p>
        <BarGraph data={data} />
      </div>
      {/* <div className="grid-item">
        <p>Bar Chart Example 2</p>
        <BarChart2 data={data} />
      </div> */}
      <div className="grid-item">
        <p>Distribution</p>
        <PieChart2 data={data} />
      </div>
      <div className="grid-item">
        <p>Zip Code Distribution (Scatter Plot)</p>
        <ScatterPlot data={data} />
      </div>
      <div className="grid-item">
        <p>Time Series</p>
        <DonutChart data={data} />
      </div>
    </div>
    </>
  );
}

export default App;
