import React from 'react'

export default function TypingMsg({userAvatar}) {
    return (
        <div class="message-bubble">
            <div class="message-bubble-inner">
                <div class="message-avatar"><img src={`${userAvatar}`} alt="" /></div>
                <div class="message-text">
                    {/* <!-- Typing Indicator --> */}
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
    )
}
