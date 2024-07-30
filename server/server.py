# from flask import Flask, request, jsonify
# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv
# from anthropic import Anthropic

# app = Flask(__name__)
# client = Anthropic()
# db = mongoClient["stemkasa"]

# """
# API CALLS NEEDED:

# SEND MESSAGE
# CHAT HISTORY
# MAKING THE BOT

# """

# """
# documentation
# """
# @app.route('/api/send-message', methods = ["POST"])
# def sendMessage():
#     return {"success" : True}


# """
# Retrieve user's chat history with bot

# @params: 
# """
# @app.route('/api/get-chat-history/<string:userId>/<int:botId>', methods=['GET'])
# def getChatHistory(userId,botId):
#         chats = db["STE_Chats"]
#         mongoHistory = chats.find({
#             "FROM_USER_ID": userId,
#             "BOT_ID": botId
#         })
#         history = [serializeDocument(document) for document in mongoHistory]
#         if history:
#             return jsonify({"history" : history})
#         else:
#             return jsonify({"message": "couldnt find message"}), 400


# def serializeDocument(doc):
#     """
#     Convert MongoDB document to a JSON serializable format.
#     """
#     if '_id' in doc:
#         doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
#     if 'CREATION_DATE' in doc:
#         doc['CREATION_DATE'] = doc['CREATION_DATE'].isoformat()  # Convert datetime to ISO format
#     if 'LAST_UPDATE_DATE' in doc:
#         doc['LAST_UPDATE_DATE'] = doc['LAST_UPDATE_DATE'].isoformat()  # Convert datetime to ISO format
#     return doc

# if __name__ == '__main__':
#     app.run(debug=True)