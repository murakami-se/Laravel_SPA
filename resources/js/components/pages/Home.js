import React from 'react';

import Header from "../organisms/Header"

function Home() {
    return (
        <>
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Home Component</div>

                            <div className="card-body">I'm an Home component!</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
