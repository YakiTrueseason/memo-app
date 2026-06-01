import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
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
