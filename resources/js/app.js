require('./bootstrap')

import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import About from "./pages/About"

const App = () => (
    <>
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path="/about" component={About} />
                <Route exact path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    </>
)

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"))
}
