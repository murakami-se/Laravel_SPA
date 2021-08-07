import { UNAUTHORIZED, UNPROCESSABLE_ENTITY } from '../constants/statusCode'

const AuthService = {

    /**
     * ログインリクエスト送信（同期）
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise}           then: userオブジェクト, catch: 表示用のuserMessagesプロパティを持つErrorインスタンス
     */
    async login(email, password) {
        // CSRFトークンを初期化
        await axios.get("/sanctum/csrf-cookie")

        return axios.post('/api/login', {email, password})
            .then(res => res.data.user)
            .catch(error => {
                let messages = []
                switch (error.response.status) {
                    case UNAUTHORIZED:         // 認証エラー
                        messages.push(error.response.data.message)
                        break;
                    case UNPROCESSABLE_ENTITY: // バリデーションエラー
                        _.forEach(error.response.data.errors, itemMessages => messages = messages.concat(itemMessages))
                        break;
                    default:
                        messages.push('予期しないエラーが発生し、ログインに失敗しました。')
                }
                error.userMessages = messages
                throw error
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
