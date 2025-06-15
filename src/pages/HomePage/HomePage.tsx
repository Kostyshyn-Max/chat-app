import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import type { Chat, Message } from "../../utils/types";
import ChatList from "../../components/ChatList/ChatList";
import axios from "../../utils/axios";
import "./HomePage.css";
import ChatCompoment from "../../components/Chat/Chat";
import * as signalR from "@microsoft/signalr";
import { HttpStatusCode } from "axios";

function HomePage() {
  const { user } = useAuth();

  const [currentChat, setCurrentChat] = useState<Chat>();
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [incomingMessage, setIncomingMessage] = useState<Message | undefined>(
    undefined
  );

  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      if (!user || !isLoading) {
        return;
      }

      console.log("Fetching chats...");
      var response = await axios.get<Chat[]>(`chat/my-chats`);

      setChats(response.data);
      setIsLoading(false);
    };

    fetchChats();
  }, [user, isLoading]);

  useEffect(() => {
    if (!user) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7147/chathub", {
        accessTokenFactory: () => localStorage.getItem("token") || "",
      })
      .withAutomaticReconnect()
      .build();

    connection.on("ReceivePrivateMessage", function (message: Message) {
      setIncomingMessage(message);
    });

    connection
      .start()
      .then(() => {
        console.log("SignalR Connected");
      })
      .catch((err) => console.error("SignalR Connection Error: ", err));

    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, [user]);

  const handleSendMessage = (recipientId: string, content: string) => {
    if (!currentChat) {
      return;
    }

    if (connectionRef.current) {
      connectionRef.current
        .invoke("SendPrivateMessage", recipientId, content, currentChat.id)
        .catch((err) => console.error(err));
    }
  };

  const handleChatSelect = (chat: Chat) => {
    setCurrentChat(chat);
  };

  const handleStartChat = async (username: string): Promise<{success: boolean, errorMessage?: string}> => {
    try {
      let response = await axios.post<string>(`chat/create`, { username });
      if (response.status === HttpStatusCode.Ok) {
        setIsLoading(true);
      }

      return { success: true};
    } catch (error) {
      return { success: false, errorMessage: "User not found"}
    }
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
        onStartChat={handleStartChat}
      />
      <div className="chat-content">
        {currentChat ? (
          <ChatCompoment
            chat={currentChat}
            onSendMessage={(content: string) =>
              handleSendMessage(currentChat.otherUser.id, content)
            }
            incomingMessage={incomingMessage}
          />
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
