import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      const parsedUser = savedUser ? JSON.parse(savedUser) : null;
      return parsedUser && parsedUser.username ? parsedUser : null;  // Strict check
    } catch (err) {
      console.error("Invalid user in localStorage", err);
      localStorage.removeItem('user');
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      const savedToken = localStorage.getItem('token');
      return savedToken || null;
    } catch (err) {
      console.error("Invalid token in localStorage", err);
      localStorage.removeItem('token');
      return null;
    }
  });

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
