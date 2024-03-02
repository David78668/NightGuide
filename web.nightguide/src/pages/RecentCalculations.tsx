import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/recentcalculation.css"

function RecentCalculations()
{
    const [calculationResults, setCalculationResults] = useState<CalcResultAndDrinks[]>();
    const [selectedCalculation, setSelectedCalculation] = useState<CalcResultAndDrinks>();
    const [drinks, setDrinks] = useState<Drink[]>([]);

    interface CalculatorResult {
        id: number;
        calculationTime: Date;
        gender: string;
        weight: number;
        soberUpTime: Date;
        initialBAC: number;
      }
      
      interface DrinkInCalculator {
        id: number;
        drinkId: number;
        amount: number;
        calculatorResultId: number;
      }
      
      interface CalcResultAndDrinks {
        calculatorResult: CalculatorResult;
        drinks: DrinkInCalculator[];
      }

      interface Drink {
        id: number;
        name: string;
        volume: number;
        alcohol: number;
        price: number
        recipe?: string;
      }

      function handleTime(date: Date, id: number)
      {
        const calculationTime = new Date(date);
        const day = calculationTime.getDate().toString().padStart(2, '0');
        const month = (calculationTime.getMonth() + 1).toString().padStart(2, '0');
        const hours = calculationTime.getHours().toString().padStart(2, '0');
        const minutes = calculationTime.getMinutes().toString().padStart(2, '0');

        return(
            <p style={{textAlign: "center"}}>Calculation {id} on {day}.{month}. at {hours}:{minutes}</p>
        )
      }

  function getSoberIn(soberDate: Date)
  {
    if(soberDate > new Date())
    {
      const difference = soberDate.getTime() - Date.now()
      return(<p>You will be sober in <strong>{Math.floor(difference / (1000 * 60 * 60))} hours {Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))} minutes</strong> at <strong>{`${new Date(soberDate).getHours()}:${String(new Date(soberDate).getMinutes()).padStart(2, '0')}`}</strong></p>)
    }
    else
    {
      return(<p>You should already be <strong>sober</strong></p>)
    }
  }

  function getSpending(selectedCalculation: CalcResultAndDrinks)
  {
    let spending: number = 0;
    {selectedCalculation.drinks.map((drink: DrinkInCalculator) => {
      const selectedDrink = drinks.find((d) => d.id === drink.drinkId);
      if(selectedDrink !== undefined) 
      {
        spending = (selectedDrink.price * drink.amount)
      }
    })}

    return spending;
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

        const fetchDrinks = async () => {
          try {
            const response = await fetch('https://localhost:7015/api/Api/GetDrinks');
            const jsonData = await response.json();
            setDrinks(jsonData);
          } catch (error) {
            console.error('Error fetching drinks data:', error);
          }
        };
    
        fetchCalculations();
        fetchDrinks();
      }, []);

    return(
      <div>
        <Navbar />
        <div className="MainRecentCalc">
          <div className="RecentCalcW">
            <p className='CalcHeading'>Recent calculations</p>
            <select className="CalcSelect" onChange={(e) => (e.target.value !== "" ? setSelectedCalculation(JSON.parse(e.target.value)) : null)} value={selectedCalculation ? JSON.stringify(selectedCalculation) : ""}>
              <option value="">Select a calculation</option>
              {calculationResults?.map((value: CalcResultAndDrinks) => (
                <option value={JSON.stringify(value)}>{handleTime(value.calculatorResult.calculationTime, value.calculatorResult.id)}</option>
              ))}
            </select>
            {selectedCalculation !== undefined ? 
              <div>
                <div>
                  <p className={selectedCalculation.calculatorResult.gender === 'man' ? 'man' : 'woman'}>
                    {selectedCalculation.calculatorResult.gender.toString().charAt(0).toUpperCase() + selectedCalculation.calculatorResult.gender.slice(1)} {selectedCalculation.calculatorResult.weight}kg
                  </p>
                  <p>{getSoberIn(new Date(selectedCalculation.calculatorResult.soberUpTime))}</p>
                  <p>Your initial BAC was <strong>{(Math.ceil(selectedCalculation.calculatorResult.initialBAC * 100) / 100)}</strong></p>
                  <p>You had:</p>
                  <ul>
                    {selectedCalculation.drinks.map((drink: DrinkInCalculator) => {
                      const selectedDrink = drinks.find((d) => d.id === drink.drinkId);
                      return (
                        <li>{selectedDrink ? `${drink.amount}x ${selectedDrink.name} (${selectedDrink.volume} l)` : `Drink (ID: ${drink.drinkId}) times ${drink.amount}`}</li>
                      );
                    })}
                  </ul>
                  <p>You spent approximately <strong>{getSpending(selectedCalculation)}czk</strong></p>
                </div>
              </div>
            :null}
          </div>
        </div>
      </div>
    )
}

export default RecentCalculations;