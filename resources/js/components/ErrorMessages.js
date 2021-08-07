import React from 'react'

import { useError } from '../conexts/errorContext'

const ErrorMessages = ({type = ''}) => {
    const { hasError, userMessages } = useError()

    if (hasError) {
        switch (type) {
            case 'alert':
                return (
                    <div className="alert alert-danger alert-dismissible fade show">
                        {userMessages.map((message, index) => (<div key={index}>{message}</div>))}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
            default:
                return (
                    <ul className="list-inline text-danger">
                        {userMessages.map((message, index) => (<li key={index}>{message}</li>))}
                    </ul>
                )
        }
    } else {
        return null
    }
}

export default ErrorMessages
