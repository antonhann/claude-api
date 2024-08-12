import Anthropic from "@anthropic-ai/sdk"
import { promises as fs } from 'fs'
import path from 'path';

const anthropic = new Anthropic({
  apiKey: "",
});

  const sendMessage = async (history, message, imageFiles) => {
    let newMessage = {
      role: "user",
      content: [{
        type: "text",
        text: message
      }]
    }
    //Create a messages array
    //First add the text prompt to the array
    try {
      //If there is at least one image inputted, iterate through each and add to the images array 
      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach((base64) => {
          newMessage.content.push({
              type: "image",
              source: {
                type: "base64",
                media_type: base64.imageType,
                data: base64.base64Data,
              },
          });
        });
        //Pushes the inputted images and prompt to the history array
        history.push(newMessage);
      }
      else{
        //If there are no images, simply add the message to the history array
        history.push(newMessage);
      }
      // history.forEach((e) => {
      //   console.log(e.content);
      // })
      // Send the message using anthropic API
      const msg = await anthropic.messages.create({
        messages: history,
        max_tokens: 4096,
        model: "claude-3-5-sonnet-20240620",
      });
      //console.log(msg);
      
      return msg;
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
// const testSendMessage = async(history, message) => {
//   history.push({
//     role: "user",
//     content: message
//   })
//   console.log(history)
//   const msg = await anthropic.messages.create({
//     model: "claude-3-haiku-20240307",
//     max_tokens: 1024,
//     messages: history,
//   });

  
//   return msg
// }

export default sendMessage