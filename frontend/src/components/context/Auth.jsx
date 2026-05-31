import { createContext, useState } from "react";

export const AuthContext = createContext();

const getStoredUser = () => {
      const userInfo = localStorage.getItem("userInfoLearnTech");
      if (!userInfo) return null;

      try {
            return JSON.parse(userInfo);
      } catch (error) {
            console.error("Failed to parse stored user info:", error);
            localStorage.removeItem("userInfoLearnTech");
            return null;
      }
};

export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(getStoredUser());
      const login = (user) => {
            setUser(user);
      }
      const logout = () => {
            localStorage.removeItem("userInfoLearnTech");
            setUser(null);
      }

      return <AuthContext.Provider value={{ user, login, logout }}>
            {children}
      </AuthContext.Provider>
}