import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OAuthOptions = ({ onOAuthSignup, isLoading }) => {
  const oauthProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'hover:bg-red-500/10 hover:border-red-500/20',
      textColor: 'text-red-400'
    },
    {
      name: 'GitHub',
      icon: 'Github',
      color: 'hover:bg-gray-500/10 hover:border-gray-500/20',
      textColor: 'text-gray-400'
    }
  ];

  const handleOAuthClick = (provider) => {
    if (onOAuthSignup) {
      onOAuthSignup(provider?.name?.toLowerCase());
    }
  };

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      {/* OAuth Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {oauthProviders?.map((provider) => (
          <Button
            key={provider?.name}
            variant="outline"
            onClick={() => handleOAuthClick(provider)}
            disabled={isLoading}
            className={`
              flex items-center justify-center space-x-2 py-3
              border-border bg-card
              transition-all duration-200
              ${provider?.color}
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <Icon 
              name={provider?.icon} 
              size={18} 
              className={provider?.textColor}
            />
            <span className="font-medium">
              {provider?.name}
            </span>
          </Button>
        ))}
      </div>
      {/* OAuth Disclaimer */}
      <div className="text-xs text-muted-foreground text-center">
        By signing up with OAuth, you agree to our Terms of Service and Privacy Policy
      </div>
    </div>
  );
};

export default OAuthOptions;