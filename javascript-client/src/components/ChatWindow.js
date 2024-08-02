import React, { useState } from 'react';
import '../styles/ChatWindow.css';
// import ButtonUsage from './ButtonUsage.js';

const ChatWindow = ({
  currentConvo,
  sendMessage
 }) => {
  const [messageWindow, setMessageWindow] = useState(5);
  const [message, setMessage] = useState("")

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }


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
        <input 
        type="text" 
        placeholder="Type a message..." 
        value={message}
        onChange={(e) => handleMessageChange(e)}
        />
        <input type="file" id="file-upload" style={{ display: 'none' }} />
        <label htmlFor="file-upload" className="upload-button">📎</label>
        <button 
        className="send-button"
        onClick={() => sendMessage()}
        >Send</button>
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