import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import PresenceIndicator from './PresenceIndicator';

const UserMenu = ({ currentUser, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (action, path) => {
    setIsOpen(false);
    if (action === 'navigate' && onNavigate) {
      onNavigate(path);
    } else if (action === 'logout') {
      // Handle logout logic here
      console.log('Logout clicked');
    }
  };

  const menuItems = [
    {
      label: 'Profile Settings',
      icon: 'Settings',
      action: 'navigate',
      path: '/user-profile-settings'
    },
    ...(currentUser?.role === 'admin' ? [{
      label: 'Admin Dashboard',
      icon: 'Shield',
      action: 'navigate',
      path: '/admin-dashboard'
    }] : []),
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      action: 'help'
    },
    {
      label: 'Sign Out',
      icon: 'LogOut',
      action: 'logout',
      variant: 'destructive'
    }
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <Button
        variant="ghost"
        onClick={handleMenuToggle}
        className="flex items-center space-x-2 px-2 py-2 hover:bg-accent/50 transition-colors duration-200"
      >
        <div className="relative">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            {currentUser?.avatar ? (
              <img 
                src={currentUser?.avatar} 
                alt={currentUser?.name || 'User'} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <Icon name="User" size={16} />
            )}
          </div>
          <PresenceIndicator 
            status={currentUser?.status || 'offline'} 
            size="sm" 
            className="absolute -bottom-0.5 -right-0.5"
          />
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-foreground">
            {currentUser?.name || 'User'}
          </div>
          <div className="text-xs text-muted-foreground">
            {currentUser?.email || 'user@example.com'}
          </div>
        </div>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="hidden md:block transition-transform duration-200"
        />
      </Button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevation-2 z-200 animate-scale-in">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  {currentUser?.avatar ? (
                    <img 
                      src={currentUser?.avatar} 
                      alt={currentUser?.name || 'User'} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Icon name="User" size={20} />
                  )}
                </div>
                <PresenceIndicator 
                  status={currentUser?.status || 'offline'} 
                  size="default" 
                  className="absolute -bottom-1 -right-1"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-popover-foreground truncate">
                  {currentUser?.name || 'User'}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {currentUser?.email || 'user@example.com'}
                </div>
                {currentUser?.role === 'admin' && (
                  <div className="text-xs text-primary font-medium">
                    Administrator
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems?.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuItemClick(item?.action, item?.path)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-2 text-left
                  hover:bg-accent/50 transition-colors duration-200
                  ${item?.variant === 'destructive' ?'text-destructive hover:text-destructive' :'text-popover-foreground'
                  }
                `}
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  className={item?.variant === 'destructive' ? 'text-destructive' : ''}
                />
                <span className="text-sm font-medium">{item?.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;