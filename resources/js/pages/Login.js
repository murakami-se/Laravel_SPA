import React, { useState } from 'react'

import { useAuth } from '../conexts/authContext'
import NavBar from '../components/NavBar'
import ErrorMessages from '../components/ErrorMessages'

const Login = () => {
    const { handleLogin } = useAuth()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    return (
        <>
            <NavBar />
            <div className="container">
                <h2>Login</h2>
                <div className="card">
                    <form className="card-body">
                        <ErrorMessages type="alert" />
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" id="email" name="email" className="form-control" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" id="password" name="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={() => handleLogin(email, password)}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
