import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import NotificationBadge from './NotificationBadge';
import UserMenu from './UserMenu';

const Header = ({ currentUser, onNavigate, notificationCounts = {} }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Messages',
      path: '/chat-dashboard',
      icon: 'MessageCircle',
      badge: notificationCounts?.messages || 0
    },
    {
      label: 'Groups',
      path: '/group-chat-management',
      icon: 'Users',
      badge: notificationCounts?.groups || 0
    },
    {
      label: 'Profile',
      path: '/user-profile-settings',
      icon: 'User'
    }
  ];

  const adminItems = [
    {
      label: 'Admin',
      path: '/admin-dashboard',
      icon: 'Shield',
      adminOnly: true
    }
  ];

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">ChatFlow</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <div key={item?.path} className="relative">
              <Button
                variant="ghost"
                onClick={() => handleNavigation(item?.path)}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-accent/50 transition-colors duration-200"
              >
                <Icon name={item?.icon} size={18} />
                <span className="text-sm font-medium">{item?.label}</span>
              </Button>
              {item?.badge > 0 && (
                <NotificationBadge count={item?.badge} className="absolute -top-1 -right-1" />
              )}
            </div>
          ))}
          
          {/* Admin Section - Only visible to admin users */}
          {currentUser?.role === 'admin' && adminItems?.map((item) => (
            <div key={item?.path} className="relative">
              <Button
                variant="ghost"
                onClick={() => handleNavigation(item?.path)}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-accent/50 transition-colors duration-200"
              >
                <Icon name={item?.icon} size={18} />
                <span className="text-sm font-medium">{item?.label}</span>
              </Button>
            </div>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearchToggle}
            className="hover:bg-accent/50 transition-colors duration-200"
          >
            <Icon name="Search" size={20} />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-accent/50 transition-colors duration-200"
            >
              <Icon name="Bell" size={20} />
            </Button>
            {(notificationCounts?.total || 0) > 0 && (
              <NotificationBadge 
                count={notificationCounts?.total} 
                className="absolute -top-1 -right-1" 
              />
            )}
          </div>

          {/* User Menu */}
          <UserMenu 
            currentUser={currentUser} 
            onNavigate={onNavigate}
          />
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border">
        <nav className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => (
            <div key={item?.path} className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                className="flex flex-col items-center space-y-1 px-2 py-2 hover:bg-accent/50 transition-colors duration-200"
              >
                <Icon name={item?.icon} size={16} />
                <span className="text-xs font-medium">{item?.label}</span>
              </Button>
              {item?.badge > 0 && (
                <NotificationBadge count={item?.badge} className="absolute -top-1 -right-1" />
              )}
            </div>
          ))}
          
          {/* Admin for mobile */}
          {currentUser?.role === 'admin' && adminItems?.map((item) => (
            <div key={item?.path} className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                className="flex flex-col items-center space-y-1 px-2 py-2 hover:bg-accent/50 transition-colors duration-200"
              >
                <Icon name={item?.icon} size={16} />
                <span className="text-xs font-medium">{item?.label}</span>
              </Button>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;