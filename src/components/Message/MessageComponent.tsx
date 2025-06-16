import type { Message } from "../../utils/types";
import "./MessageComponent.css";

interface Props {
  message: Message;
  currentUserId?: string;
}

function MessageComponent({ message, currentUserId }: Props) {
  const isOwnMessage = currentUserId === message.senderId;
  const formattedTime = new Date(message.sentAt).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`message ${isOwnMessage ? 'message-own' : 'message-other'}`}>
      <div className="message-bubble">
        <div className="message-content">{message.content}</div>
        <div className="message-time">{formattedTime}</div>
      </div>
      {!isOwnMessage && (
        <div className="message-sender">{message.sender.username}</div>
      )}
    </div>
  );
}

export default MessageComponent;
