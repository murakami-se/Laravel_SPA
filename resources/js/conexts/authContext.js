import React, { createContext, useContext, useEffect, useState } from 'react'

import AuthService from '../services/authService'
import { useError } from './errorContext'

const AuthContext = createContext({
    isLoggedIn: false,
    user: null,
    handleLogin: () => {},
    handleLogout: () => {},
    handleRegister: () => {},
    handleGetSocialLoginUrl: () => {},
    handleSocialLogin: () => {},
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
        setLoading(true)
        AuthService.login(formData)
            .then(user => setUser(user))
            .catch(error => setContextError(error.message, error))
            .finally(() => setLoading(false))
    }

    const handleGetSocialLoginUrl = (provider) => {
        setLoading(true)
        AuthService.getSocialLoginUrl(provider)
            .then(redirectUrl => window.location.href = redirectUrl)
            .catch(error => setContextError(error.message, error))
    }

    const handleSocialLogin = (provider, queryResponse) => {
        setLoading(true)

        // リダイレクトURLのパラメーターをチェック
        if (Object.prototype.hasOwnProperty.call(queryResponse, 'error')) {
            setContextError('ソーシャルサービスの認可処理でエラーが発生しました。', queryResponse)
            setLoading(false)
        } else {
            AuthService.socialLogin(provider, queryResponse)
                .then(user => setUser(user))
                .catch(error => setContextError(error.message, error))
                .finally(() => setLoading(false))
        }
    }

    const handleLogout = () => {
        AuthService.logout().finally(() => setUser(null))
    }

    const handleRegister = (formData) => {
        setLoading(true)
        AuthService.register(formData)
            .then(user => setUser(user))
            .catch(error => setContextError(error.message, error))
            .finally(() => setLoading(false))
    }

    return (
        <AuthContext.Provider value={{ isLoading, isLoggedIn: !!user, user, handleLogin, handleLogout, handleRegister, handleGetSocialLoginUrl, handleSocialLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    return context
}
