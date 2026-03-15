import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  checkEmailExists: (email: string) => boolean;
  login: (email: string) => void;
  registerAndLogin: (email: string, name: string, phone: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('cineverse_users');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cineverse_users', JSON.stringify(users));
  }, [users]);

  const checkEmailExists = (email: string) => {
    return users.some(u => u.email === email);
  };

  const login = (email: string) => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
    }
  };

  const registerAndLogin = (email: string, name: string, phone: string) => {
    const newUser = { email, name, phone };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, checkEmailExists, login, registerAndLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
