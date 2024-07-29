import tkinter as tk
from tkinter import filedialog
import os
from config import ANTHROPIC_API_KEY
from anthropic import Anthropic 
import base64


client = Anthropic(api_key = ANTHROPIC_API_KEY)

def file_to_base64(file):
    return base64.b64encode(open(file, "rb").read()).decode("utf-8")

def claude_chatbot(prompt: str, image: str) -> str:
    message = client.messages.create(
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/jpeg",
                        "data": image,
                    },
                },
                {
                    "type": "text",
                    "text": prompt,
                }
            ]
        }
    ],
    model="claude-3-haiku-20240307",
)
    print(message)
    #print(message.content[0].text)

# def chatbot():
#     print("Claude: Hello! How can I assist you today?")
#     while True:
#         user_input = input("You: ")
#         if user_input.lower() in ['quit']:
#             print("Chatbot: Goodbye!")
#             break

#         response = claude_chatbot(user_input)
#         print("Claude: " + response)

# def open_file_dialog():
#     #Select and open a file
#     root = tk.Tk() #Needed for large scripts
#     root.withdraw()  # Hide the root window
#     file_path = filedialog.askopenfilename(
#         title="Select an Image File",
#         filetypes=[("All Files", "*.*")]
#     )
#     return file_path

if __name__ == "__main__":
    # image_file_path = open_file_dialog()
    # if image_file_path:
    #     image_base64 = file_to_base64(image_file_path)
    #     chatbot(image_base64)
    # else:
    #     print("No file selected.")
    image_file = file_to_base64("Chicken_Katsu.jpeg")
    claude_chatbot("How do I make this", image_file)