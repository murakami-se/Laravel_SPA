import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useAuthState, useAuthDispatch } from '../providers/authProvider'

const NavBar = () => {
    const { onLogout } = useAuthDispatch()
    const { isLoggedIn } = useAuthState()

    const location = useLocation()

    const getNavLinkClass = path => (location.pathname === path ? 'nav-link active' : 'nav-link')

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">App Name</a>
                <ul className="navbar-nav">
                    <li className="nav-item"><Link to="/" className={getNavLinkClass("/")}>Home</Link></li>
                    <li className="nav-item"><Link to="/about" className={getNavLinkClass("/about")}>About</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li className="nav-item"><Link to="/profile" className={getNavLinkClass("/profile")}>Profile</Link></li>
                            <li className="nav-item"><a className="nav-link" onClick={onLogout}>Logout</a></li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item"><Link to="/login" className={getNavLinkClass("/login")}>Login</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar