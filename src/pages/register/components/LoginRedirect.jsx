import React from 'react';
import Button from '../../../components/ui/Button';

const LoginRedirect = ({ onNavigateToLogin }) => {
  return (
    <div className="text-center space-y-4 pt-6 border-t border-border">
      <p className="text-muted-foreground">
        Already have an account?
      </p>
      <Button
        variant="ghost"
        onClick={onNavigateToLogin}
        className="text-primary hover:text-primary/80 hover:bg-primary/10"
      >
        Sign in to your account
      </Button>
    </div>
  );
};

export default LoginRedirect;