import { useEffect, useState } from 'react';
import '../styles/Sidebar.css';
import ButtonUsage from './ButtonUsage';

const Sidebar = ({ 
  handleConvoSelection,
  conversations,
  currentConvo,
  userID,
  handleUserIDChange,
  handleUserIDKeyDown
  }) => {
  const handleNewConvo = () => {

  }
  const handleDeleteConvo = (id) => {

  }
  return (
    <div className="sidebar">
      <ButtonUsage message = "New Chat" onClick={() => handleNewConvo()}/>
      <input
        value={userID}
        onChange={(e) => handleUserIDChange(e)}
        placeholder={"Press enter after USER ID"}
        onKeyDown={(e) => handleUserIDKeyDown(e)}
      ></input>
      <div className="chat-list">
        {conversations.map(convo => {
          return(
            <div
              key={convo._id}
              className={`chat-item`}
              onClick={() => handleConvoSelection(convo.BOT_ID)}
            >
              Bot ID: {convo.BOT_ID}
              <button onClick={() => handleDeleteConvo(convo.BOT_ID)} className = "delete-button">❌</button>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Sidebar;