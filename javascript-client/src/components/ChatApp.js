import React, { useEffect, useState } from 'react';
import ChatSidebar from './Sidebar.js';
import ChatWindow from './ChatWindow.js';
import '../styles/ChatApp.css';
import {fetchConvo, fetchHistory} from "../database.js";
const ChatApp = () => {
  
  const [currentConvo, setCurrentConvo] = useState(undefined);
  const [conversations,setConversations] = useState([]);
  const [currentbotModel, setBotModel] = useState(undefined);
  const [currentBotID, setBotID] = useState(undefined);
  const [userID, setUserID] = useState("");
  const [finalUserID, setFinalUserID] = useState(undefined);
  const [loading, setLoading] = useState(true);


  const handleConvoSelection = async (botID, botModel) => {
    const getHistory = async () => {
      const chats = await fetchHistory(botID,finalUserID)
      setCurrentConvo(chats);
      setBotModel(botModel);
      setBotID(botID)
      return
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
      if (finalUserID){
        let conversations = await fetchConvo(finalUserID)
        let putIn = true
        for(let i = 0; i < conversations.length; i++){
          if (conversations[i].BOT_ID === 31){
            putIn = false
          }
        }
        if(putIn){
          conversations.push({BOT_ID : 31}) //to add the default claude bot (bot 31)
        }
        setConversations(conversations);
      }
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
      <ChatWindow 
        currentConvo={currentConvo}
        botID={currentBotID}
        botModel={currentbotModel}
        userID={finalUserID}
        handleConvoSelection={handleConvoSelection}
       />
    </div>
  );
};

export default ChatApp;