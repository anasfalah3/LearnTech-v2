import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
      const userInfo = localStorage.getItem("userInfoLearnTech");
      const [user, setUser] = useState(userInfo);
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