import React, { useEffect, useMemo } from "react"
import { useHistory, useLocation, useParams } from "react-router-dom"
import queryString from 'query-string'
import { useError } from "../conexts/errorContext"
import { useAuth } from "../conexts/authContext"
import Loading from "../components/Loading"

const SocialLoginProgress = () => {
    const { provider } = useParams()
    const history = useHistory()
    const location = useLocation()
    const response = useMemo(
        () => queryString.parse(location.search) ?? {},
        [location.search]
    )
    const { handleSocialLogin } = useAuth()
    const { hasError } = useError()

    useEffect(() => {
        if (hasError) {
            history.push('/login')
            return
        }
        handleSocialLogin(provider, response)
    }, [hasError])

    return <Loading />
}

export default SocialLoginProgress
