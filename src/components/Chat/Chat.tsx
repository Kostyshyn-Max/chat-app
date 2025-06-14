import React from "react";
import type { Chat } from "../../utils/types";
import "./Chat.css";

interface Props {
  chat: Chat;
}

function ChatCompoment({ chat }: Props) {
  return (
    <div className="chat-area">
      <div className="chat-header">
        <h3>Chat with {chat.otherUser?.username}</h3>
      </div>
      <div className="chat-messages">
        <p>Start your conversation with {chat.otherUser?.username}</p>
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          className="message-input"
        />
        <button className="send-button">Send</button>
      </div>
    </div>
  );
}

export default ChatCompoment;
