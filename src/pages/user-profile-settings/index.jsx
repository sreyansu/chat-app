import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ProfileInformation from './components/ProfileInformation';
import AccountSecurity from './components/AccountSecurity';
import PrivacySettings from './components/PrivacySettings';
import NotificationPreferences from './components/NotificationPreferences';
import AccountDeletion from './components/AccountDeletion';

const UserProfileSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    username: "john_doe",
    email: "john.doe@example.com",
    displayName: "John Doe",
    statusMessage: "Available for chat",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "user",
    status: "online",
    twoFactorEnabled: false,
    privacySettings: {
      messageEncryption: true,
      onlineStatusVisibility: 'everyone',
      readReceipts: true,
      profileVisibility: 'contacts',
      lastSeenVisibility: 'contacts',
      typingIndicators: true,
      messageForwarding: true,
      groupInvites: 'everyone',
      dataCollection: false
    },
    notificationSettings: {
      browserPush: true,
      emailNotifications: true,
      mentionAlerts: true,
      messagePreview: true,
      soundEnabled: true,
      soundType: 'default',
      quietHours: false,
      quietStart: '22:00',
      quietEnd: '08:00',
      groupNotifications: 'mentions',
      directMessages: 'all',
      vibration: true
    }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Personal information and avatar'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      description: 'Password and authentication'
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: 'Lock',
      description: 'Privacy controls and data settings'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Alert preferences and sounds'
    },
    {
      id: 'deletion',
      label: 'Delete Account',
      icon: 'Trash2',
      description: 'Permanently remove your account',
      variant: 'destructive'
    }
  ];

  const notificationCounts = {
    messages: 3,
    groups: 1,
    total: 4
  };

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = () => {
      // In a real app, this would fetch from an API
      console.log('Loading user profile settings...');
    };
    
    loadUserData();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const showSaveMessage = (message, type = 'success') => {
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleUpdateProfile = async (profileData) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setCurrentUser(prev => ({
        ...prev,
        ...profileData
      }));
      setIsSaving(false);
      showSaveMessage('Profile updated successfully');
    }, 1000);
  };

  const handleUpdateSecurity = async (securityData) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      if (securityData?.type === 'password') {
        showSaveMessage('Password updated successfully');
      } else if (securityData?.type === 'twoFactor') {
        setCurrentUser(prev => ({
          ...prev,
          twoFactorEnabled: securityData?.data?.enabled
        }));
        showSaveMessage(
          securityData?.data?.enabled 
            ? 'Two-factor authentication enabled' :'Two-factor authentication disabled'
        );
      } else if (securityData?.type === 'terminateSession') {
        showSaveMessage('Session terminated successfully');
      }
      setIsSaving(false);
    }, 1000);
  };

  const handleUpdatePrivacy = async (privacySettings) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setCurrentUser(prev => ({
        ...prev,
        privacySettings
      }));
      setIsSaving(false);
      showSaveMessage('Privacy settings updated');
    }, 500);
  };

  const handleUpdateNotifications = async (notificationSettings) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setCurrentUser(prev => ({
        ...prev,
        notificationSettings
      }));
      setIsSaving(false);
      showSaveMessage('Notification preferences updated');
    }, 500);
  };

  const handleDeleteAccount = async (deletionData) => {
    // In a real app, this would handle account deletion
    console.log('Account deletion requested:', deletionData);
    
    if (deletionData?.dataExport) {
      // Trigger data export
      const exportData = {
        profile: currentUser,
        deletionReason: deletionData?.reason,
        exportDate: new Date()?.toISOString()
      };
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `chatflow-account-export-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
      link?.click();
      URL.revokeObjectURL(url);
    }
    
    // Simulate account deletion process
    setTimeout(() => {
      alert('Account deletion completed. You will be redirected to the login page.');
      navigate('/login');
    }, 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileInformation
            currentUser={currentUser}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'security':
        return (
          <AccountSecurity
            currentUser={currentUser}
            onUpdateSecurity={handleUpdateSecurity}
          />
        );
      case 'privacy':
        return (
          <PrivacySettings
            currentUser={currentUser}
            onUpdatePrivacy={handleUpdatePrivacy}
          />
        );
      case 'notifications':
        return (
          <NotificationPreferences
            currentUser={currentUser}
            onUpdateNotifications={handleUpdateNotifications}
          />
        );
      case 'deletion':
        return (
          <AccountDeletion
            currentUser={currentUser}
            onDeleteAccount={handleDeleteAccount}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentUser={currentUser}
        onNavigate={handleNavigation}
        notificationCounts={notificationCounts}
      />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/chat-dashboard')}
                className="hover:bg-accent/50"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
            </div>
            <p className="text-muted-foreground">
              Manage your profile, security, privacy, and notification preferences
            </p>
          </div>

          {/* Save Message */}
          {saveMessage && (
            <div className="mb-6 bg-success/10 border border-success/20 rounded-lg p-4 animate-scale-in">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm text-success font-medium">{saveMessage}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
                <nav className="space-y-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors duration-200
                        ${activeTab === tab?.id
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : tab?.variant === 'destructive' ?'hover:bg-error/10 text-muted-foreground hover:text-error' :'hover:bg-accent/50 text-muted-foreground hover:text-foreground'
                        }
                      `}
                    >
                      <Icon 
                        name={tab?.icon} 
                        size={18} 
                        className={
                          activeTab === tab?.id
                            ? 'text-primary'
                            : tab?.variant === 'destructive' ?'text-muted-foreground group-hover:text-error' :'text-muted-foreground'
                        }
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{tab?.label}</div>
                        <div className="text-xs opacity-75 truncate">{tab?.description}</div>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-lg p-6 min-h-[600px]">
                {isSaving && (
                  <div className="mb-6 flex items-center space-x-2 text-muted-foreground">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Saving changes...</span>
                  </div>
                )}
                
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;