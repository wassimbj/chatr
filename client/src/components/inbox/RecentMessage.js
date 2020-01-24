import React from 'react'

export default function RecentMessage({ userAvatar, userName, online, date, msg, activeChat}) {
    return (
        <li className={`${activeChat ? 'active-message': ''}`}>
            <a href="#some_link">
                <div className="message-avatar">
                    {
                        online === true
                        ?
                            <i className="status-icon status-online"></i>
                        :
                            <i className="status-icon status-offline"></i>
                    }
                    <img src={`${userAvatar}`} alt="" />
                </div>

                <div className="message-by">
                    <div className="message-by-headline">
                        <h5>{userName}</h5>
                        <span> {date} </span>
                    </div>
                    <p> {msg} </p>
                </div>
            </a>
        </li>
    )
}
