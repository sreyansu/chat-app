import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import OAuthOptions from './components/OAuthOptions';
import LoginRedirect from './components/LoginRedirect';
import RegistrationSuccess from './components/RegistrationSuccess';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form' | 'success'
  const [registeredEmail, setRegisteredEmail] = useState('');

  // Mock user data for demonstration
  const mockUsers = [
    { email: 'john.doe@example.com', username: 'johndoe' },
    { email: 'jane.smith@example.com', username: 'janesmith' },
    { email: 'admin@chatflow.com', username: 'admin' }
  ];

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check for existing users (mock validation)
      const existingUser = mockUsers?.find(
        user => user?.email?.toLowerCase() === formData?.email?.toLowerCase() ||
                user?.username?.toLowerCase() === formData?.username?.toLowerCase()
      );

      if (existingUser) {
        throw new Error(
          existingUser.email.toLowerCase() === formData.email.toLowerCase()
            ? 'An account with this email already exists' :'This username is already taken'
        );
      }

      // Mock successful registration
      console.log('Registration successful:', {
        username: formData?.username,
        email: formData?.email,
        timestamp: new Date()?.toISOString()
      });

      setRegisteredEmail(formData?.email);
      setRegistrationStep('success');

    } catch (error) {
      console.error('Registration failed:', error?.message);
      // In a real app, you would show this error to the user
      alert(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignup = async (provider) => {
    setIsLoading(true);

    try {
      // Simulate OAuth flow delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock OAuth success
      console.log(`OAuth registration with ${provider} successful`);
      
      // Mock email for OAuth registration
      const mockOAuthEmail = `user@${provider}.com`;
      setRegisteredEmail(mockOAuthEmail);
      setRegistrationStep('success');

    } catch (error) {
      console.error(`OAuth registration with ${provider} failed:`, error);
      alert(`Failed to register with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleContinueToDashboard = () => {
    // In a real app, you would check if email is verified
    navigate('/chat-dashboard');
  };

  const handleResendVerification = async () => {
    try {
      // Simulate resend verification email
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Verification email resent to:', registeredEmail);
      alert('Verification email has been resent. Please check your inbox.');
    } catch (error) {
      console.error('Failed to resend verification email:', error);
      alert('Failed to resend verification email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl border border-border p-8">
          {registrationStep === 'form' ? (
            <>
              <RegistrationHeader />
              
              <div className="space-y-6">
                <RegistrationForm 
                  onSubmit={handleFormSubmit}
                  isLoading={isLoading}
                />
                
                <OAuthOptions 
                  onOAuthSignup={handleOAuthSignup}
                  isLoading={isLoading}
                />
                
                <LoginRedirect 
                  onNavigateToLogin={handleNavigateToLogin}
                />
              </div>
            </>
          ) : (
            <RegistrationSuccess
              userEmail={registeredEmail}
              onContinue={handleContinueToDashboard}
              onResendVerification={handleResendVerification}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-muted-foreground">
          <p>
            © {new Date()?.getFullYear()} ChatFlow. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="hover:text-primary transition-colors duration-200">
              Privacy Policy
            </button>
            <button className="hover:text-primary transition-colors duration-200">
              Terms of Service
            </button>
            <button className="hover:text-primary transition-colors duration-200">
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;