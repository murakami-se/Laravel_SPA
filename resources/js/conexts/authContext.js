import React, { createContext, useContext, useEffect, useState } from 'react'

import AuthService from '../services/authService'
import { useError } from './errorContext'

const AuthContext = createContext({
    isLoggedIn: false,
    user: null,
    handleLogin: () => {},
    handleLogout: () => {}
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

    const handleLogin = (email, password) => {
        AuthService.login(email, password)
            .then(user => setUser(user))
            .catch(error => setContextError(error.userMessages, error))
    }

    const handleLogout = () => {
        AuthService.logout().finally(() => setUser(null))
    }

    return (
        <AuthContext.Provider value={{ isLoading, isLoggedIn: !!user, user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    return context
}
