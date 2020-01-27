import React, { Component } from 'react';
import UserTochatWith from '../components/home/UserTochatWith';
import { authContext } from '../config/authContext';
import config from '../config/config';
import io from 'socket.io-client';

export default class Home extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            users: [],
            usersOnline: []
        }
    }

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

    componentDidMount()
    {
        // get users
        fetch(`${config.server_url}`, {
            method: 'GET',
            headers: {'Content-type': 'application/json'},
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ users: data.users, usersOnline: data.onlineUsers })
        })
        .catch(err => console.log('GET_USERS_ERROR: ', err))
    }

    render() {
        return (
            <React.Fragment>
                <authContext.Consumer>
                    {(value) => {
                        return(
                            <div className='container mt-5 mx-auto'>
                                <h1 className='font-bold p-5 mb-5'> Welcome to chatr </h1>
                                
                               {
                                    value.isauth ?
                                        <button onClick={this.handleLogout} className='p-5 m-5 rounded-full bg-red-600'> Logout </button>
                                    : 
                                    <div>
                                        <a href='/join' className='p-5 m-5 rounded-full bg-blue-600'> Join </a>
                                        <a href='/login' className='p-5 m-5 rounded-full bg-indigo-600'> Login </a>
                                    </div>
                               }
                                <div id="container" class="w-4/5 mx-auto">
                                    <div className='my-10'>
                                        <h1 className='font-bold text-lg'> Start chatting now ! </h1>
                                        <p className='p-2 text-gray-700'> Choose a user to start chatting with </p>
                                    </div>
                                    <div class="flex flex-col sm:flex-row">
                                    {
                                        this.state.users.map((user, i) => {
                                            return (
                                                <UserTochatWith
                                                    key={i}
                                                    name={user.name.firstname +' '+ user.name.lastname}
                                                    image={user.image}
                                                    chatwith={user._id}
                                                    userIsOnline={this.state.usersOnline.indexOf(`user:${user._id}`) !== -1}
                                                />
                                            );
                                        })
                                    }
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </authContext.Consumer>
            </React.Fragment>
        )
    }
}
