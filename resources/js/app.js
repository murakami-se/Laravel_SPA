require('./bootstrap')

import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/pages/Home"
import Example from "./components/pages/Example"

const App = () => (
    <>
        <BrowserRouter>
            <Switch>
                <Route path="/example" component={Example} />
                <Route exact path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    </>
)

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
