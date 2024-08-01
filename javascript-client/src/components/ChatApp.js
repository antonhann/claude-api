import React, { useEffect, useState } from 'react';
import ChatSidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import '../styles/ChatApp.css';
import {fetchConvo, fetchHistory} from "../database";
const ChatApp = () => {
  const [currentConvo, setCurrentConvo] = useState(undefined);
  const [conversations,setConversations] = useState([]);
  const [userID, setUserID] = useState("");
  const [finalUserID, setFinalUserID] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const handleConvoSelection = (botID) => {
    const getHistory = async () => {
      const chats = await fetchHistory(botID,finalUserID)
      setCurrentConvo(chats);
      return chats;
    }
    getHistory();
  };
  const handleUserIDChange = (e) => {
    setUserID(e.target.value)
  }
  const handleUserIDKeyDown = (e) => {
    if(e.key === "Enter"){
      setFinalUserID(userID)
    }
  }
  useEffect(() =>{
    setLoading(true)
    const getConvo = async () =>{ 
      let conversations = await fetchConvo(finalUserID)
      setConversations(conversations);
    }
    getConvo();
    setLoading(false)
  },[finalUserID])
  if(loading){
    return <div>Loading...</div>
  }
  return (
    <div className="chat-app">
      <ChatSidebar
        handleConvoSelection={handleConvoSelection}
        conversations = {conversations}
        userID = {userID}
        handleUserIDChange = {handleUserIDChange}
        currentConvo = {currentConvo}
        handleUserIDKeyDown = {handleUserIDKeyDown}
      />
      <ChatWindow currentConvo={currentConvo} />
    </div>
  );
};

export default ChatApp;