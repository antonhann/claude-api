import React, { useEffect, useState } from 'react';
import ChatSidebar from './Sidebar.js';
import ChatWindow from './ChatWindow.js';
import '../styles/ChatApp.css';
import {fetchConvo, fetchHistory, updateMessage} from "../database.js";
const ChatApp = () => {
  
  const [currentConvo, setCurrentConvo] = useState(undefined);
  const [conversations,setConversations] = useState([]);
  const [botID, setBotID] = useState(undefined);
  const [userID, setUserID] = useState("");
  const [finalUserID, setFinalUserID] = useState(undefined);
  const [loading, setLoading] = useState(true);


  const handleConvoSelection = async (botID) => {
    const getHistory = async () => {
      const chats = await fetchHistory(botID,finalUserID)
      console.log(chats)
      setCurrentConvo(chats);
      setBotID(botID);
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
  
  // const sendMessage = async (message) => {
  //   if (botID !== 31){
  //     return
  //   }
  //   const update = async () => {
  //     try{
  //       console.log(message)
  //       const response = await fetch("http://localhost:5000/api/send-message", {
  //         method: "POST",
  //           headers: {
  //               'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify({
  //             userID: finalUserID,
  //             convo: currentConvo,
  //             message: message
  //           })
  //       })
  //       if (!response.ok) {
  //         const errorText = await response.text();
  //         console.error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
  //         throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
  //       }
  //       const responseData = await response.json();
  //       console.log('Response data:', responseData);
  //       return responseData
  //     }
  //     catch(error){
  //       console.error("error updating conversation to the database", error)
  //     }
  //   }
  //   try {
  //     const responseData = await update();
  //     console.log(responseData)
  //     if (responseData) {
  //       handleConvoSelection(botID); // Call handleConvoSelection only after update is complete
  //     }
  //   } catch (error) {
  //     console.error("Error in sendMessage function", error);
  //   }
  // }


  useEffect(() =>{
    setLoading(true)
    const getConvo = async () =>{ 
      if (finalUserID){
        let conversations = await fetchConvo(finalUserID)
        console.log(conversations)
        let putIn = true
        for(let i = 0; i < conversations.length; i++){
          if (conversations[i].BOT_ID == 31){
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
        botID={botID}
        userID={finalUserID}
        handleConvoSelection={handleConvoSelection}
       />
    </div>
  );
};

export default ChatApp;