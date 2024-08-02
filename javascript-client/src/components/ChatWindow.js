import React, { useState } from 'react';
import '../styles/ChatWindow.css';
import ButtonUsage from './ButtonUsage';

const ChatWindow = ({
  currentConvo
 }) => {
  const [messageWindow, setMessageWindow] = useState(5);
  return (
    <div className="chat-window">
      <div className="messages">
        {currentConvo ? 
          //complete display task
          currentConvo.slice(0,messageWindow).map(chat => {
            return(
                <>
                  <MessageBubble
                    message={chat.CHAT_PROMPT}
                    fromUser={true}
                  />
                  <MessageBubble
                    message={chat.CHAT_RESPONSE}
                    fromUser={false}
                  />
                </>
            )
          })
         : (
          <div>Select a chat to view messages</div>
        )}
      </div>
      <div className="chat-bar">
        <input type="text" placeholder="Type a message..." />
        <input type="file" id="file-upload" style={{ display: 'none' }} />
        <label htmlFor="file-upload" className="upload-button">📎</label>
        <button className="send-button">Send</button>
      </div>
    </div>
  );
};

const MessageBubble = ({
  message,
  fromUser
}) => {
  return(
    <div
      className={`message ${fromUser ? "user-message" : "bot-message"}`}
    >{message}</div>
  )
}

export default ChatWindow;