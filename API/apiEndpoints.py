from flask import Flask, request, jsonify
import requests
import asyncio
from anthropic import Anthropic
from config import ANTHROPIC_API_KEY

app = Flask(__name__)
client = Anthropic(api_key = ANTHROPIC_API_KEY)


@app.route('/create-chat', methods=['GET'])
def create_chat():
    try:
        message = client.messages.create(
            max_tokens = 4096,
            #system = "Will take in input for the bot's role"
            messages = [
                {"role": "user", "content": "Hello"},
                
            ],
            model="claude-3-haiku-20240307",
        )
        return message.content[0].text
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)