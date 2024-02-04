import { useEffect, useState } from 'react';
import '../App.css';
import Navbar from './Navbar';

function Home(this: any) {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<SelectedDrink[]>([]);

  const [currentDrink, setCurrentDrink] = useState<Drink>();
  const [currentAmount, setCurrentAmount] = useState<Number>();

  const [weight, setWeight] = useState<any>();
  const [gender, setGender] = useState<any>();

  const [calculatorResult, setCalculatorResult] = useState<CalculatorResult>();

  interface Drink {
    id: number | null;
    name: string;
    volume: number;
    alcohol: number;
    price: number | null;
    recipe: string | null;
  }

  interface CalculatorResult {
    calculationTime: Date;
    gender: string | undefined;
    weight: number | undefined;
    drinks: Drink[] | null;
    soberUpTime: Date;
    initialBAC: number;
  }

  interface SelectedDrink {
    Drink: Drink;
    Amount: Number;
  }

  function handleDrinkAdd()
  {
    if (currentAmount !== undefined && currentAmount !== null && currentDrink !== null && currentDrink !== undefined) {
      const DrinkToAdd: SelectedDrink = {Drink : currentDrink, Amount : currentAmount}
      setSelectedDrinks([...selectedDrinks, DrinkToAdd]);
      setCurrentAmount(undefined);

    } else 
    {
      alert("Select the drink and amount!");
    }
  }

  function handleCalculation()
  {
    if(gender !== undefined && weight !== undefined)
    {
      let TotalAlcoholWeight = 0;
      let BAC = 0;
      let R = gender === "man" ? 0.7 : gender === "woman" ? 0.6 : 0;
      let Beta = gender === "man" ? 0.1 : gender === "woman" ? 0.085 : 0;
      let BrakedownPerHour = 0;

      selectedDrinks.forEach((value: any) => {
        TotalAlcoholWeight += (((value.Drink.volume * value.Amount) * 1000) * value.Drink.alcohol * 0.8) / 100
        BAC = TotalAlcoholWeight / (weight * R)
        BrakedownPerHour = weight * Beta;
      })

      let currentDate = new Date();
      const millisecondsToAdd = Math.ceil((TotalAlcoholWeight / BrakedownPerHour) * 10) / 10 * 60 * 60 * 1000;
      const newTimeInMilliseconds = currentDate.getTime() + millisecondsToAdd;
      const newDate = new Date(newTimeInMilliseconds);
    
      alert("New Date:" + newDate.toString());

      let NewCalculatorResult: CalculatorResult = { 
        calculationTime: new Date(), 
        gender: gender, 
        weight: weight, 
        initialBAC: BAC,  
        soberUpTime: newDate, 
        drinks: selectedDrinks.map(selectedDrink => selectedDrink.Drink)
      }

      setCalculatorResult(NewCalculatorResult)

    } else {
      alert("Select your weight and gender!")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7015/api/Api/GetDrinks');
        const jsonData = await response.json();
        setDrinks(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='MainDiv'>
        <h1>AlcoCalculator 🥴</h1>
        <div className="InputDiv">

          <div className="GenderAndWeightDiv">
            {/* Gender*/ }
            <div>
              <label>Gender</label>
              <select onChange={(e) => (e.target.value !== "" ? setGender(e.target.value) : null)} value={gender}>
                <option value="">Select your gender</option>
                <option value="man">Man</option>
                <option value="woman">Woman</option>
              </select>
            </div>
             {/* Weight*/ }
             <div>
              <label>Weight</label>
              <div>
                <input type="number" onChange={(e) => (parseFloat(e.target.value) > 1 ? setWeight(parseFloat(e.target.value)) : setWeight(1))} value={weight ? JSON.stringify(weight) : undefined} placeholder='Weight'/>
                <label> kg</label>
              </div>
            </div>
          </div>

          <div className="DrinkAndAmountDivWrapper">
            {/* Drink select */}
            <h2>Select your drinks 🍹</h2>
            <div className='DrinkAndAmountDiv'>
              <div>
                <label>Drink</label>
                <select onChange={(e) => (e.target.value !== "" ? setCurrentDrink(JSON.parse(e.target.value)): null)} value={currentDrink ? JSON.stringify(currentDrink) : ""} >
                  <option value="">Select a drink</option>
                  {drinks.map((drink: Drink) => (
                    <option value={JSON.stringify(drink)}>{drink.name} ({drink.volume} l)</option>
                  ))}
                </select>  
              </div>
              {/* Amount select */}
              <div>
                <label>Amount</label>
                <input type="number" onChange={(e) => (parseFloat(e.target.value) > 1 ? setCurrentAmount(parseFloat(e.target.value)) : setCurrentAmount(1))} value={currentAmount ? JSON.stringify(currentAmount) : undefined} placeholder='Amount'/>
              </div>
            </div>
            <div className="AddSelectedDrinksDiv">
              <button onClick={() => handleDrinkAdd()} >Add selected drink(s)</button>
            </div>
          </div>

          {/* Selected drinks list */}
          <div className="SeletcedDrinksW">
            <h2>Selected drinks:</h2>
            <div>
              {selectedDrinks.map((value: SelectedDrink) => (
                <div>
                  <p>{value.Amount.toString()}x {value.Drink.name} ({value.Drink.volume} l)</p>
                </div>
              ))}
            </div>
          </div>

          {/* BAC Calculation */}
          <div>
            <button onClick={() => handleCalculation()}>Calculate!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;