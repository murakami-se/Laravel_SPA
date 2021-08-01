import axios from 'axios'
import validateEmail from '../utils/validateEmail'

const AuthService = {

    _validateStringField(value, field) {
        if (typeof value !== 'string' || !value.trim().length)
            throw Error(`${field} を入力してください`)
    },

    _validateEmail(email, field = 'email') {
        if (!validateEmail(email))
            throw Error(`${field} を正しく入力してください`)
    },

    async login(email, password) {
        this._validateEmail(email)
        this._validateStringField('password', password)
        
        await axios.get("/sanctum/csrf-cookie")  // ログイン時にCSRFトークンを初期化
        const { data } = await axios.post('/api/login', {email, password})
            .catch(err => {
                console.log('[authService.login] error')
                throw Error('予期しないエラーが発生し、ログインに失敗しました。')
            })

        return data
    },
    
    logout() {
        return Promise.resolve().then(() => {
            axios.post('/api/logout')
            return true
        })
    },

    async getUserInfo() {
        const { data } = await axios.get('/api/user').catch(err => false)
        return data || false
    }
}

export default AuthService
