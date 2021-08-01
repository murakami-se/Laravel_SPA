import React, { useState } from 'react'

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="container">
            <h2>Signin</h2>
            <div className="card">
                <form className="card-body">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" id="email" name="email" className="form-control" onChange={e=>setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" name="password" className="form-control" onChange={e=>setPassword(e.target.value)}/>
                    </div>
                    <button type="button" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signin
