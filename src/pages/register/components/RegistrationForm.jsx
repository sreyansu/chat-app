import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const requirements = {
      length: password?.length >= 8,
      uppercase: /[A-Z]/?.test(password),
      lowercase: /[a-z]/?.test(password),
      number: /\d/?.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };
    
    const score = Object.values(requirements)?.filter(Boolean)?.length;
    return { requirements, score };
  };

  const getPasswordStrength = (password) => {
    const { score } = validatePassword(password);
    if (score < 2) return { text: 'Weak', color: 'text-error', bgColor: 'bg-error' };
    if (score < 4) return { text: 'Medium', color: 'text-warning', bgColor: 'bg-warning' };
    return { text: 'Strong', color: 'text-primary', bgColor: 'bg-primary' };
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData?.username?.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData?.username?.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/?.test(formData?.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Email validation
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else {
      const { requirements } = validatePassword(formData?.password);
      if (!requirements?.length) {
        newErrors.password = 'Password must be at least 8 characters long';
      } else if (!requirements?.uppercase || !requirements?.lowercase || !requirements?.number) {
        newErrors.password = 'Password must contain uppercase, lowercase, and number';
      }
    }

    // Confirm password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms agreement validation
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, agreedToTerms });
    }
  };

  const passwordStrength = formData?.password ? getPasswordStrength(formData?.password) : null;
  const { requirements } = formData?.password ? validatePassword(formData?.password) : { requirements: {} };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Username Field */}
      <Input
        label="Username"
        type="text"
        name="username"
        placeholder="Enter your username"
        value={formData?.username}
        onChange={handleInputChange}
        error={errors?.username}
        required
        className="w-full"
      />
      {/* Email Field */}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email address"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
        className="w-full"
      />
      {/* Password Field */}
      <div className="space-y-2">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>

        {/* Password Strength Indicator */}
        {formData?.password && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${passwordStrength?.bgColor}`}
                  style={{ width: `${(passwordStrength?.text === 'Weak' ? 33 : passwordStrength?.text === 'Medium' ? 66 : 100)}%` }}
                />
              </div>
              <span className={`text-sm font-medium ${passwordStrength?.color}`}>
                {passwordStrength?.text}
              </span>
            </div>
            
            {/* Password Requirements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
              <div className={`flex items-center space-x-1 ${requirements?.length ? 'text-primary' : 'text-muted-foreground'}`}>
                <Icon name={requirements?.length ? "Check" : "X"} size={12} />
                <span>8+ characters</span>
              </div>
              <div className={`flex items-center space-x-1 ${requirements?.uppercase ? 'text-primary' : 'text-muted-foreground'}`}>
                <Icon name={requirements?.uppercase ? "Check" : "X"} size={12} />
                <span>Uppercase letter</span>
              </div>
              <div className={`flex items-center space-x-1 ${requirements?.lowercase ? 'text-primary' : 'text-muted-foreground'}`}>
                <Icon name={requirements?.lowercase ? "Check" : "X"} size={12} />
                <span>Lowercase letter</span>
              </div>
              <div className={`flex items-center space-x-1 ${requirements?.number ? 'text-primary' : 'text-muted-foreground'}`}>
                <Icon name={requirements?.number ? "Check" : "X"} size={12} />
                <span>Number</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Confirm Password Field */}
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
          className="w-full pr-12"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
        </button>
      </div>
      {/* Terms and Conditions */}
      <div className="space-y-2">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e?.target?.checked)}
          error={errors?.terms}
          required
        />
        <div className="text-xs text-muted-foreground">
          By creating an account, you agree to our{' '}
          <button type="button" className="text-primary hover:underline">
            Terms of Service
          </button>{' '}
          and{' '}
          <button type="button" className="text-primary hover:underline">
            Privacy Policy
          </button>
        </div>
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        loading={isLoading}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;