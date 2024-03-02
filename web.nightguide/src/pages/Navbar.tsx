import "../styles/navbar.css"

function Navbar() {
  return (
    <div id='Main'>
      <div className="NGLogoW">
        <a href='/'>
          <strong>NightGuide</strong>
        </a>
      </div>
      <div className="ButtonsW">
        <a href='/Calculations'>
          Recent calculations
        </a>
        <a href='/Services'>
           Services near you
        </a>
        <a href='/Statistics'>
          Statistics
        </a>
        <a href='/AddDrink'>
          Add custom drink
        </a>
      </div>
    </div>
  );
}

export default Navbar;