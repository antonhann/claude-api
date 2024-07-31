/*
    Questions:
    what is the purpose of the context in chat prompt 

    Tasks:
    -retrieve all user's unique chats
    -post new chat
    -creating new bot
**/

/*
    @brief: retrieves all the conversations of the user
    @params: int of the user's id
    @return: returns array the most recent messages of all the unique conversations
*/
export const fetchConvo = async(userId) => {
    try{
        //retrieve all the bot lists
        const response = await fetch(`http://www.onezeus.com:3000/bots`);
        if(!response.ok){
            throw new Error("network response was not ok");
        }
        const bots = await response.json();
        //retrieve the history between each bot and user
        const fetchHistories = bots.map(bot => fetchHistory(bot.BOT_ID, userId));
        const histories = await Promise.all(fetchHistories);
        //get all the recent messages between the bots
        let conversations = []
        for(let i = 0; i < histories.length; i++){
            if(histories[i].length > 0){
                conversations.push(histories[i][0])
            }
        }
        return conversations;
    }
    catch(error){
        console.error("there was a problem fetching the unique conversations")
    }
}
/*
    @brief: retrieves chat history of the user and bot from the database
    @params: int of botID, int of UserID
    @return: returns array the database's chat history between the bot and the user
*/
export const fetchHistory = async (botId ,userId) => {
    try{
        //retrieve all the chats between the bot and user
        const response = await fetch(`http://www.onezeus.com:3000/chats?BOT_ID=${botId}&FROM_USER_ID=${userId}&TO_USER_ID=${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const history = await response.json()
        //return the array where the recent messages are first
        return (history).reverse();
    }
    catch (error){
        console.error("there was a problem with fetching the chat history", error);
        throw error;
    }
}
/*
    @brief: convert the database's chat history into format claudeAI accepts
    @params: array of the database chat history between userID and botID
    @return: returns array of claude formatted history 
*/
export const getClaudeHistory = (data) => {
    let history = []
    for(let i = 0; i < data.length; i++){
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
        let conversations = await fetchConvo(89);
        console.log(conversations);
    } catch (error) {
        // Handle the error as needed
    }
};

// getData();