require('./bootstrap')

import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, useHistory, Route, Redirect } from "react-router-dom"

import { ErrorProvider, useError } from "./conexts/errorContext"
import { AuthProvider, useAuth } from "./conexts/authContext"

import Loading from "./components/Loading"
import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"

const UnAuthRoute = ({children, redirectTo, ...rest}) => {
    const { isLoggedIn } = useAuth()
    return (
        <Route
            {...rest}
            render={() =>
                isLoggedIn ? <Redirect to={redirectTo} /> : children
            }
        />
    )
}

const AuthRoute = ({children, redirectTo, ...rest}) => {
    const { isLoggedIn } = useAuth()
    return (
        <Route
            {...rest}
            render={() =>
                isLoggedIn ? children : <Redirect to={redirectTo} />
            }
        />
    )
}

const App = () => {
    const { isLoading } = useAuth()
    const { hasError, setContextErrorDone } = useError()
    const history = useHistory()

    useEffect(() => {
        // ページ遷移時にエラーが残っている場合クリア
        const unlisten = history.listen(() => {
            hasError && setContextErrorDone()
        })
        return () => unlisten()
    }, [hasError])

    if (isLoading) {
        return <Loading />
    }

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <UnAuthRoute path="/login" redirectTo="/profile">
                <Login />
            </UnAuthRoute>
            <UnAuthRoute path="/register" redirectTo="/profile">
                <Register />
            </UnAuthRoute>
            <AuthRoute path="/profile" redirectTo="/login">
                <Profile />
            </AuthRoute>
        </Switch>
    )
}

if (document.getElementById("app")) {
    ReactDOM.render(
        <Router>
            <ErrorProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </ErrorProvider>
        </Router>
        , document.getElementById("app")
    )
}
