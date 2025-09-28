import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import GroupInfoCard from './components/GroupInfoCard';
import ParticipantsList from './components/ParticipantsList';
import GroupSettings from './components/GroupSettings';
import MediaGallery from './components/MediaGallery';
import ModerationTools from './components/ModerationTools';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const GroupChatManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  const [currentUser, setCurrentUser] = useState(null);
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock current user data
  const mockCurrentUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    status: "online",
    role: "user"
  };

  // Mock group data
  const mockGroupData = {
    id: 1,
    name: "Product Development Team",
    description: "Collaboration space for our product development initiatives, feature discussions, and sprint planning activities.",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop",
    isPrivate: true,
    createdBy: "Michael Chen",
    createdAt: "March 15, 2024",
    messageCount: 1247,
    mediaCount: 89,
    participants: [
      {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        status: "online",
        joinedAt: "March 15, 2024"
      },
      {
        id: 2,
        name: "Michael Chen",
        email: "michael.chen@example.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        status: "online",
        joinedAt: "March 15, 2024"
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        email: "emily.rodriguez@example.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        status: "away",
        joinedAt: "March 16, 2024"
      },
      {
        id: 4,
        name: "David Kim",
        email: "david.kim@example.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        status: "offline",
        joinedAt: "March 17, 2024"
      },
      {
        id: 5,
        name: "Lisa Wang",
        email: "lisa.wang@example.com",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        status: "online",
        joinedAt: "March 18, 2024"
      }
    ],
    admins: [
      {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com"
      },
      {
        id: 2,
        name: "Michael Chen",
        email: "michael.chen@example.com"
      }
    ],
    moderators: [
      {
        id: 3,
        name: "Emily Rodriguez",
        email: "emily.rodriguez@example.com"
      }
    ],
    settings: {
      allowMemberInvites: true,
      allowMediaSharing: true,
      allowMessageEditing: true,
      allowMessageDeletion: false,
      enableReadReceipts: true,
      enableTypingIndicators: true,
      muteNotifications: false,
      archiveOldMessages: true
    },
    mediaFiles: [
      {
        id: 1,
        name: "product-mockup-v2.png",
        type: "image",
        url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
        size: 2048576,
        uploadedBy: 2,
        uploadedByName: "Michael Chen",
        uploadedAt: "2 days ago"
      },
      {
        id: 2,
        name: "sprint-planning.pdf",
        type: "document",
        url: "/assets/documents/sprint-planning.pdf",
        size: 1024000,
        uploadedBy: 1,
        uploadedByName: "Sarah Johnson",
        uploadedAt: "1 week ago"
      },
      {
        id: 3,
        name: "demo-video.mp4",
        type: "video",
        url: "/assets/videos/demo-video.mp4",
        size: 15728640,
        uploadedBy: 3,
        uploadedByName: "Emily Rodriguez",
        uploadedAt: "3 days ago"
      },
      {
        id: 4,
        name: "wireframes-final.png",
        type: "image",
        url: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop",
        size: 1536000,
        uploadedBy: 4,
        uploadedByName: "David Kim",
        uploadedAt: "5 days ago"
      }
    ]
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setCurrentUser(mockCurrentUser);
      setGroupData(mockGroupData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleUpdateGroup = (updatedInfo) => {
    setGroupData(prev => ({
      ...prev,
      ...updatedInfo
    }));
  };

  const handleRemoveParticipant = (participantId) => {
    setGroupData(prev => ({
      ...prev,
      participants: prev?.participants?.filter(p => p?.id !== participantId)
    }));
  };

  const handleChangeRole = (participantId, newRole) => {
    const participant = groupData?.participants?.find(p => p?.id === participantId);
    if (!participant) return;

    setGroupData(prev => {
      let newAdmins = [...prev?.admins];
      let newModerators = [...prev?.moderators];

      // Remove from current roles
      newAdmins = newAdmins?.filter(a => a?.id !== participantId);
      newModerators = newModerators?.filter(m => m?.id !== participantId);

      // Add to new role
      if (newRole === 'admin') {
        newAdmins?.push({ id: participant?.id, name: participant?.name, email: participant?.email });
      } else if (newRole === 'moderator') {
        newModerators?.push({ id: participant?.id, name: participant?.name, email: participant?.email });
      }

      return {
        ...prev,
        admins: newAdmins,
        moderators: newModerators
      };
    });
  };

  const handleUpdateSettings = (newSettings) => {
    setGroupData(prev => ({
      ...prev,
      settings: newSettings
    }));
  };

  const handleDownloadMedia = (mediaId) => {
    const media = groupData?.mediaFiles?.find(m => m?.id === mediaId);
    if (media) {
      // Simulate download
      console.log(`Downloading ${media?.name}`);
    }
  };

  const handleDeleteMedia = (mediaId) => {
    setGroupData(prev => ({
      ...prev,
      mediaFiles: prev?.mediaFiles?.filter(m => m?.id !== mediaId)
    }));
  };

  const handleArchiveGroup = () => {
    console.log('Group archived');
    navigate('/chat-dashboard');
  };

  const handleDeleteGroup = () => {
    console.log('Group deleted');
    navigate('/chat-dashboard');
  };

  const handleExportChat = () => {
    console.log('Exporting chat history');
  };

  const tabs = [
    { key: 'info', label: 'Group Info', icon: 'Info' },
    { key: 'participants', label: 'Participants', icon: 'Users' },
    { key: 'settings', label: 'Settings', icon: 'Settings' },
    { key: 'media', label: 'Media', icon: 'Image' },
    { key: 'moderation', label: 'Moderation', icon: 'Shield' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header currentUser={currentUser} onNavigate={handleNavigation} />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-foreground">Loading group details...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentUser={currentUser} onNavigate={handleNavigation} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/chat-dashboard')}
                iconName="ArrowLeft"
              />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Group Management</h1>
                <p className="text-muted-foreground">
                  Manage participants, settings, and content for your group
                </p>
              </div>
            </div>
            <Button
              variant="default"
              onClick={() => navigate('/chat-dashboard')}
              iconName="MessageCircle"
              iconPosition="left"
            >
              Back to Chat
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.key}
                  onClick={() => setActiveTab(tab?.key)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab?.key
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'info' && (
              <GroupInfoCard
                group={groupData}
                currentUser={currentUser}
                onUpdateGroup={handleUpdateGroup}
              />
            )}

            {activeTab === 'participants' && (
              <ParticipantsList
                participants={groupData?.participants}
                admins={groupData?.admins}
                moderators={groupData?.moderators}
                currentUser={currentUser}
                onRemoveParticipant={handleRemoveParticipant}
                onChangeRole={handleChangeRole}
              />
            )}

            {activeTab === 'settings' && (
              <GroupSettings
                settings={groupData?.settings}
                currentUser={currentUser}
                admins={groupData?.admins}
                onUpdateSettings={handleUpdateSettings}
              />
            )}

            {activeTab === 'media' && (
              <MediaGallery
                mediaFiles={groupData?.mediaFiles}
                onDownload={handleDownloadMedia}
                onDelete={handleDeleteMedia}
                currentUser={currentUser}
                admins={groupData?.admins}
              />
            )}

            {activeTab === 'moderation' && (
              <ModerationTools
                group={groupData}
                currentUser={currentUser}
                admins={groupData?.admins}
                moderators={groupData?.moderators}
                onArchiveGroup={handleArchiveGroup}
                onDeleteGroup={handleDeleteGroup}
                onExportChat={handleExportChat}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatManagement;