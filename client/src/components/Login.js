import React, { Component } from 'react'
import { authContext } from '../config/authContext';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';

import config from '../config/config';

export default class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            isError: false,
            errorMsg: '',
            email: '', password: '',
        }
    }

    responseFacebook(res)
    {
        let access_token = res.accessToken;
        fetch(`${config.server_url}/oauth/facebook`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({access_token})
        })
        .then(res => res.json())
        .then((data) => {
            if (data.fail)
                this.setState({ isError: true, errorMsg: data.msg });
            else
                window.location.pathname = '/';
        })
        .catch(err => console.log(err))
    }

    responseGoogle(res)
    {
        let access_token = res.accessToken;
        fetch(`${config.server_url}/oauth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ access_token })
        })
            .then(res => res.json())
            .then((data) => {
                if (data.fail)
                    this.setState({ isError: true, errorMsg: data.msg });
                else
                    window.location.pathname = '/';
            })
            .catch(err => {
                this.setState({ isError: true, errorMsg: 'Something went wrong...' });
            })
    }

    handleChange = name => e =>
    {
        this.setState({
            [name]: e.target.value  
        });
    }

    handleLogin = () =>
    {
       if(!this.state.email || !this.state.password)
       {
           this.setState({
               isError: true, errorMsg: 'email and password are required'
           });
       }else{
        
        // everything is okay, send a login request
        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.fail)
                this.setState({ isError: true, errorMsg: data.msg })
            else
                window.location.pathname = '/';
        })
        .catch(err => {
            this.setState({ isError: true, errorMsg: 'something went wrong...' })
        })

       }
    }

    render() {
        return (
            <React.Fragment>
                <authContext.Consumer>
                    {(value) => {
                        if(value.isauth)
                            window.location.pathname = '/';
                        else
                            return(
                                <div className='container mx-auto'>
                                    <div className="bg-white shadow-md border-2 border-gray-300 rounded mx-auto w-full lg:w-1/2 md:w-2/3 px-8 pt-6 pb-8 mb-4 flex flex-col mt-20">
                                        <h1 className='text-center font-bold text-2xl mb-10 p-3'> Login to Chatr </h1>

                                        {
                                            this.state.isError ?
                                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5">
                                                    <strong className="font-bold">Oops! </strong>
                                                    <span className="block sm:inline">{this.state.errorMsg}</span>
                                                </div>
                                                :
                                                null
                                        }

                                        <div className="mb-4">
                                            <label className="block text-grey-darker text-sm font-bold mb-2">email</label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                onChange={this.handleChange('email')} type="text" placeholder="email" />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-grey-darker text-sm font-bold mb-2">Password</label>
                                            <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" onChange={this.handleChange('password')} type="password" placeholder="******************" />
                                        </div>
                                        <div className="flex mt-5">
                                            <button onClick={this.handleLogin} className="bg-indigo-500 rounded mx-auto shadow-md p-3 px-10 text-white">
                                                Login in
                                    </button>
                                        </div>
                                        <div className='mx-auto mt-3'>
                                            <span className='p-3 block text-center'> or </span>
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
                                                clientId="37916628313-474vprnvjo0upa92bsfutj6hkdo9gt70.apps.googleusercontent.com"
                                                render={renderProps => (
                                                    <button className="p-3 bg-red-700 text-white rounded" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</button>
                                                )}
                                                onSuccess={this.responseGoogle}
                                                onFailure={this.responseGoogle}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                    }}
                </authContext.Consumer>
            </React.Fragment>
        )
    }
}
