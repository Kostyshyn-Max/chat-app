import React from "react";
import type { Chat } from "../../utils/types";

interface Props {
  chat: Chat;
  isActive?: boolean;
  onClick: () => void;
}

function ChatItem({ chat, isActive = false, onClick }: Props) {
  const getInitials = (username: string) => {
    return username
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <button
      className={`chat-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="chat-item-content">
        <div className="chat-avatar">
          {getInitials(chat.otherUser?.username ?? "U")}
        </div>
        <div className="chat-info">
          <p className="chat-username">
            {chat.otherUser?.username ?? "Unknown User"}
          </p>
          <p className="chat-last-message">
            Tap to start chatting
          </p>
        </div>
      </div>
    </button>
  );
}

export default ChatItem;
