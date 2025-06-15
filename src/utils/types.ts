export interface User {
  id: string;
  username: string;
  phoneNumber: string;
}

export interface AuthContextType {
  user: User | null;
  token: string;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export interface LoginCredentials {
  phoneNumber: string;
  password: string;
}

export interface UserTokenData {
  token: string;
  refreshToken: string;
}

export interface Chat {
    id: string;
    user1Id: string;
    user2Id: string;
    otherUser: User;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  sentAt: Date;
  isRead: boolean;
  sender: User;
  chat: Chat;
}