import "../styles/navbar.css"

function Navbar() {
  return (
    <div id='Main'>
        <a href='/'>
          <strong>NightGuide</strong>
        </a>
        <a href='/AddDrink'>
          AddDrink
        </a>
        <a href='/Calculations'>
          Calculations
        </a>
    </div>
  );
}

export default Navbar;