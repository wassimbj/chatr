import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';

export default class Login extends Component {

    responseFacebook(res)
    {
        let access_token = res.accessToken;
        fetch('http://localhost:8000/oauth/facebook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({access_token})
        })
        .then(res => res.json())
        .then((data) => console.log(data))
        .catch(err => console.log(err))
    }

    responseGoogle(res)
    {
        let access_token = res.accessToken;
        fetch('http://localhost:8000/oauth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ access_token })
        })
            .then(res => res.json())
            .then((data) => console.log(data))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <React.Fragment>
                <div className='container mx-auto'>
                    <div className="bg-white shadow-md border-4 border-gray-300 rounded px-8 pt-6 pb-8 mb-4 flex flex-col mt-20">
                        <h1 className='text-center font-bold text-2xl mb-5 p-3'> Login to Chatr </h1>
                        <div class="mb-4">
                            <label class="block text-grey-darker text-sm font-bold mb-2">
                                Username
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-grey-darker text-sm font-bold mb-2">
                                Password
                            </label>
                            <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" />
                        </div>
                        <div className="flex mt-5">
                            <button className="bg-indigo-500 rounded mx-auto shadow-md p-3 px-10 text-white">
                                Login in
                            </button>
                        </div>
                        <span className='p-3'> or </span>
                        <div>
                            <FacebookLogin
                                appId="1545113332307583"
                                render={renderProps => (
                                    <button style={{ marginRight: 15 }} 
                                        className="bg-blue-800 text-white p-3 rounded" onClick={renderProps.onClick}>
                                        Facebook
                                    </button>
                                )}
                                fields="name,email,picture"
                                callback={this.responseFacebook}
                            />
                            <GoogleLogin
                                clientId="37916628313-lpqs8vr5ibu2rp6njh81ojs7lo17d2gb.apps.googleusercontent.com"
                                render={renderProps => (
                                    <button className="p-3 bg-red-700 text-white rounded" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</button>
                                )}
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
