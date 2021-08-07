import React from 'react'

import { useError } from '../conexts/errorContext'

const ErrorAlert = () => {
    const { hasError, userMessage } = useError()

    if (hasError) {
        return (
            <div className="alert alert-danger alert-dismissible fade show">
                {userMessage}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }

    return null
}

export default ErrorAlert
