import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setCustomPassword: (password: string) => void;
  getCustomPassword: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// For demo purposes only - in a real app, this would be authenticated against a backend
const MOCK_ADMIN = {
  id: '1',
  username: 'admin@tekvoro.com',
  password: 'demo123',
  role: 'admin'
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Custom password management
  const setCustomPassword = (password: string) => {
    localStorage.setItem('tekvoro_custom_password', password);
    console.log('Custom password set successfully');
  };

  const getCustomPassword = (): string | null => {
    return localStorage.getItem('tekvoro_custom_password');
  };

  useEffect(() => {
    // Check for saved auth state on mount
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem('tekvoro_user');
        console.log('AuthContext - Saved user from localStorage:', savedUser);
        
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          console.log('AuthContext - Parsed user:', parsedUser);
          
          // Validate the user data
          if (parsedUser && parsedUser.id && parsedUser.username && parsedUser.role) {
            setUser(parsedUser);
            console.log('AuthContext - User restored from localStorage');
          } else {
            console.log('AuthContext - Invalid user data, clearing localStorage');
            localStorage.removeItem('tekvoro_user');
          }
        }
      } catch (error) {
        console.error('AuthContext - Failed to parse saved user:', error);
        localStorage.removeItem('tekvoro_user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    console.log('AuthContext - Login attempt:', { username, password });
    
    try {
      // Check for custom password first
      const customPassword = getCustomPassword();
      
      // In a real app, this would call your authentication API
      if (username === MOCK_ADMIN.username && 
          (password === MOCK_ADMIN.password || (customPassword && password === customPassword))) {
        const userData = {
          id: MOCK_ADMIN.id,
          username: MOCK_ADMIN.username,
          role: MOCK_ADMIN.role
        };
        
        console.log('AuthContext - Login successful, setting user:', userData);
        setUser(userData);
        localStorage.setItem('tekvoro_user', JSON.stringify(userData));
        return true;
      } else {
        console.log('AuthContext - Login failed: Invalid credentials');
        return false;
      }
    } catch (error) {
      console.error('AuthContext - Login error:', error);
      return false;
    }
  };

  const logout = () => {
    console.log('AuthContext - Logging out');
    setUser(null);
    localStorage.removeItem('tekvoro_user');
  };

  console.log('AuthContext - Current state:', {
    user,
    isAuthenticated: !!user,
    isLoading
  });

  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        setCustomPassword,
        getCustomPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };