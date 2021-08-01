import React, { createContext, useContext, useReducer, useEffect } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import AuthService from '../services/authService'

// context
// =================

const AuthState = createContext()
const useAuthState = () => {
    const context = useContext(AuthState)

    if (context === undefined) {
        throw new Error('useAuthState must be used within a AuthProvider')
    }

    return context
}

const AuthDispatch = createContext()
const useAuthDispatch = () => {
    const context = useContext(AuthDispatch)

    if (context === undefined) {
        throw new Error('useAuthDispatch must be used within a AuthProvider')
    }

    return context
}

// reduser
// =================

const EVENT_TYPES = {
    CHECK_AUTH: 'check_auth',
    LOGIN_SUCCESS: 'login_success',
    LOGIN_ERROR: 'login_error',
    LOGOUT: 'logout',
    CLEAR_ERRORS: 'clear_errors',
    ERROR: 'error'
}

const AuthReducer = (state, action) => {
    switch (action.type) {
        case EVENT_TYPES.CHECK_AUTH:
            return { ...state, isLoading: false, isLoggedIn: action.isLoggedIn, user: action.user }
        case EVENT_TYPES.LOGIN_SUCCESS:
            return { ...state, user: action.user, isLoggedIn: true}
        case EVENT_TYPES.LOGIN_ERROR:
            return { ...state, isLoggedIn: false, error: action.error }
        case EVENT_TYPES.LOGOUT:
            return { ...INITIAL_STATE, isLoading: false }
        case EVENT_TYPES.CLEAR_ERRORS:
            return { ...state, error: '' }
        case EVENT_TYPES.ERROR:
            return { ...state, error: action.error }
        default:
            return state
    }
}

// component
// =================

const INITIAL_STATE = {
    isLoading: true,
    isLoggedIn: false,
    user: {},
    error: ''
}

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(() => {
        checkAuth()
    }, [])

    async function checkAuth() {
        const user = await AuthService.getUserInfo()
        if (user) {
            console.log('ログイン中')
            dispatch({ type: EVENT_TYPES.CHECK_AUTH, user, isLoggedIn: true })
        } else {
            console.log('未ログイン')
            dispatch({ type: EVENT_TYPES.CHECK_AUTH, user: {}, isLoggedIn: false })
        }
    }

    if (state.isLoading) {
        return (
            <LoadingSpinner />
        )
    }

    const actions = {

        handleLogin(email, password) {
            AuthService.login(email, password)
                .then(data => {
                    if (data.status === 200) {
                        console.log('ログイン成功')
                        dispatch({ type: EVENT_TYPES.LOGIN_SUCCESS, user: data.user })
                    } else {
                        throw Error(data.message)
                    }
                })
                .catch(err => {
                    console.log('ログイン失敗')
                    dispatch({ type: EVENT_TYPES.LOGIN_ERROR, error: err.message})
                })
        },

        onLogout() {
            AuthService.logout().then(() => {
                dispatch({ type: EVENT_TYPES.LOGOUT })
                console.log('ログアウト')
            })
        },

        onClearErrors() {
            dispatch({ type: EVENT_TYPES.CLEAR_ERRORS })
        }
    }
    
    return (
        <AuthState.Provider value={state}>
            <AuthDispatch.Provider value={actions}>
                {children}
            </AuthDispatch.Provider>
        </AuthState.Provider>
    )
}

export { AuthProvider, useAuthState, useAuthDispatch }
