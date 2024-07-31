import { useState } from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ handleConvoSelection, currentConvo }) => {
  const [converstations, setConversations] = useState([])
  const handleNewConvo = () => {

  }
  const handleDeleteConvo = (id) => {

  }
  return (
    <div className="sidebar">
      <button onClick={() => handleNewConvo()}>New Chat</button>
      <div className="chat-list">
        {converstations.map(chat => (
          <div
            key={chat.id}
            className={`chat-item ${currentConvo && chat.id === currentConvo.ID ? 'active' : ''}`}
            onClick={() => handleConvoSelection(chat.id)}
          >
            {chat.name}
            <button onClick={() => handleDeleteConvo(chat.id)} className = "delete-button">❌</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;