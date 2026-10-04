import { createContext, useContext, useEffect, useState } from "react";
import { getMe, loginUser, registerUser, TOKEN_KEY } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // true while we check if a saved token is still valid
  const [loading, setLoading] = useState(true);

  // When the app opens, check whether the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    getMe()
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  const register = async (formData) => {
    await registerUser(formData);
  };

  const login = async (email, password) => {
    const res = await loginUser({ email, password });
    localStorage.setItem(TOKEN_KEY, res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Small helper so components can write: const { user } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
