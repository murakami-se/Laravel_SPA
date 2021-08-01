import React, { useState } from 'react'
import { useAuthState, useAuthDispatch } from '../providers/authProvider'

const Login = () => {
    const { handleLogin } = useAuthDispatch()
    const { error } = useAuthState()
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const onLogin = () => {
        handleLogin(email, password)
    }

    return (
        <div className="container">
            <h2>Login</h2>
            <div className="card">
                <form className="card-body">
                    {error && <p className="text-danger">{error}</p>}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" id="email" name="email" className="form-control" onChange={e=>setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" name="password" className="form-control" onChange={e=>setPassword(e.target.value)} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={onLogin}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login
