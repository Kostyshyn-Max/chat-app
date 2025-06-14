import React from "react";
import type { Chat } from "../../utils/types";
import ChatItem from "../ChatItem/ChatItem";
import "./ChatList.css";

interface Props {
  chats: Chat[];
  activeChat?: Chat;
  onChatSelect: (chat: Chat) => void;
}

function ChatList({ chats, activeChat, onChatSelect }: Props) {
  return (
    <div className="chat-list-container">
      <div className="chat-list-header">
        <h2>Chats</h2>
      </div>
      <div className="chat-list">
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isActive={activeChat?.id === chat.id}
            onClick={() => onChatSelect(chat)}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatList;
