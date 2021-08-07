import React from 'react'
import { useForm } from 'react-hook-form'

import { useAuth } from '../conexts/authContext'
import { EmailRegex } from '../utils/validation'
import ErrorAlert from '../components/ErrorAlert'
import NavBar from '../components/NavBar'

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { handleLogin } = useAuth()

    return (
        <>
            <NavBar />
            <div className="container">
                <h2>Login</h2>
                <div className="card">
                    <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                        <ErrorAlert />
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="email"
                                className={errors.email ? "form-control is-invalid" : "form-control"}
                                {...register("email", {
                                    required: 'Emailは必ず入力してください。',
                                    pattern: {
                                        value: EmailRegex,
                                        message: '有効なEmailを入力してください。'
                                    }
                                })}
                            />
                            { errors.email && <small className="text-danger">{ errors.email.message }</small> }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className={errors.password ? "form-control is-invalid" : "form-control"}
                                {...register("password", {
                                    required: 'Passwordは必ず入力してください。',
                                })}
                            />
                            { errors.password && <small className="text-danger">{ errors.password.message }</small> }
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
