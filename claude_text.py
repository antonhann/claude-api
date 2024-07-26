import os
from config import ANTHROPIC_API_KEY
from anthropic import Anthropic 


client = Anthropic(api_key = ANTHROPIC_API_KEY)

def claude_chatbot(prompt: str) -> str:
    message = client.messages.create(
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
    model="claude-3-haiku-20240307",
)
    return message.content[0].text

def chatbot():
    print("Claude: Hello! How can I assist you today?")
    while True:
        user_input = input("You: ")
        if user_input.lower() in ['quit']:
            print("Chatbot: Goodbye!")
            break

        response = claude_chatbot(user_input)
        print("Claude: " + response)

if __name__ == "__main__":
    chatbot()

