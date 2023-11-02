
import './Navbar.css'

import {NavLink, Link} from 'react-router-dom'
import {BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill} 
from 'react-icons/bs'; //o bs é da biblioteca boodstrap

function Navbar() {
  return (
      <nav id="nav">
        
            <Link to="/">Blog</Link>
        
        
            <form>
            <BsSearch></BsSearch>
            <input type='text'></input>
            </form>

            <ul id="nav-links">
              <NavLink to="/">
            
                <BsHouseDoorFill></BsHouseDoorFill>

              </NavLink>
        <NavLink to="/login">Entrar</NavLink>
        <NavLink to="/register">Cadastrar</NavLink>

        </ul>


      </nav>
  );
}

export default Navbar
