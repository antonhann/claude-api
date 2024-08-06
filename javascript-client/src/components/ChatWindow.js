import React, { useState } from 'react';
import '../styles/ChatWindow.css';
// import ButtonUsage from './ButtonUsage.js';

const ChatWindow = ({
  currentConvo,
  botID,
  userID,
  handleConvoSelection
 }) => {
  const [messageWindow, setMessageWindow] = useState(5);
  const [message, setMessage] = useState("")

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }
  const sendMessage = async (message) => {
    if (botID !== 31){
      return
    }
    const update = async () => {
      try{
        console.log(message)
        const response = await fetch("http://localhost:5000/api/send-message", {
          method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userID: userID,
              convo: currentConvo,
              message: message
            })
        })
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
          throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const responseData = await response.json();
        console.log('Response data:', responseData);
        return responseData
      }
      catch(error){
        console.error("error updating conversation to the database", error)
      }
    }
    try {
      const responseData = await update();
      console.log(responseData)
      if (responseData) {
        handleConvoSelection(botID); // Call handleConvoSelection only after update is complete
        setMessage("")
      }
    } catch (error) {
      console.error("Error in sendMessage function", error);
    }
  }

  return (
    <div className="chat-window">
      <div className="messages-window">
        {currentConvo ? 
          //complete display task
          currentConvo.slice(0,messageWindow).map(chat => {
            return(
                <>
                  <MessageBubble
                    message={chat.CHAT_RESPONSE}
                    fromUser={false}
                  />
                  <MessageBubble
                    message={chat.CHAT_PROMPT}
                    fromUser={true}
                  />
                </>
            )
          })
         : (
          <div>Select a chat to view messages</div>
        )}
      </div>
      <div className="chat-bar">
        <input 
        type="text" 
        placeholder="Type a message..." 
        value={message}
        onChange={(e) => handleMessageChange(e)}
        />
        <input type="file" id="file-upload" style={{ display: 'none' }} />
        <label htmlFor="file-upload" className="upload-button">📎</label>
        <button 
        className="send-button"
        onClick={() => sendMessage(message)}
        >Send</button>
      </div>
    </div>
  );
};

const MessageBubble = ({
  message,
  fromUser
}) => {
  return(
    <div
      className={`message ${fromUser ? "user-message" : "bot-message"}`}
    >{message}</div>
  )
}

export default ChatWindow;