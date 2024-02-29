import "../styles/services.css"
import Navbar from "./Navbar"

function ServicesNearYou()
{
  interface searchLog{
    type: string,
    date: Date
  }

  const searchLog = async(searchType: string) => {

    let searchLog: searchLog = {type: searchType, date: new Date()}

    try {
      await fetch('https://localhost:7015/api/Api/SaveSearchLog', {
        method: 'POST', 
        body: JSON.stringify(searchLog),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return(
    <div>
      <Navbar />
      <div className="ServicesMain">
        <div className="ServicesW">
          <p id="Heading">Services near you</p>
          <p>Want more <strong>fun</strong> ?</p>
          <a target="blank" href="https://www.google.com/maps/search/Bar/"><button className="bar" onClick={() => searchLog("Bar")} >Find nearest <strong>bars</strong></button></a>

          <p>Feeling <strong>tired</strong> ?</p>
          <a target="blank"  href="https://www.google.com/maps/search/Taxi"><button className="taxi" onClick={() => searchLog("Taxi")}>Get a <strong>taxi</strong></button></a>

          <p>Need <strong>help</strong> ?</p>
          <a target="blank" href="https://www.google.com/maps/search/Hospital+OR+Policie"><button className="help" onClick={() => searchLog("Help")}>Find nearest <strong>police</strong> or <strong>hospital</strong></button></a>
        </div>
      </div>
    </div>
  )
}

export default ServicesNearYou