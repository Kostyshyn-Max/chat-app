import type { Chat } from "../../utils/types";
import ChatItem from "../ChatItem/ChatItem";
import StartChat from "../StartChat/StartChat";
import "./ChatList.css";

interface Props {
  chats: Chat[];
  activeChat?: Chat;
  onChatSelect: (chat: Chat) => void;
  onStartChat: (username: string) => Promise<{success: boolean, errorMessage?: string}>;
}

function ChatList({ chats, activeChat, onChatSelect, onStartChat }: Props) {
  return (
    <div className="chat-list-container">
      <div className="chat-list-header">
        <h2>Chats</h2>
      </div>
      <div className="chat-list-scrollable">
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
      <div className="start-chat-container">
        <StartChat onStartChat={onStartChat} />
      </div>
    </div>
  );
}

export default ChatList;
