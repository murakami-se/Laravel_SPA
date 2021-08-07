import React, { createContext, useContext, useState}  from "react"

const ErrorContext = createContext({
    hasError: false,
    userMessages: null,
    error: null,
    setContextError: () => {},
    setContextErrorDone: () => {},
})

export const ErrorProvider = props => {
    const [hasError, setHasError] = useState(false)
    const [userMessages, setuserMessages] = useState(null)
    const [error, setError] = useState(null)

    const setContextError = (userMessages, error) => {
        setuserMessages(userMessages)
        setError(error)
        setHasError(true)
    }

    const setContextErrorDone = () => {
        setuserMessages(null)
        setError(null)
        setHasError(false)
    }

    return (
        <ErrorContext.Provider
            value={{hasError, userMessages, error, setContextError, setContextErrorDone}}
            {...props}
        />
    )
}

export const useError = () => {
    const context = useContext(ErrorContext)

    return context
}
