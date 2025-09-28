import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import OAuthButtons from './components/OAuthButtons';
import LoginHeader from './components/LoginHeader';
import LoginFooter from './components/LoginFooter';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock credentials for testing
  const mockCredentials = {
    email: "admin@chatflow.com",
    password: "admin123"
  };

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/chat-dashboard');
    }
  }, [navigate]);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication logic
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Mock successful login
        const mockToken = 'mock-jwt-token-' + Date.now();
        const mockUser = {
          id: 1,
          name: 'Admin User',
          email: formData?.email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          role: 'admin',
          status: 'online'
        };

        // Store authentication data
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Navigate to dashboard
        navigate('/chat-dashboard');
      } else {
        setError(`Invalid credentials. Use email: ${mockCredentials?.email} and password: ${mockCredentials?.password}`);
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate OAuth flow delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock OAuth success
      const mockToken = `mock-${provider}-token-` + Date.now();
      const mockUser = {
        id: 2,
        name: provider === 'google' ? 'Google User' : 'GitHub User',
        email: `user@${provider}.com`,
        avatar: provider === 'google' ?'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' :'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        role: 'user',
        status: 'online'
      };

      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      
      navigate('/chat-dashboard');
    } catch (err) {
      setError(`${provider} authentication failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8 space-y-8">
          {/* Header */}
          <LoginHeader />

          {/* Login Form */}
          <LoginForm 
            onLogin={handleLogin}
            isLoading={isLoading}
            error={error}
          />

          {/* OAuth Buttons */}
          <OAuthButtons 
            onOAuthLogin={handleOAuthLogin}
            isLoading={isLoading}
          />

          {/* Footer */}
          <LoginFooter onNavigateToRegister={handleNavigateToRegister} />
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <div className="bg-card/50 border border-border/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs font-mono">
              <p className="text-foreground">Email: {mockCredentials?.email}</p>
              <p className="text-foreground">Password: {mockCredentials?.password}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;