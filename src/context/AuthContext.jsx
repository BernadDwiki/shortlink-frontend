import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";
import {
  getToken,
  getUser,
  saveToken,
  saveUser,
  removeToken,
  removeUser,
} from "../utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getToken());
  const [user, setUser] = useState(() => getUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(getToken());
    setUser(getUser());
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      const newToken = result?.token;
      const newUser = result?.user;

      if (!newToken) throw new Error("No token returned from login");

      saveToken(newToken);
      if (newUser) saveUser(newUser);

      setToken(newToken);
      setUser(newUser || null);

      return { token: newToken, user: newUser };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    removeUser();
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    loading,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // Return a safe fallback to avoid runtime crashes when used outside provider
    return {
      token: null,
      user: null,
      loading: false,
      isAuthenticated: false,
      login: async () => {
        throw new Error("AuthProvider is missing");
      },
      logout: () => {},
    };
  }

  return ctx;
}

export default AuthContext;
