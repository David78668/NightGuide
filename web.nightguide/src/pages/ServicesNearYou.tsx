import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import "../styles/services.css";
import Navbar from "./Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ServicesNearYou() {
  const [searchLogs, setSearchLogs] = useState<searchLog[]>([]);

  interface searchLog {
    type: string;
    date: Date;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const labels = ['Bar', 'Taxi', 'Police & Hospital'];

  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'Search type',
        data: [0, 0, 0],
        backgroundColor: 'rgba(0, 71, 171, 0.8)',
      },
    ],
  });

  const getSearchAmountByType = () => {
    let bar = 0;
    let taxi = 0;
    let help = 0;

    searchLogs.forEach((srch) => {
      if (srch.type === "Bar") bar += 1;
      else if (srch.type === "Taxi") taxi += 1;
      else if (srch.type === "Help") help += 1;
    });

    return [bar, taxi, help];
  };

  const fetchSearches = async () => {
    try {
      const response = await fetch('https://localhost:7015/api/Api/GetSearchLogs');
      const jsonData = await response.json();
      setSearchLogs(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const searchLog = async (searchType: string) => {
    let searchLog: searchLog = { type: searchType, date: new Date() };

    try {
      await fetch('https://localhost:7015/api/Api/SaveSearchLog', {
        method: 'POST',
        body: JSON.stringify(searchLog),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
      });
      fetchSearches();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchSearches();
  }, []);

  useEffect(() => {
    setData(
      prevData => ({...prevData,
        datasets: [{...prevData.datasets[0],
          data: getSearchAmountByType(),
        }],
    }));
  }, [searchLogs]);

  return (
    <div>
      <Navbar />
      <div className="ServicesMain">
        <div className="ServicesW">
          <p id="Heading">Services near you</p>
          <p>Want more <strong>fun</strong> ?</p>
          <a target="_blank" href="https://www.google.com/maps/search/Bar/">
            <button className="bar" onClick={() => searchLog("Bar")} >Find nearest <strong>bars</strong></button>
          </a>

          <p>Feeling <strong>tired</strong> ?</p>
          <a target="_blank" href="https://www.google.com/maps/search/Taxi">
            <button className="taxi" onClick={() => searchLog("Taxi")}>Get a <strong>taxi</strong></button>
          </a>

          <p>Need <strong>help</strong> ?</p>
          <a target="_blank" href="https://www.google.com/maps/search/Hospital+OR+Police">
            <button className="help" onClick={() => searchLog("Help")}>Find nearest <strong>police</strong> or <strong>hospital</strong></button>
          </a>
          <p style={{textDecoration: "underline"}} >Searches</p>
          <div className="ChartW" >
            <Bar options={options} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesNearYou;
