import React, { Component } from 'react'
import io from 'socket.io-client';

import {authContext} from '../config/authContext';
import config from '../config/config';
import RecentMessage from './inbox/RecentMessage';
import FromMsg from './inbox/FromMsg';
import ToMsg from './inbox/ToMsg';
import TypingMsg from './inbox/TypingMsg';

export default class Inbox extends Component {

    componentDidMount()
    {
        let socket = io(`${config.server_url}`)
    
        socket.on('connect', () => console.log('Client is Connected to the server'));
        socket.on('disconnect', () => console.log('Client is Disconnected to the server'));
    }

    render() {
        return (
            <React.Fragment>
            <authContext.Consumer>
                {(value) => {
                    if(value.isauth === false)
                        return window.location.pathname = '/login';
                    else
                        return(
                            <div className='container mx-auto my-5'>
                                <div className="messages-container border-2">

                                    <div className="messages-container-inner">

                                        {/* <!-- Recent Messages --> */}
                                        <div className="messages-inbox">
                                            <div className="messages-headline">
                                                You
                                            </div>

                                            <ul>
                                                <RecentMessage
                                                    userAvatar='/images/user-01.jpg'
                                                    userName='Wilbert Lindgren'
                                                    online
                                                    date='4 Hours ago'
                                                    msg='Enim vel placeat repudiandae aut vero debitis esse. Quia molestiae repellat.'
                                                />

                                                <RecentMessage
                                                    userAvatar='/images/user-03.jpg'
                                                    userName='Mikel Mohr'
                                                    date='4 Hours ago'
                                                    msg='Enim vel placeat repudiandae aut vero debitis esse. Quia molestiae repellat.'
                                                />

                                            </ul>
                                        </div>
                                        {/* <!-- Recent Messages / End --> */}

                                        {/* <!-- Message Content --> */}
                                        <div className="message-content">

                                            <div className="messages-headline">
                                                <h4> Chatting with NAME </h4>
                                                {/* <a href="#some_link" className="message-action"><i className="fas fa-trash"></i> Delete Conversation</a> */}
                                            </div>

                                            {/* <!-- Message Content Inner --> */}
                                            <div className="message-content-inner">
                                                <FromMsg
                                                    userAvatar='/images/user-04.jpg'
                                                    msg='Hey man !'
                                                />

                                                <ToMsg
                                                    userAvatar='/images/user-02.jpg'
                                                    msg='Hey ! whats up ?'
                                                />

                                                <FromMsg
                                                    userAvatar='/images/user-04.jpg'
                                                    msg='Illo quia ipsa quam. Quia officiis inventore et id alias quas consectetur vitae.'
                                                />

                                                <TypingMsg
                                                    userAvatar='/images/user-02.jpg'
                                                />

                                            </div>
                                            {/* <!-- Message Content Inner / End --> */}

                                            {/* <!-- Reply Area --> */}
                                            <div className="message-reply">
                                                <textarea cols="1" rows="1" placeholder="Your Message..."></textarea>
                                                <button className="text-white bg-indigo-700 font-semibold p-3 rounded"> Send </button>
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
