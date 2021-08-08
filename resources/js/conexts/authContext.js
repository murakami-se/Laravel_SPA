import React, { createContext, useContext, useEffect, useState } from 'react'

import AuthService from '../services/authService'
import { useError } from './errorContext'

const AuthContext = createContext({
    isLoggedIn: false,
    user: null,
    handleLogin: () => {},
    handleLogout: () => {},
    handleRegister: () => {}
})

export const AuthProvider = ({ children }) => {
    const { setContextError } = useError()

    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        // 読み込み時ログイン状態チェック
        const checkAuth = () => {
            AuthService.getUserInfo()
                .then(user => setUser(user))
                .catch(() => setUser(null))
                .finally(() => setLoading(false))
        }
        checkAuth()
    }, [])

    const handleLogin = (formData) => {
        AuthService.login(formData)
            .then(user => setUser(user))
            .catch(error => setContextError(error.message, error))
    }

    const handleLogout = () => {
        AuthService.logout().finally(() => setUser(null))
    }

    const handleRegister = (formData) => {
        AuthService.register(formData)
            .then(user => setUser(user))
            .catch(error => setContextError(error.message, error))  
    }

    return (
        <AuthContext.Provider value={{ isLoading, isLoggedIn: !!user, user, handleLogin, handleLogout, handleRegister }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    return context
}
