import { useState } from 'react';
import ChatSidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import '../styles/ChatApp.css';
import {Chat, Conversation} from "../../interface"

const ChatApp = () => {
  const [currentConvo, setCurrentConvo] = useState<Conversation | undefined>(undefined);

  const handleChatSelection = (currentConvo : Conversation) => {
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