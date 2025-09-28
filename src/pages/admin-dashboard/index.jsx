import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import UserManagementPanel from './components/UserManagementPanel';
import MessageAnalytics from './components/MessageAnalytics';
import ModerationTools from './components/ModerationTools';
import SystemHealthMonitor from './components/SystemHealthMonitor';
import SecurityMonitor from './components/SecurityMonitor';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  // Mock current user data
  const currentUser = {
    id: 1,
    name: "Admin User",
    email: "admin@chatflow.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    role: "admin",
    status: "online"
  };

  // Mock notification counts
  const notificationCounts = {
    messages: 12,
    groups: 3,
    total: 15
  };

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Platform metrics data
  const platformMetrics = [
    {
      title: "Total Active Users",
      value: "2,847",
      change: "+12.5%",
      changeType: "positive",
      icon: "Users",
      color: "primary"
    },
    {
      title: "Messages Today",
      value: "18,432",
      change: "+8.2%",
      changeType: "positive",
      icon: "MessageSquare",
      color: "success"
    },
    {
      title: "System Uptime",
      value: "99.98%",
      change: "Stable",
      changeType: "neutral",
      icon: "Activity",
      color: "success"
    },
    {
      title: "Security Alerts",
      value: "23",
      change: "+5",
      changeType: "negative",
      icon: "Shield",
      color: "error"
    }
  ];

  // Navigation sections
  const navigationSections = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'analytics', label: 'Message Analytics', icon: 'TrendingUp' },
    { id: 'moderation', label: 'Moderation', icon: 'Shield' },
    { id: 'system', label: 'System Health', icon: 'Activity' },
    { id: 'security', label: 'Security', icon: 'Lock' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Platform Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformMetrics?.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  change={metric?.change}
                  changeType={metric?.changeType}
                  icon={metric?.icon}
                  color={metric?.color}
                />
              ))}
            </div>
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2"
                  onClick={() => setActiveSection('users')}
                  iconName="UserPlus"
                >
                  <span>Add New User</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2"
                  onClick={() => setActiveSection('moderation')}
                  iconName="Flag"
                >
                  <span>Review Reports</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2"
                  onClick={() => setActiveSection('system')}
                  iconName="Settings"
                >
                  <span>System Settings</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2"
                  onClick={() => setActiveSection('analytics')}
                  iconName="Download"
                >
                  <span>Export Data</span>
                </Button>
              </div>
            </div>
            {/* Recent Activity Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-4">Recent User Activity</h3>
                <div className="space-y-3">
                  {[
                    { user: "Sarah Johnson", action: "Joined the platform", time: "2 minutes ago", type: "join" },
                    { user: "Michael Chen", action: "Created new group chat", time: "15 minutes ago", type: "group" },
                    { user: "Emily Rodriguez", action: "Reported inappropriate content", time: "1 hour ago", type: "report" },
                    { user: "David Kim", action: "Updated profile settings", time: "2 hours ago", type: "update" }
                  ]?.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-accent/20 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity?.type === 'join' ? 'bg-success/20 text-success' :
                        activity?.type === 'group' ? 'bg-primary/20 text-primary' :
                        activity?.type === 'report'? 'bg-error/20 text-error' : 'bg-warning/20 text-warning'
                      }`}>
                        <Icon 
                          name={
                            activity?.type === 'join' ? 'UserPlus' :
                            activity?.type === 'group' ? 'Users' :
                            activity?.type === 'report'? 'Flag' : 'Settings'
                          } 
                          size={16} 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">{activity?.user}</div>
                        <div className="text-xs text-muted-foreground">{activity?.action}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{activity?.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-4">System Status</h3>
                <div className="space-y-4">
                  {[
                    { service: "Web Server", status: "healthy", uptime: "99.98%" },
                    { service: "Database", status: "healthy", uptime: "99.95%" },
                    { service: "WebSocket Service", status: "healthy", uptime: "99.99%" },
                    { service: "File Storage", status: "warning", uptime: "98.50%" }
                  ]?.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          service?.status === 'healthy' ? 'bg-success' : 'bg-warning'
                        }`}></div>
                        <span className="text-sm font-medium text-foreground">{service?.service}</span>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          service?.status === 'healthy' ? 'text-success' : 'text-warning'
                        }`}>
                          {service?.status}
                        </div>
                        <div className="text-xs text-muted-foreground">{service?.uptime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'users':
        return <UserManagementPanel />;
      case 'analytics':
        return <MessageAnalytics />;
      case 'moderation':
        return <ModerationTools />;
      case 'system':
        return <SystemHealthMonitor />;
      case 'security':
        return <SecurityMonitor />;
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
        <div className="flex">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-card border-r border-border min-h-screen p-4">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-foreground mb-2">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Manage your ChatFlow platform
              </p>
            </div>
            
            <nav className="space-y-2">
              {navigationSections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => setActiveSection(section?.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                    activeSection === section?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <Icon name={section?.icon} size={18} />
                  <span className="text-sm font-medium">{section?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;