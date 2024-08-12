import React, { useState } from 'react';
import '../styles/ChatWindow.css';
// import ButtonUsage from './ButtonUsage.js';

const ChatWindow = ({
  currentConvo,
  botID,
  botModel,
  userID,
  handleConvoSelection
 }) => {
  const [messageWindow, setMessageWindow] = useState(5);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }
  const handleFileChange = async (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    console.log(file);
  try {
    const base64 = await fileToBase64(file);
    const imageData = {
      base64Data: base64,
      imageType: file.type,
    };
    setSelectedFile((oldImages) => [...oldImages, imageData]);
    console.log("Image data", imageData);
    console.log("selectedFile: ", selectedFile);
  } catch (error) {
    console.error('Error converting file to Base64:', error);
  }
};

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result.split(',')[1]); // Remove the data URL prefix
      reader.onerror = (error) => reject(error);
    });
  };

  const sendMessage = async (message, selectedFile) => {
    if (botID !== 31){
      return
    }
    const update = async () => {
      try{
        console.log("currentConvo:" ,currentConvo);
        const response = await fetch("http://localhost:5000/api/send-message", {
          method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userID: userID,
              convo: currentConvo.reverse(),
              message: message,
              image: selectedFile
            })
        })
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
          throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const responseData = await response.json();
        return responseData
      }
      catch(error){
        console.error("error updating conversation to the database", error)
      }
    }
    try {
      const responseData = await update();
      if (responseData) {
        handleConvoSelection(botID); // Call handleConvoSelection only after update is complete
        setMessage("")
        setSelectedFile([]);
      }
    } catch (error) {
      console.error("Error in sendMessage function", error);
    }
  }
  const handleMessageKeyDown = (e) =>{
    if(e.key === "Enter"){
      sendMessage(message)
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
        onKeyDown={(e) => handleMessageKeyDown(e)}
        />
        <input type="file" id="file-upload" style={{ display: 'none' }} onChange = {handleFileChange}/>
        <label htmlFor="file-upload" className="upload-button">📎</label>
        <button 
        className="send-button"
        onClick={() => sendMessage(message, selectedFile)}
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