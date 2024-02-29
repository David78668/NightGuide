import { useEffect, useState } from 'react';
import '../styles/home.css';
import Navbar from './Navbar';

function Home() {
  const [weight, setWeight] = useState<number>(75);
  const [gender, setGender] = useState<string>("man");
  const [cont, setCont] = useState<boolean>(false);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [currentDrink, setCurrentDrink] = useState<Drink>();
  const [currentAmount, setCurrentAmount] = useState<number>(1);
  const [selectedDrinks, setSelectedDrinks] = useState<SelectedDrink[]>([]);
  const [calculatorResult, setCalculatorResult] = useState<CalculatorResult>();

  interface Drink {
    id: number;
    name: string;
    volume: number;
    alcohol: number;
    price?: number
    recipe?: string;
  }

  interface SelectedDrink {
    Drink: Drink;
    Amount: number;
  }

  interface CalculatorResult {
    id?: number;
    calculationTime: Date;
    gender: string;
    weight: number;
    soberUpTime: Date;
    initialBAC: number;
  }

  interface ApiCalculatorResult {
    calculatorResult: CalculatorResult,
    drinks: SelectedDrink[]
  }

  function handleSelectedDrinkAdd()
  {
    if (currentDrink !== undefined) {
      const DrinkToAdd: SelectedDrink = {Drink : currentDrink, Amount: currentAmount}
      setSelectedDrinks([...selectedDrinks, DrinkToAdd]);
      setCurrentAmount(1);
    } else 
    {
      alert("Please select your drink(s).");
    }
  }

  function handleCalculation() {
    if (selectedDrinks.length > 0) {
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

        const soberDate = new Date(Date.now() + (Math.ceil((TotalAlcoholWeight / BrakedownPerHour) * 10) / 10 * 60 * 60 * 1000));

        let CalculatorResult: CalculatorResult = {
            calculationTime: new Date(),
            gender: gender,
            weight: weight,
            soberUpTime: soberDate,
            initialBAC: BAC,
        }

        setCalculatorResult(CalculatorResult)
    } else {
        alert("Please select at least one drink before calculating.");
    }
}


  function getSoberIn(soberDate: Date)
  {
    const difference = soberDate.getTime() - Date.now()
    return(`${Math.floor(difference / (1000 * 60 * 60))} hours ${Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))} minutes`)
  }

  const saveCalculatorResult = async () => {
    if(calculatorResult && selectedDrinks)
    {
      let data: ApiCalculatorResult = {
        calculatorResult: calculatorResult,
        drinks: selectedDrinks
      }

      try{
        await fetch('https://localhost:7015/api/Api/SaveCalculation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      }
      catch (error) {
        console.error('Error sending data:', error);
      }
    }
  }

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch('https://localhost:7015/api/Api/GetDrinks');
        const jsonData = await response.json();
        setDrinks(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDrinks();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="HomeMain">
        <div className="Wrapper">
          <p className='Heading'>Alcocalculator</p>
          <div className='Labels'>
            <p>Gender</p>
            <p>Weight</p>
          </div>
          <div className='Inputs'>
            <div className='GenderButtonsW'>
              <button style={{ backgroundColor: gender === 'man' ? '#2986cc' : 'whitesmoke', color: gender === 'man' ? 'white' : 'black'}} onClick={() => setGender('man')}>
                Man
              </button>
              <button style={{ backgroundColor: gender === 'woman' ? '#f28cd9' : 'whitesmoke', color: gender === 'woman' ? 'white' : 'black'}} onClick={() => setGender('woman')}>
                Woman
              </button>
            </div>
            <div className='WeightInputW'>
              <input type="number" onChange={(e) => (parseFloat(e.target.value) > 1 ? setWeight(parseFloat(e.target.value)) : setWeight(75))} value={weight} placeholder='Weight'/>
              <label>Kg</label>
            </div>
          </div>
          {cont === false ?
          <button style={{ backgroundColor: gender === 'man' ? '#2986cc' : '#f28cd9'}} className='ContinueBtn'  onClick={() => setCont(true)}>Continue</button>
          : null}
          {cont === true ? 
          <div className='Drinkputs'>
            <p className='DrinkLbl'>Drink</p>
            <div className='SelectedDrinkW'>
              <div>
                <select onChange={(e) => (e.target.value !== "" ? setCurrentDrink(JSON.parse(e.target.value)) : null)} value={currentDrink ? JSON.stringify(currentDrink) : ""} >
                  <option value="">Select a drink</option>
                  {drinks.map((drink: Drink) => (
                    <option value={JSON.stringify(drink)}>{drink.name} ({drink.volume} l)</option>
                ))}
                </select>
                <input type="number" onChange={(e) => (parseFloat(e.target.value) > 1 ? setCurrentAmount(parseFloat(e.target.value)) : setCurrentAmount(1))} value={currentAmount} placeholder='Amount'/>
              </div>
              <div>
                <button style={{ backgroundColor: gender === 'man' ? '#2986cc' : '#f28cd9'}} onClick={() => handleSelectedDrinkAdd()} >Add selected drink</button>
              </div>
            </div>
            {selectedDrinks.map((selectedDrink: SelectedDrink) => (
              <p className='SelectedDrinkP'>
                {selectedDrink.Amount.toString()}x {selectedDrink.Drink.name} ({selectedDrink.Drink.volume} l)
              </p>
            ))}
            <button style={{ backgroundColor: gender === 'man' ? '#2986cc' : '#f28cd9'}} className='CalculateBtn' onClick={() => handleCalculation()}>Calculate your BAC</button>
            {calculatorResult !== undefined ? 
            <div className='ResultW'>
              <p>You will be sober in <strong>{getSoberIn(calculatorResult.soberUpTime)}</strong> at <strong>{`${calculatorResult.soberUpTime.getHours()}:${String(calculatorResult.soberUpTime.getMinutes()).padStart(2, '0')}`}</strong></p>
              <p>Your initial BAC is <strong>{(Math.ceil(calculatorResult.initialBAC * 100) / 100)}</strong></p>
              <button style={{ backgroundColor: gender === 'man' ? '#2986cc' : '#f28cd9'}} className='CalculateBtn' onClick={() => saveCalculatorResult()}>Save the result</button>
            </div>
          : null}
          </div>: null}
        </div>
      </div>
    </div>
  );
}

export default Home;