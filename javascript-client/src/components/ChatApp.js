import React, { useState } from 'react';
import ChatSidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import '../styles/ChatApp.css';

const ChatApp = () => {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const handleNewChat = async () => {
    try{
        const response = await fetch('/create-chat', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const newChat = {
            id: Date.now(),
            name: `Chat ${chats.length + 1}`,
            messages: [data]
        };
        setChats([...chats, newChat]);
        setCurrentChatId(newChat.id);
    }
    catch(error){
        console.error('Error creating new chat', error);
    }
  };

  const handleChatSelection = (id) => {
    setCurrentChatId(id);
  };

  const handleDeleteChat = (id) => {
    setChats(chats.filter(chat => chat.id !== id));
    if(currentChatId === id){
        setCurrentChatId(null);
    }
  }

  const currentChat = chats.find(chat => chat.id === currentChatId);

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