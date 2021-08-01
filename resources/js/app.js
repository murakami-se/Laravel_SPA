require('./bootstrap')

import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, useHistory, Route } from "react-router-dom"

import { AuthProvider } from "./providers/authProvider"
import Routes from "./routes"
import NavBar from "./components/NavBar"

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <NavBar />
                <Routes />
            </BrowserRouter>
        </AuthProvider>
    )
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"))
}
