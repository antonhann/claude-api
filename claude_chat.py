import asyncio
from anthropic import AsyncAnthropic
#API key taken from "echo $ANTHROPIC_API_KEY"
#update key with "export ANTHROPIC_API_KEY="your_api_key""

#initalize AsyncAnthropic client
client = AsyncAnthropic()

async def initiateConversation():
    #Store current conversation
    history = []

    #initiate conversation
    while True:
        #recieve and store user's message
        userInput = input("You: ")
        history.append(
            {
                "role": "user",
                "content" : userInput
            }
        )
        
        #recieve and store ai's message
        stream = await client.messages.create(
            max_tokens = 1024,
            messages = history,
            model="claude-3-haiku-20240307",
            stream = True
        )
        #retrieve the ai's response
        aiResponse = ""
        async for event in stream:
            if hasattr(event, 'delta') and hasattr(event.delta, 'text'):
                aiResponse += event.delta.text
        history.append(
            {
                "role": "assistant",
                "content" : aiResponse
            }
        )
        print("Claude: ", aiResponse)

"""
Tasks:

look into max history

demo 

image (text prompt, image prompt)

look into functionality

description customization of the bot

generating image through a prompt
"""

if __name__ == "__main__":
    asyncio.run(initiateConversation())

