import React from 'react'

const Profile = () => {
    const user = {name: '', email: ''}

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
                    <button type="button" className="btn btn-dark">Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
