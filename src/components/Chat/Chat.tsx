import React, { useEffect, useState } from "react";
import type { Chat, Message } from "../../utils/types";
import "./Chat.css";
import axios from "../../utils/axios";
import MessageComponent from "../Message/MessageComponent";

interface Props {
  chat: Chat;
  onSendMessage: (content: string) => void;
  incomingMessage?: Message;
}

function ChatCompoment({ chat, onSendMessage, incomingMessage }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chat) return;

      var response = await axios.get<Message[]>(`message/all/${chat.id}`);
      setMessages(response.data);
      setIsLoading(false);
    };

    fetchMessages();
  }, [chat]);

  useEffect(() => {
    if (!incomingMessage) return;

    if (incomingMessage.chat.id === chat.id) {
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    }
  }, [incomingMessage]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        <h3>Chat with {chat.otherUser?.username}</h3>
      </div>
      <div className="chat-messages">
        {isLoading ? (
          <p>Loading messages...</p>
        ) : messages && messages.length > 0 ? (
          messages.map((msg) => <MessageComponent key={msg.id} message={msg} />)
        ) : (
          <p>Start your conversation with {chat.otherUser?.username}</p>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatCompoment;
