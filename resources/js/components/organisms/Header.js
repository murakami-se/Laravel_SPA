import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="mb-4">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">App Name</a>
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link to="/" className="nav-link active">Home</Link></li>
                        <li className="nav-item"><Link to="/example" className="nav-link active">Example</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;