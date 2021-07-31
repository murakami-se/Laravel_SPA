require('./bootstrap')

import React from "react"
import ReactDOM from "react-dom"

import Example from "./components/Example"

const App = () => (
    <>
        <Example />
    </>
)

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
