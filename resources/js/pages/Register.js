import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useError } from '../conexts/errorContext'
import { useAuth } from '../conexts/authContext'
import { EmailRegex, HankakuAlphaNumRegex } from '../utils/validation'
import ErrorAlert from '../components/ErrorAlert'
import NavBar from '../components/NavBar'

const Register = () => {
    const { register, handleSubmit, formState: { errors }, setError, getValues, clearErrors } = useForm()
    const { handleRegister } = useAuth()
    const { hasError, error } = useError()

    useEffect(() => {
        hasError && _.forEach(error.response.data.errors, (messages, name) => setError(name, {type: "manual", message: messages[0]}))
    }, [hasError])

    return (
        <>
            <NavBar />
            <div className="container">
                <h2>Register</h2>
                <div className="card">
                    <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
                        <ErrorAlert />
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                <span className="text-danger">*</span> Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className={errors.name ? "form-control is-invalid" : "form-control"}
                                {...register("name", {
                                    required: 'Nameは必ず入力してください。',
                                    maxLength: {
                                        value: 255,
                                        message: 'Nameは255文字以内で入力してください。'
                                    }
                                })}
                            />
                            { errors.name && <small className="text-danger">{ errors.name.message }</small> }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                <span className="text-danger">*</span> Email
                            </label>
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
                            <label htmlFor="password" className="form-label">
                                <span className="text-danger">*</span> Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className={errors.password || errors.password_confirmation ? "form-control is-invalid" : "form-control"}
                                {...register("password", {
                                    required: 'Passwordは必ず入力してください。',
                                    minLength: {
                                        value: 8,
                                        message: 'Passwordは8文字以上で入力してください。'
                                    },
                                    pattern: {
                                        value: HankakuAlphaNumRegex,
                                        message: 'Passwordは半角英数字で入力してください。'
                                    },
                                    validate: v => {
                                        if (v !== getValues('password_confirmation'))
                                            setError("password_confirmation", {type: "manual", message: "passwordと、確認フィールドとが、一致していません。"})
                                        else clearErrors("password_confirmation")
                                    }
                                })}
                            />
                            { errors.password && <small className="text-danger">{ errors.password.message }</small> }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password_confirmation" className="form-label">
                                <span className="text-danger">*</span> Password confirm
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                className={errors.password_confirmation ? "form-control is-invalid" : "form-control"}
                                {...register("password_confirmation", {
                                    required: 'Password confirmは必ず入力してください。',
                                    validate: v => v === getValues('password') || "passwordと、確認フィールドとが、一致していません。"
                                })}
                            />
                            { errors.password_confirmation && <small className="text-danger">{ errors.password_confirmation.message }</small> }
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
