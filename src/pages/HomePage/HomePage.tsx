import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import type { Chat } from "../../utils/types";
import ChatList from "../../components/ChatList/ChatList";
import axios from "../../utils/axios";
import "./HomePage.css";
import ChatCompoment from "../../components/Chat/Chat";

function HomePage() {
  const { user } = useAuth();

  const [currentChat, setCurrentChat] = useState<Chat>();
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChats = async () => {
      if (!user) {
        return;
      }

      var response = await axios.get<Chat[]>(`chat/my-chats`);

      setChats(response.data);
      setIsLoading(false);
    };

    fetchChats();
  }, [user]);

  const handleChatSelect = (chat: Chat) => {
    setCurrentChat(chat);
  };

  if (isLoading) {
    return (
      <div className="home-page">
        <div className="chat-list-container">
          <div className="loading-container">
            <p>Loading chats...</p>
          </div>
        </div>
        <div className="chat-content">
          <div className="loading-container">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <ChatList
        chats={chats}
        activeChat={currentChat}
        onChatSelect={handleChatSelect}
      />
      <div className="chat-content">
        {currentChat ? (
          <ChatCompoment chat={currentChat} />
        ) : (
          <div className="no-chat-selected">
            <h3>Select a chat to start messaging</h3>
            <p>Choose from your existing conversations on the left</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
