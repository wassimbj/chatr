import React from 'react'

export default function FromMsg({ userAvatar, msg }) {
    return (
        <div class="message-bubble">
            <div class="message-bubble-inner">
                <div class="message-avatar">
                    <img src={`${userAvatar}`} alt="" />
                </div>
                <div class="message-text">
                    <p> {msg} </p>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
    )
}
