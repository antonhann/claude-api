import React from 'react';
import '../styles/Sidebar.css';
import { Chat } from '@interfaces/*';
interface SidebarProps {
    chats: Chat[];
    currentChatId: number | null; 
    handleNewChat: () => void;
    handleChatSelection: (chatId: number) => void;
    handleDeleteChat: (chatId: number) => void;
}
const Sidebar : React.FC<SidebarProps>= ({
    chats,
    currentChatId,
    handleNewChat,
    handleChatSelection,
    handleDeleteChat
}) => {
  return (
    <div className="sidebar">
      <button onClick={handleNewChat}>New Chat</button>
      <div className="chat-list">
        {chats.map(chat => (
          <div
            key={chat.CHAT_ID}
            className={`chat-item ${chat.CHAT_ID === currentChatId ? 'active' : ''}`}
            onClick={() => handleChatSelection(chat.CHAT_ID)}
          >
            <button onClick={() => handleDeleteChat(chat.CHAT_ID)} className = "delete-button">❌</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;