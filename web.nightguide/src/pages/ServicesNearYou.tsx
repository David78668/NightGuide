import { useHref } from "react-router-dom"
import "../styles/taxi.css"
import Navbar from "./Navbar"

function ServicesNearYou()
{
  interface searchLog{
    type: string,
    date: Date
  }

  function searchLog(searchType: string)
  {
    let searchLog: searchLog = {type: searchType, date: new Date()}
  }

  return(
    <div>
      <Navbar />
      <div>
        <p>Want more fun ?</p>
        <a target="blank" href="https://www.google.com/maps/search/Bar/"><button onClick={() => searchLog("Bar")} >Find nearest bars</button></a>

        <p>Feeling tired ?</p>
        <a target="blank"  href="https://www.google.com/maps/search/Taxi"><button onClick={() => searchLog("Taxi")}>Get a taxi</button></a>

        <p>Need help ?</p>
        <a href="https://www.google.com/maps/search/Hospital+OR+Policie"><button onClick={() => searchLog("Help")}>Find nearest police or hospital</button></a>
      </div>
    </div>
  )
}

export default ServicesNearYou