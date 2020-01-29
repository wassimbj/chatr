import React, { Component } from 'react';
import UserTochatWith from '../components/home/UserTochatWith';
import { authContext } from '../config/authContext';
import config from '../config/config';

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
        this.setState({users: 'fetching'})
        fetch(`${config.server_url}`, {
            method: 'GET',
            headers: {'Content-type': 'application/json'},
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ users: data.users, usersOnline: data.onlineUsers });
        })
        .catch(err => console.log('GET_USERS_ERROR: ', err))

    }

    componentWillUnmount()
    {
        this.socket = null;
    }

    render() {
        return (
            <React.Fragment>
                <authContext.Consumer>
                    {(value) => {
                        return(
                            <div className='container mt-5 mx-auto'>
                                <div className='text-center p-5 mb-5 bg-purple-600'>
                                    <h1 className='text-gray-200 block text-2xl mb-3'>
                                        Welcome to chatr,
                                        {
                                            value.isauth == true ?
                                                <b> {value.name.firstname} {value.name.lastname} </b>
                                                : null
                                        }
                                    </h1>
                                    {
                                        value.isauth == 'fetching'
                                            ? // if
                                            'Loading...'
                                            : value.isauth ? // else if
                                                <button onClick={this.handleLogout} className='p-2 rounded-full bg-red-600 font-semibold text-white'> Logout </button>
                                                : // else
                                                <div>
                                                    <a href='/join' className='p-2 rounded-full bg-green-600 m-2 text-white font-semibold'> Join </a>
                                                    <a href='/login' className='p-2 rounded-full bg-gray-700 m-2 text-white font-semibold'> Login </a>
                                                </div>
                                    }
                                </div>
                                
                                <div id="container" class="w-4/5 mx-auto">
                                    <div className='my-10'>
                                        <h1 className='font-bold text-lg'> Start chatting now ! </h1>
                                        <p className='p-2 text-gray-700'> Choose a user to start chatting with </p>
                                    </div>
                                    <div class="flex flex-col sm:flex-row">
                                    {
                                        this.state.users == 'fetching'
                                        ?
                                            'Loading...'
                                        : this.state.users.length == 0 ?
                                            <p className='p-3 bg-gray-300 text-center'> No users registered yet... </p>
                                        :
                                            this.state.users.map((user, i) => {
                                                return (
                                                    <UserTochatWith
                                                        key={i}
                                                        name={user.name.firstname + ' ' + user.name.lastname}
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
