import React, { useState } from 'react';
import ChatSidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import '../styles/ChatApp.css';

const ChatApp = () => {
  const [currentConvo, setCurrentConvo] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(89);
  const handleChatSelection = (currentConvo) => {
    setCurrentConvo(currentConvo);
  };

  return (
    <div className="chat-app">
      <ChatSidebar
        handleChatSelection={handleChatSelection}
        currentConvo = {currentConvo}
      />
      <ChatWindow currentChat={currentConvo} />
    </div>
  );
};

export default ChatApp;