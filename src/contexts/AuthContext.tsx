import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "../utils/axios";
import type {
  AuthContextType,
  LoginCredentials,
  RegisterCredentials,
  User,
  UserTokenData,
} from "../utils/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  useEffect(() => {
    if (token) {
      console.log("juser")
      axios
        .get<User>("user/me")
        .then((response) => {
          setUser(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          refreshToken();
        });
    } else {
      setIsLoading(false);
    }
  }, [token]);

  console.log(user)
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    const tokenResponse = await axios.post<UserTokenData>("user/login", credentials);
    const tokenData: UserTokenData = tokenResponse.data;
    localStorage.setItem("token", tokenData.token);
    localStorage.setItem("refreshToken", tokenData.refreshToken);
    setToken(tokenData.token);
  };

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    const tokenResponse = await axios.post<UserTokenData>("user/register", credentials);
    const tokenData: UserTokenData = tokenResponse.data;
    localStorage.setItem("token", tokenData.token);
    localStorage.setItem("refreshToken", tokenData.refreshToken);
    setToken(tokenData.token);
  }

  const refreshToken = async () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      setIsLoading(false);
      return logout();
    }

    try {
      const response = await axios.post<UserTokenData>("user/refresh", {
        token,
        refreshToken,
      } as UserTokenData);
      const tokenData: UserTokenData = response.data;
      localStorage.setItem("token", tokenData.token);
      localStorage.setItem("refreshToken", tokenData.refreshToken);
      setToken(tokenData.token);
    } catch (error) {
      console.error("Failed to refresh token:", error);
      setIsLoading(false);
      logout();
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setToken("");
    setIsLoading(false);
  };
  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
