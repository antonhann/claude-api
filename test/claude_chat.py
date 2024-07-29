import asyncio
from anthropic import AsyncAnthropic
from config import ANTHROPIC_API_KEY

#initalize AsyncAnthropic client
client = AsyncAnthropic(api_key = ANTHROPIC_API_KEY)

async def initiateConversation():
    #Store current conversation
    history = []

    print("Claude: How can I assist you?")

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

1.look into max history:
Specifically, Claude models can process up to 200,000 tokens of text in a single context window
This corresponds to approximately 150,000 words, which is equivalent to over 500 pageas of material.

image (text prompt, image prompt)

look into functionality

description customization of the bot

generating image through a prompt
"""

if __name__ == "__main__":
    asyncio.run(initiateConversation())

