import React, { Component } from 'react'
import { authContext } from '../config/authContext';
import config from '../config/config';

export default class Home extends Component {

    handleLogout()
    {
        fetch(`${config.server_url}/logout`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.fail == false)
                {
                    console.log('Loged out !', data);
                    window.location.pathname = '/login';
                }else
                    alert('Error logging out')
            })
            .catch(err => console.log('LOGOUT_ERROR: ', err))
    }

    render() {
        return (
            <React.Fragment>
                <authContext.Consumer>
                    {(value) => {
                        return(
                            <div className='container mt-5 mx-auto'>
                                <h1 className='font-bold p-5 mb-5'> Welcome to chatr </h1>
                                <a href='/join' className='p-5 m-5 rounded-full bg-blue-600'> Join </a>
                                <a href='/login' className='p-5 m-5 rounded-full bg-indigo-600'> Login </a>
                               {
                                    value.isauth ?
                                        <button onClick={this.handleLogout} className='p-5 m-5 rounded-full bg-red-600'> Logout </button>
                                    : null
                               }
                            </div>
                        )
                    }}
                </authContext.Consumer>
            </React.Fragment>
        )
    }
}
