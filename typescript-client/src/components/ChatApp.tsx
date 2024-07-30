import { useState } from 'react';
import ChatSidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import '../styles/ChatApp.css';
import {Chat} from "../../interface"

const ChatApp = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<number>(-1);

  const handleNewChat = async () => {
  };

  const handleChatSelection = (id : number) => {
    setCurrentChatId(id);
  };

  const handleDeleteChat = (id : number) => {
    setChats(chats.filter(chat => chat.CHAT_ID !== id));
    if(currentChatId === id){
        setCurrentChatId(-1);
    }
  }

  const currentChat = chats.find(chat => chat.CHAT_ID === currentChatId);

  return (
    <div className="chat-app">
      <ChatSidebar
        chats={chats}
        currentChatId={currentChatId}
        handleNewChat={handleNewChat}
        handleChatSelection={handleChatSelection}
        handleDeleteChat={handleDeleteChat}
      />
      <ChatWindow currentChat={currentChat} />
    </div>
  );
};

export default ChatApp;