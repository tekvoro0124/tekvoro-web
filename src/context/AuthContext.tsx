import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// For demo purposes only - in a real app, this would be authenticated against a backend
const MOCK_ADMIN = {
  id: '1',
  username: 'admin',
  password: 'admin123',
  role: 'admin'
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved auth state on mount
    const savedUser = localStorage.getItem('tekvoro_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('tekvoro_user');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // In a real app, this would call your authentication API
    if (username === MOCK_ADMIN.username && password === MOCK_ADMIN.password) {
      const userData = {
        id: MOCK_ADMIN.id,
        username: MOCK_ADMIN.username,
        role: MOCK_ADMIN.role
      };
      
      setUser(userData);
      localStorage.setItem('tekvoro_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tekvoro_user');
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};