import React from 'react'
import { useForm } from 'react-hook-form'

import { useAuth } from '../conexts/authContext'
import { EmailRegex } from '../utils/validation'
import ErrorAlert from '../components/ErrorAlert'
import NavBar from '../components/NavBar'

import 'font-awesome/css/font-awesome.css'
import 'bootstrap-social/bootstrap-social.css'

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { handleLogin, handleGetSocialLoginUrl } = useAuth()

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
                <div className="card-footer">
                    <button type="botton" className="btn btn-social btn-github" onClick={() => handleGetSocialLoginUrl('github')}>
                        <span className="fa fa-github"></span> Sign in with Github
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login
