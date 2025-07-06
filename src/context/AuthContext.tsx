import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  validateSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get the base URL for API calls
  const getBaseUrl = () => {
    return import.meta.env.DEV ? 'http://localhost:8888' : 'https://tekvoro.com';
  };

  useEffect(() => {
    // Check for saved session on mount
    const initializeAuth = async () => {
      try {
        const sessionToken = localStorage.getItem('tekvoro_session_token');
        const sessionHash = localStorage.getItem('tekvoro_session_hash');
        const savedUser = localStorage.getItem('tekvoro_user');
        
        if (sessionToken && sessionHash && savedUser) {
          // Validate session with server
          const isValid = await validateSession();
          if (!isValid) {
            // Clear invalid session
            localStorage.removeItem('tekvoro_session_token');
            localStorage.removeItem('tekvoro_session_hash');
            localStorage.removeItem('tekvoro_user');
          }
        }
      } catch (error) {
        console.error('AuthContext - Failed to initialize auth:', error);
        // Clear any corrupted data
        localStorage.removeItem('tekvoro_session_token');
        localStorage.removeItem('tekvoro_session_hash');
        localStorage.removeItem('tekvoro_user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('AuthContext - Login attempt:', { email });
    
    try {
      const response = await fetch(`${getBaseUrl()}/.netlify/functions/admin-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log('AuthContext - Login successful');
        
        // Store session data
        localStorage.setItem('tekvoro_session_token', data.sessionToken);
        localStorage.setItem('tekvoro_session_hash', data.sessionHash);
        localStorage.setItem('tekvoro_user', JSON.stringify(data.user));
        
        setUser(data.user);
        return true;
      } else {
        console.log('AuthContext - Login failed:', data.error);
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
    localStorage.removeItem('tekvoro_session_token');
    localStorage.removeItem('tekvoro_session_hash');
    localStorage.removeItem('tekvoro_user');
  };

  const validateSession = async (): Promise<boolean> => {
    try {
      const sessionToken = localStorage.getItem('tekvoro_session_token');
      const sessionHash = localStorage.getItem('tekvoro_session_hash');
      
      if (!sessionToken || !sessionHash) {
        return false;
      }

      const response = await fetch(`${getBaseUrl()}/.netlify/functions/validate-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionToken, sessionHash }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.user);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('AuthContext - Session validation error:', error);
      return false;
    }
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
        validateSession
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