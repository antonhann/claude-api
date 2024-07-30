/*
    Questions:
    what is the purpose of the context in chat prompt 
**/
import { Chat, ClaudeChat } from "./interface";

const fetchHistory = async (botId : number ,userId : number) : Promise<Chat[]> => {
    try{
        const response = await fetch(`http://www.onezeus.com:3000/chats?BOT_ID=${botId}&FROM_USER_ID=${userId}&TO_USER_ID=${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const history = await response.json()
        return (history as Chat[]).reverse();
    }
    catch (error){
        console.error("there was a problem with fetching the chat history", error);
        throw error;
    }
}

const getClaudeHistory = (data : Chat[]) => {
    let history : ClaudeChat[] = []
    for(let i : number = 0; i < data.length; i++){
        history.push({
            role: "user",
            content: data[i].CHAT_PROMPT
        })
        history.push({
            role: "assistant",
            content: data[i].CHAT_RESPONSE
        })
    }
    return history;
}
const getData = async () => {
    try {
        const chats : Chat[] = await fetchHistory(2,89);
        const claudeHistory : ClaudeChat[] = getClaudeHistory(chats);
        console.log(claudeHistory);
    } catch (error) {
        // Handle the error as needed
    }
};

getData();