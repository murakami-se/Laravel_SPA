import React, { createContext, useContext, useState}  from "react"

const ErrorContext = createContext({
    hasError: false,
    userMessage: null,
    error: null,
    setContextError: () => {},
    setContextErrorDone: () => {},
})

export const ErrorProvider = props => {
    const [hasError, setHasError] = useState(false)
    const [userMessage, setuserMessage] = useState(null)
    const [error, setError] = useState(null)

    const setContextError = (userMessage, error) => {
        setuserMessage(userMessage)
        setError(error)
        setHasError(true)
    }

    const setContextErrorDone = () => {
        setuserMessage(null)
        setError(null)
        setHasError(false)
    }

    return (
        <ErrorContext.Provider
            value={{hasError, userMessage, error, setContextError, setContextErrorDone}}
            {...props}
        />
    )
}

export const useError = () => {
    const context = useContext(ErrorContext)

    return context
}
