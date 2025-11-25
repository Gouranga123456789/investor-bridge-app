import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            logout();
          } else {
            setUser(decoded.user);
            axios.defaults.headers.common['x-auth-token'] = token;
          }
        } catch (error) {
          console.error('Invalid token');
          logout();
        }
      }
      setLoading(false);
    };

    checkUser();
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['x-auth-token'];
  };

  const authValue = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user,
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};
