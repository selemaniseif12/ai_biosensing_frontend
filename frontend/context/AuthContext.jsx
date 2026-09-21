import { createContext, useEffect, useState } from "react";
import { getAdminToken, setAdminToken, clearAdminToken } from "../utils/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [adminToken, setTokenState] = useState(null);

  useEffect(() => {
    const token = getAdminToken();
    if (token) {
      setTokenState(token);
    }
  }, []);

  const login = (token) => {
    setAdminToken(token);
    setTokenState(token);
  };

  const logout = () => {
    clearAdminToken();
    setTokenState(null);
  };

  return (
    <AuthContext.Provider value={{ adminToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
