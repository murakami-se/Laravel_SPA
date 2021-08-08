import { UNAUTHORIZED, UNPROCESSABLE_ENTITY } from '../constants/statusCode'

const AuthService = {

    /**
     * ログインリクエスト送信（非同期）
     * @param {object} formData     email, password 
     * @returns {Promise}           then: userオブジェクト, catch: Errorインスタンス
     */
    async login(formData) {
        // CSRFトークンを初期化
        await axios.get("/sanctum/csrf-cookie")

        return axios.post('/api/login', formData)
            .then(res => res.data.user)
            .catch(err => {
                switch (err.response.status) {
                    case UNAUTHORIZED:         // 認証エラー
                        err.message = err.response.data.message
                        break
                    case UNPROCESSABLE_ENTITY: // バリデーションエラー
                        err.message = 'ログインできませんでした。'
                        break
                    default:
                        err.message = '予期しないエラーが発生し、ログインに失敗しました。'
                }
                throw err
            })
    },

    /**
     * ソーシャルログインURL取得リクエスト送信（非同期）
     * @param {strint} provider 
     * @returns {Promise}           then: {string} redirect url, catch: Errorインスタンス
     */
    getSocialLoginUrl(provider) {
        return axios.get(`/api/login/${provider}`)
            .then(res => res.data.redirect_url)
            .catch(err => {
                err.message = '予期しないエラーが発生し、ソーシャルログインを実行できませんでした。'
                throw err
            })
    },

    socialLogin(provider, { code, state }) {
        return axios.post(`/api/login/${provider}/callback`, { code, state })
            .then(res => res.data)
            .catch(err => {
                err.message = '予期しないエラーが発生し、ソーシャルログインできませんでした。'
                throw err
            })
    },

    /**
     * ログアウトリクエスト送信（非同期）
     * @returns {Promise}
     */
    logout() {
        return axios.post('/api/logout')
    },

    /**
     * ログイン中のユーザー情報取得リクエスト送信（非同期）
     * @returns {Promise}   then: userオブジェクト, catch: Errorインスタンス
     */
    getUserInfo() {
        return axios.get('/api/user').then(res => res.data)
    },

    /**
     * ユーザー登録リクエスト送信（非同期）
     * @param {object} formData     email, password 
     * @returns {Promise}           then: userオブジェクト, catch: Errorインスタンス
     */
    async register(formData) {
        // CSRFトークンを初期化
        await axios.get("/sanctum/csrf-cookie")

        return axios.post('/api/register', formData)
            .then(res => res.data)
            .catch(err => {
                console.log(err.response)
                switch (err.response.status) {
                    case UNAUTHORIZED:         // 認証エラー
                        err.message = err.response.data.message
                        break
                    case UNPROCESSABLE_ENTITY: // バリデーションエラー
                        err.message = 'ユーザー登録できませんでした。'
                        break
                    default:
                        err.message = '予期しないエラーが発生し、ユーザー登録に失敗しました。'
                }
                throw err
            })
    },
}

export default AuthService
