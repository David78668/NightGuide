import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Navbar from "./Navbar";
import "../styles/stats.css"

function Statistics() {
    const [stats, setStats] = useState<statistics>();

    ChartJS.register(ArcElement, Tooltip, Legend);
    
    const data = {
        labels: ['Man', 'Woman'],
        datasets: [
          {
            data: [stats?.males, stats?.females],
            backgroundColor: [
              'rgba(41, 134, 204, 0.2)',
              'rgba(242, 140, 217, 0.2)',

            ],
            borderColor: [
              'rgba(41, 134, 204, 1)',
              'rgba(242, 140, 217, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    interface statistics{
        id: number,
        popularDrink: string,
        avgWeight: number,
        males: number,
        females: number,
        avgInitBAC: number,
        avgSpend: number,
        avgSoberUpTimeMS: number
    }

    function getTimeFromMs(avgSoberTime: number)
    {
        let minutes = Math.floor((avgSoberTime / (1000 * 60)) % 60)
        let hours = Math.floor((avgSoberTime / (1000 * 60 * 60)) % 24) 

        return(
        <p>The average sober-up time is: <strong>{hours} hours {minutes} minutes</strong></p>
        )
    }

    useEffect(() => {
        const fetchDrinks = async () => {
          try {
            const response = await fetch('https://localhost:7015/api/Api/GetStatistics');
            const jsonData = await response.json();
            setStats(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchDrinks();
      }, []);

    return(
        <div>
            <Navbar />
            <div className="StatsMain">
                {stats ? 
                    <div className="StatsW">
                        <p id="Heading">Statistics</p>
                        <div className="GenderChartW">
                            <p>Gender</p>
                            <Pie data={data} />
                        </div>
                        <p>The average weight is: <strong>{stats.avgWeight} Kg</strong></p>
                        <p>The most popular drink is: <strong>{stats.popularDrink}</strong></p>
                        {getTimeFromMs(stats.avgSoberUpTimeMS)}
                        <p>The average intial BAC is: <strong>{Math.ceil(stats.avgInitBAC * 100) / 100}</strong></p>
                        <p>The average spend is: <strong>{stats.avgSpend} Czk</strong></p>
                    </div> 
                :null}
            </div>
        </div>
    );
}
export default Statistics;