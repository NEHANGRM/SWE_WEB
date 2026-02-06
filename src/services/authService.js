// Mock Authentication Service for Frontend-only Demo
export const authService = {
    // Register new user
    register: async (userData) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockUser = {
            id: 'mock-user-123',
            name: userData.name || 'Demo User',
            email: userData.email,
            role: 'user',
            avatar: null
        };

        const mockToken = 'mock-jwt-token-xyz';

        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));

        return {
            success: true,
            message: 'Registration successful (Demo Mode)',
            data: { user: mockUser, token: mockToken }
        };
    },

    // Login user
    login: async (credentials) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockUser = {
            id: 'mock-user-123',
            name: 'Demo User',
            email: credentials.email,
            role: 'user',
            avatar: null
        };

        const mockToken = 'mock-jwt-token-xyz';

        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));

        return {
            success: true,
            message: 'Login successful (Demo Mode)',
            data: { user: mockUser, token: mockToken }
        };
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Get current user
    getMe: async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return {
            success: true,
            data: user
        };
    },

    // Update profile
    updateProfile: async (userData) => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const updatedUser = { ...currentUser, ...userData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return {
            success: true,
            data: updatedUser
        };
    },

    // Update password
    updatePassword: async (passwords) => {
        return {
            success: true,
            message: 'Password updated successfully (Demo Mode)'
        };
    },

    // Get stored user
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },
};
