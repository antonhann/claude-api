import React, { useState } from 'react';
import '../styles/Sidebar.css';
import { Chat, Conversation} from '@interfaces/*';
interface SidebarProps {
    handleChatSelection: (currentConvo : Conversation) => void;
    currentConvo : Conversation | undefined;
}
const Sidebar : React.FC<SidebarProps>= ({
    handleChatSelection,
    currentConvo
}) => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const handleNewChat = () => {
        
    }
    const handleDeleteChat = (id : number) => {

    }
    return (
        <div className="sidebar">
        <button onClick={handleNewChat}>New Chat</button>
        <div className="chat-list">
            {conversations.map(convo => (
            <div
                key={convo.CHAT_ID}
                className={`chat-item ${currentConvo && convo.CHAT_ID === currentConvo.CHAT_ID ? 'active' : ''}`}
                onClick={() => handleChatSelection(convo)}
            >
                <button onClick={() => handleDeleteChat(convo.CHAT_ID)} className = "delete-button">❌</button>
            </div>
            ))}
        </div>
        </div>
    );
};

export default Sidebar;