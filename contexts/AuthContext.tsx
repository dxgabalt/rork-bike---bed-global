import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

type Role = 'user' | 'host' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  bio?: string;
  location?: string;
  stats?: {
    trips: number;
    reviews: number;
    routes?: number;
    listings?: number;
    rating?: number;
  };
}

interface AuthContextType {
  user: User | null;
  role: Role;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setRole: (role: Role) => Promise<void>;
}

const defaultUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@bikeandbed.com',
  role: 'user',
  avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
  bio: 'Avid cyclist and traveler. Love exploring new trails and meeting fellow cyclists.',
  location: 'Denver, Colorado',
  stats: {
    trips: 12,
    reviews: 8,
    routes: 3,
  }
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  setRole: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRoleState] = useState<Role>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from AsyncStorage
    const loadUser = async () => {
      try {
        const userJson = await AsyncStorage.getItem('user');
        const roleStr = await AsyncStorage.getItem('role');
        
        if (userJson) {
          setUser(JSON.parse(userJson));
        }
        
        if (roleStr) {
          setRoleState(roleStr as Role);
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login - in a real app, this would call an API
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - always succeeds with default user
      setUser(defaultUser);
      await AsyncStorage.setItem('user', JSON.stringify(defaultUser));
      
      if (!role) {
        setRoleState('user');
        await AsyncStorage.setItem('role', 'user');
      }
      
      // Navigate based on role
      if (role === 'host') {
        router.replace('/host/dashboard');
      } else if (role === 'admin') {
        router.replace('/admin/dashboard');
      } else {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Clear user data
      setUser(null);
      // Don't clear role to remember user preference
      await AsyncStorage.removeItem('user');
      router.replace('/splash');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setRole = async (newRole: Role) => {
    setRoleState(newRole);
    await AsyncStorage.setItem('role', newRole as string);
    
    // Navigate based on role if user is logged in
    if (user) {
      if (newRole === 'host') {
        router.replace('/host/dashboard');
      } else if (newRole === 'admin') {
        router.replace('/admin/dashboard');
      } else {
        router.replace('/(tabs)');
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};