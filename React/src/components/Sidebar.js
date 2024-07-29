import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ chats, currentChatId, handleNewChat, handleChatSelection, handleDeleteChat }) => {
  return (
    <div className="sidebar">
      <button onClick={handleNewChat}>New Chat</button>
      <div className="chat-list">
        {chats.map(chat => (
          <div
            key={chat.id}
            className={`chat-item ${chat.id === currentChatId ? 'active' : ''}`}
            onClick={() => handleChatSelection(chat.id)}
          >
            {chat.name}
            <button onClick={() => handleDeleteChat(chat.id)} className = "delete-button">❌</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;