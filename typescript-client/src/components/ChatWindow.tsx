import React from 'react';
import '../styles/ChatWindow.css';
import { Chat, Conversation } from '../../interface';

interface ChatWindowProps{
    currentChat : Conversation | undefined,
}

const ChatWindow : React.FC<ChatWindowProps> = ({ currentChat } ) => {
  return (
    <div className="chat-window">
      <div className="messages">
        {currentChat ? (
          //complete later for current chat
          <div>There is a chat</div>
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