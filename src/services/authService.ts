const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Authentication Service
class AuthService {
  private tokenKey = 'tekvoro_auth_token';
  private userKey = 'tekvoro_user_data';

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Store token
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Remove token
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Get stored user data
  getUser(): any | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  // Store user data
  setUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Remove user data
  removeUser(): void {
    localStorage.removeItem(this.userKey);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  // Check if user is admin
  isAdmin(): boolean {
    const user = this.getUser();
    return user && user.role === 'admin';
  }

  // Generic API request with auth
  private async authRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = this.getToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        // Token expired or invalid
        this.logout();
        throw new Error('Authentication required');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Auth API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Register new user
  async register(userData: {
    email: string;
    name: string;
    password: string;
    company?: string;
    role?: 'client' | 'subscriber';
  }): Promise<{ success: boolean; message: string; user?: any; token?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();

      if (data.token && data.user) {
        this.setToken(data.token);
        this.setUser(data.user);
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Login user
  async login(credentials: {
    email: string;
    password: string;
  }): Promise<{ success: boolean; message: string; user?: any; token?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();

      if (data.token && data.user) {
        this.setToken(data.token);
        this.setUser(data.user);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Logout user
  logout(): void {
    this.removeToken();
    this.removeUser();
  }

  // Get current user profile
  async getProfile(): Promise<any> {
    const data = await this.authRequest('/auth/profile');
    if (data.user) {
      this.setUser(data.user);
    }
    return data.user;
  }

  // Update user profile
  async updateProfile(updates: {
    name?: string;
    company?: string;
  }): Promise<{ success: boolean; message: string; user?: any }> {
    const data = await this.authRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });

    if (data.user) {
      this.setUser(data.user);
    }

    return data;
  }

  // Change password
  async changePassword(passwords: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ success: boolean; message: string }> {
    return await this.authRequest('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwords),
    });
  }

  // Get all users (Admin only)
  async getUsers(params: {
    page?: number;
    limit?: number;
    role?: string;
    status?: string;
  } = {}): Promise<{ users: any[]; pagination: any }> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    return await this.authRequest(`/auth/users?${queryParams}`);
  }

  // Update user status (Admin only)
  async updateUserStatus(userId: string, status: string): Promise<{ success: boolean; message: string; user?: any }> {
    return await this.authRequest(`/auth/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Initialize auth state on app load
  async initializeAuth(): Promise<boolean> {
    try {
      if (this.isAuthenticated()) {
        // Verify token is still valid
        await this.getProfile();
        return true;
      }
      return false;
    } catch (error) {
      // Token invalid, clear auth state
      this.logout();
      return false;
    }
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService;
