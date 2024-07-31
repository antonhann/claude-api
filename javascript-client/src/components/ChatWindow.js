import React, { useState } from 'react';
import '../styles/ChatWindow.css';

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
              <div
                key={chat.CHAT_ID}
              >
                <div>{chat.CHAT_PROMPT}</div>
                <div>{chat.CHAT_RESPONSE}</div>
              </div>
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

export default ChatWindow;