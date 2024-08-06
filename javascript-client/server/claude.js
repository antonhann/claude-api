import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const sendMessage = async(history, message) => {
  history.push({
    role: "user",
    content: message
  })
  console.log(history)
  const msg = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    messages: history,
  });


  
  return msg
}

export default sendMessage
