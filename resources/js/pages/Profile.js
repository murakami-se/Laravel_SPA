import React, { useContext } from 'react'
import { useAuthState } from '../providers/authProvider'

const Profile = () => {
    const { user } = useAuthState()

    return (
        <div className="container">
            <h2>My Profile</h2>
            <div className="card">
                <div className="card-body">
                    <dl className="row">
                        <dt className="col-2">ユーザー名</dt>
                        <dd className="col-10">{user.name}</dd>
                        <dt className="col-2">メールアドレス</dt>
                        <dd className="col-10">{user.email}</dd>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default Profile
