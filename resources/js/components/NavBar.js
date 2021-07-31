import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
    const location = useLocation()

    const getNavLinkClass = path => (location.pathname === path ? 'nav-link active' : 'nav-link')

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">App Name</a>
                <ul className="navbar-nav">
                    <li className="nav-item"><Link to="/" className={getNavLinkClass("/")}>Home</Link></li>
                    <li className="nav-item"><Link to="/about" className={getNavLinkClass("/about")}>About</Link></li>
                    <li className="nav-item"><Link to="/login" className={getNavLinkClass("/login")}>Login</Link></li>
                    <li className="nav-item"><Link to="/profile" className={getNavLinkClass("/profile")}>Profile</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar