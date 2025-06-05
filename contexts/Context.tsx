import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from '@/constants/translations';

type Language = 'en' | 'es';
type Role = 'user' | 'host' | 'admin';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: Role;
  bio?: string;
  location?: string;
  stats?: { 
    trips: number; 
    reviews: number; 
    listings?: number; 
    rating?: number; 
  };
};

interface AppContextType {
  user: User | null;
  isLoading: boolean;
  language: Language;
  login: (role: Role) => void;
  logout: () => void;
  setLanguage: (lang: Language) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AppContext = createContext<AppContextType>({
  user: null,
  isLoading: true,
  language: 'en',
  login: () => {},
  logout: () => {},
  setLanguage: async () => {},
  updateUser: () => {},
});

export const useApp = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem('language');
      const storedUser = await AsyncStorage.getItem('user');
      
      if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'es')) {
        setLanguageState(storedLanguage as Language);
      }
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (role: Role) => {
    const mockUser: User = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      role,
      bio: role === 'host' ? 'Passionate host welcoming cyclists' : 'Cycling enthusiast exploring the world',
      location: 'San Francisco, CA',
      stats: { 
        trips: 24, 
        reviews: 12, 
        listings: role === 'host' ? 3 : undefined, 
        rating: 4.8 
      }
    };
    setUser(mockUser);
    AsyncStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    AsyncStorage.removeItem('user');
  };

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    await AsyncStorage.setItem('language', lang);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      isLoading,
      language,
      login,
      logout,
      setLanguage,
      updateUser,
    }}>
      {children}
    </AppContext.Provider>
  );
};