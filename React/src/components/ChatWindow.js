import React from 'react';
import '../styles/ChatWindow.css';

const ChatWindow = ({ currentChat }) => {
  return (
    <div className="chat-window">
      <div className="messages">
        {currentChat ? (
          currentChat.messages.map((msg, index) => (
            <div key={index} className="message">
              {msg}
            </div>
          ))
        ) : (
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