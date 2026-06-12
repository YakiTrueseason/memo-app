import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from './ThemeContext';
import './Navbar.css';

function Navbar() {
    const {darkMode,setDarkMode} = useContext(ThemeContext);
    return (
        <nav className='nav'> 
            <button onClick={()=>
                setDarkMode(!darkMode)
            }>
                {darkMode ? "Light" :"Dark"}
            </button>
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to="/memo">
                <button>Memo</button>
            </Link>
            <Link to="/todo">
                <button>Todo</button>
            </Link>
            <Link to="/calendar">
                <button>Calendar</button>
            </Link>
        </nav>
    )
}

export default Navbar;
