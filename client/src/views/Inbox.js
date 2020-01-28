import React, { Component } from 'react'
import io from 'socket.io-client';

import { authContext } from '../config/authContext';
import config from '../config/config';
// import RecentMessage from '../components/inbox/RecentMessage';
import FromMsg from '../components/inbox/FromMsg';
import ToMsg from '../components/inbox/ToMsg';
// import TypingMsg from '../components/inbox/TypingMsg';

export default class Inbox extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            message: '',
            messages_between_users: [],
            chatwith_userid: this.props.match.params.chatwith,
            chatwith_username: ''
        }

        this.socket = this.props.io;
    }
    
    componentDidMount()
    {
        this.socket.on('new_message', (msg) => {
            console.log('new message', msg)
            this.setState({
                messages_between_users: [...this.state.messages_between_users, ...msg]
            })
        });
        
        // disconnect socket
        this.socket.on('disconnect', () => {
            console.log('Client is Disconnected to the server')
        });

        // Get the messages between those two users
        fetch(`${config.server_url}/messages/messages_between_users/${this.state.chatwith_userid}`, {
            method: 'GET',
            headers: { "Content-type": "application/json" },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                // console.log('messages_between_users: ', data)
               this.setState({ messages_between_users: data })
            })
            .catch(err => {
                console.log('messages_between_users_ERROR', err)
            });
        
        // Get the user that im chatting with right now
        fetch(`${config.server_url}/messages/get_user_chatting_with/${this.state.chatwith_userid}`, {
            method: 'GET',
            header: {"Content-type": 'application/json'},
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({chatwith_username: data.name})
            })
            .catch(err => {
                // user is not authenticated cause we cant grab the
                window.location.pathname = '/login';
                console.log('GET_CHATTING_WITH_USERNAME_ERROR: ', err);
            })
    }

    componentWillUnmount() {
        this.socket = null;
    }
    
    handleChange = e =>
    {
        this.setState({message: e.target.value});
    }
    
    // when user send a message we will join both of the users to the rooms
    sendMessage = () =>
    {
        // Join the two users in a room (two rooms actually)
        this.socket.emit('join_room', this.state.chatwith_userid);

        console.log('Sending message...')
        fetch(`${config.server_url}/messages/store`, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({
                to: this.state.chatwith_userid,
                msg: this.state.message
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log('Message sent...')
            console.log(data)
            document.getElementById('message_field').value = '';
        })
        .catch(err => {
            console.log('messages_between_users_ERROR', err)
        })
    }

    render()
    {
        return (
            <React.Fragment>
                <authContext.Consumer>
                    {(value) => {
                        console.log(value)
                        if(value.isauth == 'fetching')
                            return 'Loading...';
                        else if(value.isauth === false)
                            return window.location.pathname = '/login';
                        else
                            return (
                                <div className='container mx-auto my-5'>
                                    <div className="messages-container border-2">

                                        <div className="messages-container-inner">

                                            {/* <!-- Message Content --> */}
                                            <div className="message-content">

                                                <div className="messages-headline">
                                                    <h4> 
                                                        {
                                                            this.state.chatwith_username.firstname
                                                            +' '+
                                                            this.state.chatwith_username.lastname
                                                        }
                                                    </h4>
                                                    {/* <a href="#some_link" className="message-action"><i className="fas fa-trash"></i> Delete Conversation</a> */}
                                                </div>

                                                {/* <!-- Message Content Inner --> */}
                                                <div className="message-content-inner">
                                                    {
                                                        this.state.messages_between_users.length == 0
                                                        ?
                                                            <h1> Send the first message... </h1>
                                                        :
                                                            this.state.messages_between_users.map(msg => {
                                                                return (
                                                                    msg.from._id == value.userid
                                                                    ?
                                                                        <FromMsg
                                                                            userAvatar={msg.from.image}
                                                                            msg={msg.msg}
                                                                        />
                                                                    :
                                                                        <ToMsg
                                                                            userAvatar={msg.to.image}
                                                                            msg={msg.msg}
                                                                        />

                                                                )
                                                            })
                                                    }
                                                    
                                                    {/* <TypingMsg
                                                        userAvatar='/images/user-02.jpg'
                                                    /> */}

                                                </div>
                                                {/* <!-- Message Content Inner / End --> */}

                                                {/* <!-- Reply Area --> */}
                                                <div className="message-reply">
                                                    <textarea id='message_field' cols="1" rows="1" placeholder="Your Message..."
                                                    onChange={this.handleChange}></textarea>

                                                    <button className="text-white bg-indigo-700 font-semibold p-3 shadow"
                                                    onClick={this.sendMessage}> Send </button>
                                                </div>

                                            </div>
                                            {/* <!-- Message Content --> */}

                                        </div>
                                    </div>
                                </div>
                            );
                    }}
                </authContext.Consumer>
            </React.Fragment>
        );
    }
}
