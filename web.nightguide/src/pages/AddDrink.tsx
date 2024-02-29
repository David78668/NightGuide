import { useState } from "react";
import Navbar from "./Navbar";

function AddDrink() {
    const [name, setName] = useState<string>("");
    const [volume, setVolume] = useState<number>();
    const [alcohol, setAlcohol] = useState<number>();
    const [price, setPrice] = useState<number>();

    const handleAdd = async() => {
        if(name && volume && alcohol && price)
        {
            const drink = {
                name: name,
                volume: volume,
                alcohol: alcohol,
                price: price
            };

            try {
                await fetch('https://localhost:7015/api/Api/AddDrink', {
                    method: 'POST', 
                    body: JSON.stringify(drink),
                    headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                    },
                });

                alert("Sucsessfully added your drink to the database !")
            } 
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        else{
            alert("You forgot to fill somethin in!")
        }
    }

    return(
        <div>
            <Navbar />
            <div>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name}></input>
                <input type="number" placeholder="Volume (l)" onChange={(e) => setVolume(parseFloat(e.target.value))} value={volume}></input>
                <input type="number" placeholder="Alcohol (%)" onChange={(e) => setAlcohol(parseFloat(e.target.value))} value={alcohol}></input>
                <input type="number" placeholder="Price (czk)" onChange={(e) => setPrice(parseFloat(e.target.value))} value={price}></input>
                <button onClick={() => handleAdd()} >Add to the database!</button>
            </div>
        </div>
    );
}
export default AddDrink;