import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useAuth } from '../conexts/authContext'

const NavBar = () => {
    const { isLoggedIn, handleLogout } = useAuth()

    const location = useLocation()

    const getNavLinkClass = path => (location.pathname === path ? 'nav-link active' : 'nav-link')

    const onLogout = e => {
        e.preventDefault()
        handleLogout()
    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">App Name</a>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item"><Link to="/" className={getNavLinkClass("/")}>Home</Link></li>
                    <li className="nav-item"><Link to="/about" className={getNavLinkClass("/about")}>About</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li className="nav-item"><Link to="/profile" className={getNavLinkClass("/profile")}>Profile</Link></li>
                        </>
                    ) : ''}
                </ul>
                {isLoggedIn ? (
                    <a className="btn btn-sm btn-light" onClick={onLogout}>Logout</a>
                ) : (
                    <>
                        <Link to="/register" className="btn btn-sm btn-outline-light mr-2">Register</Link>
                        <Link to="/login" className="btn btn-sm btn-primary">Login</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default NavBar