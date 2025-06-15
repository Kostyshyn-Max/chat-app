import type { Message } from "../../utils/types";

interface Props {
  message: Message;
}

function MessageComponent({ message }: Props) {
  return (
    <div className="message">
      <strong>{message.sender.username}:</strong>
      <span>{message.content}</span>
    </div>
  );
}

export default MessageComponent;
