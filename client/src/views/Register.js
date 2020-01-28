import React, { Component } from 'react'
import { authContext } from '../config/authContext';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import config from '../config/config';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            errorMsg: '',
            firstname: '',
            lastname :'',
            email: '',
            password: '',
        }
    }

    responseFacebook(res) {
        let access_token = res.accessToken;
        fetch(`${config.server_url}/oauth/facebook`, {
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
            .catch(err => console.log(err))
    }

    handleChange = name => e => {
        this.setState({
            [name]: e.target.value
        });
    }

    handleLogin = () => {
        // a simple validation here
        if (!this.state.firstname || !this.state.lastname || !this.state.email || !this.state.password) {
            this.setState({
                isError: true, errorMsg: 'all fields are required'
            });
        } else {

            // everything is okay, send a login request
            fetch('http://localhost:8000/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    password: this.state.password
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.fail)
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
                        if (value.isauth == 'fetching')
                            return 'Loading...';
                        else if (value.isauth === true)
                            return window.location.pathname = '/';
                        else
                            return (
                                <div className='container mx-auto'>
                                    <div className="bg-white shadow-md border-2 border-gray-300 rounded mx-auto w-full lg:w-1/2 md:w-2/3 px-8 pt-6 pb-8 mb-4 flex flex-col mt-20">
                                        <h1 className='text-center font-bold text-2xl mb-10 p-3'> Create an account on Chatr </h1>

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
                                            <label className="block text-grey-darker text-sm font-bold mb-2">firstname</label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                onChange={this.handleChange('firstname')} type="text" placeholder="e.g: joe" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-grey-darker text-sm font-bold mb-2">lastname</label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                onChange={this.handleChange('lastname')} type="text" placeholder="e.g: doe" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-grey-darker text-sm font-bold mb-2">email</label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                                onChange={this.handleChange('email')} type="email" placeholder="email" />
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
