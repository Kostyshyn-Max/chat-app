import { useState } from "react";
import "./StartChat.css";

interface Props {
  onStartChat: (
    username: string
  ) => Promise<{ success: boolean; errorMessage?: string }>;
}

function StartChat({ onStartChat }: Props) {
  const [username, setUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      let response = await onStartChat(username.trim());
      if (response.success) {
        setUsername("");
        return;
      }

      setErrorMessage(response.errorMessage);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (errorMessage) {
      setErrorMessage(undefined);
    }
  };

  return (
    <form className="start-chat-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter username to start chat"
        value={username}
        onChange={(e) => handleInputChange(e)}
        className="start-chat-input"
      />
      {errorMessage && <span className="start-chat-error">{errorMessage}</span>}
      <button
        type="submit"
        className="start-chat-button"
        disabled={!username.trim()}
      >
        Start Chat
      </button>
    </form>
  );
}

export default StartChat;
