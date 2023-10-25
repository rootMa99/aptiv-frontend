import { NavLink } from 'react-router-dom';
import c from './NavBar.module.css';
import imglogo from "../../assets/aptiv-logo.svg"


const NavBar =()=>{



    return (
    <header className={c.navBar}>
        <div className={c.logo}>
            <img src={imglogo} alt="logo for aptiv" />
        </div>
        <div className={c.links} >
            <ul>
                <li>
                    <NavLink 
                    to="/home"
                    className={({ isActive }) => (isActive ? c.activeLink : c.link)}>
                        home
                    </NavLink> 
                </li>
  
                <li>
                    <NavLink 
                    to="/allEmployee"
                    className={({ isActive }) => (isActive ? c.activeLink : c.link)}>
                        Employees
                    </NavLink>
                </li>

                <li>
                    <NavLink
                    to="/addFormation" 
                    className={({ isActive }) => (isActive ? c.activeLink : c.link)}>
                        Add Formation
                    </NavLink>
                </li>
            </ul>
        </div>
    </header>)
}

export default NavBar;