import { useState, useEffect } from "react";
import Navbar from "./Navbar";

function RecentCalculations()
{
    const [calculationResults, setCalculationResults] = useState<CalcResultAndDrinks[]>();

    interface CalculatorResult {
        id: number;
        calculationTime: Date;
        gender: string;
        weight: number;
        soberUpTime: Date;
        initialBAC: number;
      }
      
      interface Drink {
        id: number;
        drinkId: number;
        amount: number;
        calculatorResultId: number;
      }
      
      interface CalcResultAndDrinks {
        calculatorResult: CalculatorResult;
        drinks: Drink[];
      }

      function handleTime(date: Date, id: number)
      {
        const calculationTime = new Date(date);
        const day = calculationTime.getDate().toString().padStart(2, '0');
        const month = (calculationTime.getMonth() + 1).toString().padStart(2, '0');
        const hours = calculationTime.getHours().toString().padStart(2, '0');
        const minutes = calculationTime.getMinutes().toString().padStart(2, '0');

        return(
            <p>Calculation {id} on {day}.{month}. at {hours}:{minutes}</p>
        )
      }

    useEffect(() => {
        const fetchCalculations = async () => {
          try {
            const response = await fetch('https://localhost:7015/api/Api/GetCalculations');
            const jsonData = await response.json();
            setCalculationResults(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchCalculations();
      }, []);

    return(
        <div>
            <Navbar />
            <div>
            <select>
                  <option value="">Select a calculation</option>
                  {calculationResults?.map((value: CalcResultAndDrinks) => (
                    <option value={JSON.stringify(value)}>{handleTime(value.calculatorResult.calculationTime, value.calculatorResult.id)}</option>
                ))}
                </select>
            </div>
        </div>
    )
}

export default RecentCalculations;