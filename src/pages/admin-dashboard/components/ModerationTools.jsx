import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ModerationTools = () => {
  const [activeTab, setActiveTab] = useState('flagged');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const flaggedMessages = [
    {
      id: 1,
      content: "This message contains inappropriate language and violates community guidelines regarding respectful communication.",
      sender: "John Smith",
      senderAvatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150",
      channel: "General Discussion",
      timestamp: "2024-09-03 08:15:23",
      priority: "high",
      reportCount: 5,
      reason: "Inappropriate Language",
      status: "pending"
    },
    {
      id: 2,
      content: "Spam message promoting external services without permission from administrators.",
      sender: "Marketing Bot",
      senderAvatar: "https://images.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png?w=150",
      channel: "Announcements",
      timestamp: "2024-09-03 07:42:11",
      priority: "medium",
      reportCount: 3,
      reason: "Spam Content",
      status: "pending"
    },
    {
      id: 3,
      content: "Message contains potential harassment targeting specific community members.",
      sender: "Anonymous User",
      senderAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      channel: "Support",
      timestamp: "2024-09-03 06:28:45",
      priority: "high",
      reportCount: 8,
      reason: "Harassment",
      status: "under_review"
    }
  ];

  const userReports = [
    {
      id: 1,
      reportedUser: "Alex Johnson",
      reportedAvatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150",
      reporter: "Sarah Wilson",
      reporterAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      reason: "Repeated violations of community guidelines",
      description: "User has been consistently posting inappropriate content despite warnings.",
      timestamp: "2024-09-03 09:12:34",
      priority: "high",
      status: "pending",
      evidence: 4
    },
    {
      id: 2,
      reportedUser: "Mike Davis",
      reportedAvatar: "https://images.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg?w=150",
      reporter: "Emma Brown",
      reporterAvatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150",
      reason: "Suspicious account activity",
      description: "Account shows signs of automated behavior and potential bot activity.",
      timestamp: "2024-09-03 08:45:12",
      priority: "medium",
      status: "investigating",
      evidence: 2
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error text-error-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'under_review':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'investigating':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'resolved':
        return 'bg-success/20 text-success border-success/30';
      case 'dismissed':
        return 'bg-muted/20 text-muted-foreground border-muted/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const handleModerationAction = (id, action) => {
    console.log(`${action} item ${id}`);
  };

  const tabs = [
    { id: 'flagged', label: 'Flagged Messages', icon: 'Flag', count: flaggedMessages?.length },
    { id: 'reports', label: 'User Reports', icon: 'AlertTriangle', count: userReports?.length },
    { id: 'appeals', label: 'Appeals', icon: 'Scale', count: 2 }
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Moderation Tools</h2>
          <div className="flex items-center space-x-2">
            <div className="w-48">
              <Select
                options={priorityOptions}
                value={priorityFilter}
                onChange={setPriorityFilter}
                placeholder="Filter by priority"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export Report
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted/50 rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              {tab?.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {activeTab === 'flagged' && (
          <div className="space-y-4">
            {flaggedMessages?.map((message) => (
              <div key={message?.id} className="border border-border rounded-lg p-4 hover:bg-accent/20 transition-colors duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary">
                      <img
                        src={message?.senderAvatar}
                        alt={message?.sender}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{message?.sender}</div>
                      <div className="text-sm text-muted-foreground">
                        #{message?.channel} • {new Date(message.timestamp)?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(message?.priority)}`}>
                      {message?.priority} priority
                    </span>
                    <span className={`px-2 py-1 rounded border text-xs font-medium ${getStatusColor(message?.status)}`}>
                      {message?.status?.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="bg-accent/30 rounded-lg p-3 mb-4">
                  <p className="text-sm text-foreground">{message?.content}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Flag" size={14} />
                      <span>{message?.reportCount} reports</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="AlertCircle" size={14} />
                      <span>{message?.reason}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleModerationAction(message?.id, 'dismiss')}
                      iconName="X"
                    >
                      Dismiss
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleModerationAction(message?.id, 'warn')}
                      iconName="AlertTriangle"
                    >
                      Warn User
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleModerationAction(message?.id, 'remove')}
                      iconName="Trash2"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-4">
            {userReports?.map((report) => (
              <div key={report?.id} className="border border-border rounded-lg p-4 hover:bg-accent/20 transition-colors duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary">
                        <img
                          src={report?.reportedAvatar}
                          alt={report?.reportedUser}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/assets/images/no_image.png';
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{report?.reportedUser}</div>
                        <div className="text-sm text-muted-foreground">Reported User</div>
                      </div>
                    </div>
                    <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary">
                        <img
                          src={report?.reporterAvatar}
                          alt={report?.reporter}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/assets/images/no_image.png';
                          }}
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{report?.reporter}</div>
                        <div className="text-xs text-muted-foreground">Reporter</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report?.priority)}`}>
                      {report?.priority} priority
                    </span>
                    <span className={`px-2 py-1 rounded border text-xs font-medium ${getStatusColor(report?.status)}`}>
                      {report?.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">Reason:</div>
                    <div className="text-sm text-muted-foreground">{report?.reason}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">Description:</div>
                    <div className="text-sm text-muted-foreground">{report?.description}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{new Date(report.timestamp)?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="FileText" size={14} />
                      <span>{report?.evidence} evidence files</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleModerationAction(report?.id, 'view_evidence')}
                      iconName="Eye"
                    >
                      View Evidence
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleModerationAction(report?.id, 'investigate')}
                      iconName="Search"
                    >
                      Investigate
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleModerationAction(report?.id, 'take_action')}
                      iconName="Gavel"
                    >
                      Take Action
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'appeals' && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Icon name="Scale" size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Appeals Pending</h3>
            <p className="text-muted-foreground">
              All user appeals have been reviewed and processed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModerationTools;