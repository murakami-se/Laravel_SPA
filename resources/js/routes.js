import React, { useEffect } from "react"
import { Switch, useHistory, Route, Redirect } from "react-router-dom"

import { useAuthState, useAuthDispatch } from "./providers/authProvider"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import Profile from "./pages/Profile"

const Routes = () => {
    const { onClearErrors } = useAuthDispatch()
    const { isLoggedIn, error } = useAuthState()

    const history = useHistory()

    useEffect(() => {
        const unlisten = history.listen(() => {
            error && onClearErrors();
        })

        return () => unlisten();
    }, [error])

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route
                path="/login"
                render={() =>
                    isLoggedIn ? <Redirect to="/profile" /> : <Login />
                }
            />
            <PrivateRoute path="/profile" redirectTo="/login">
                <Profile />
            </PrivateRoute>
        </Switch>
    )
}

export default Routes
