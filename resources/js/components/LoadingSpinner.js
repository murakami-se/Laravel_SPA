import React from "react"

const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <div className="spinner-border text-light" role="status" style={{width: "3rem", height: "3rem"}}>
            <span className="sr-only">Loading...</span>
        </div>
    </div>
)

export default LoadingSpinner
