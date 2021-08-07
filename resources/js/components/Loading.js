import React from "react"
import ReactLoading from 'react-loading'

const Loading = () => (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <ReactLoading type="spinningBubbles" />
    </div>
)

export default Loading
