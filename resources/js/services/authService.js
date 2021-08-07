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
                        err.message = 'ログインに失敗しました。'
                        break
                    default:
                        err.message = '予期しないエラーが発生し、ログインに失敗しました。'
                }
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
    }
}

export default AuthService
