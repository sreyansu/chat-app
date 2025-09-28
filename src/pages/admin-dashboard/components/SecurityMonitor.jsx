import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SecurityMonitor = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [threatLevel, setThreatLevel] = useState('all');

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const threatLevelOptions = [
    { value: 'all', label: 'All Threats' },
    { value: 'high', label: 'High Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'low', label: 'Low Risk' }
  ];

  const securityMetrics = [
    {
      label: 'Failed Login Attempts',
      value: 23,
      change: '+12%',
      changeType: 'negative',
      icon: 'ShieldX',
      color: 'error'
    },
    {
      label: 'Blocked IP Addresses',
      value: 8,
      change: '+3',
      changeType: 'neutral',
      icon: 'Shield',
      color: 'warning'
    },
    {
      label: 'Suspicious Activities',
      value: 5,
      change: '-2',
      changeType: 'positive',
      icon: 'AlertTriangle',
      color: 'primary'
    },
    {
      label: 'Security Scans',
      value: 156,
      change: '+8%',
      changeType: 'positive',
      icon: 'Search',
      color: 'success'
    }
  ];

  const securityEvents = [
    {
      id: 1,
      type: 'failed_login',
      severity: 'high',
      timestamp: '2024-09-03 09:32:15',
      source: '192.168.1.100',
      target: 'admin@chatflow.com',
      description: 'Multiple failed login attempts detected from suspicious IP address',
      status: 'investigating',
      attempts: 15
    },
    {
      id: 2,
      type: 'suspicious_activity',
      severity: 'medium',
      timestamp: '2024-09-03 09:28:42',
      source: '10.0.0.45',
      target: 'user@example.com',
      description: 'Unusual message sending pattern detected - potential spam behavior',
      status: 'monitoring',
      attempts: 1
    },
    {
      id: 3,
      type: 'rate_limit_exceeded',
      severity: 'low',
      timestamp: '2024-09-03 09:25:18',
      source: '172.16.0.23',
      target: 'api/messages',
      description: 'API rate limit exceeded - temporary throttling applied',
      status: 'resolved',
      attempts: 1
    },
    {
      id: 4,
      type: 'unauthorized_access',
      severity: 'high',
      timestamp: '2024-09-03 09:20:33',
      source: '203.0.113.45',
      target: '/admin/users',
      description: 'Attempted unauthorized access to admin panel',
      status: 'blocked',
      attempts: 3
    }
  ];

  const blockedIPs = [
    {
      ip: '203.0.113.45',
      reason: 'Brute force attack',
      blockedAt: '2024-09-03 09:20:33',
      attempts: 25,
      country: 'Unknown',
      status: 'permanent'
    },
    {
      ip: '198.51.100.12',
      reason: 'Spam activity',
      blockedAt: '2024-09-03 08:45:12',
      attempts: 8,
      country: 'US',
      status: 'temporary'
    },
    {
      ip: '192.0.2.78',
      reason: 'Suspicious behavior',
      blockedAt: '2024-09-03 07:30:45',
      attempts: 12,
      country: 'CN',
      status: 'reviewing'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
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
      case 'investigating':
        return 'bg-error/20 text-error border-error/30';
      case 'monitoring':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'resolved':
        return 'bg-success/20 text-success border-success/30';
      case 'blocked':
        return 'bg-primary/20 text-primary border-primary/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'failed_login':
        return 'UserX';
      case 'suspicious_activity':
        return 'AlertTriangle';
      case 'rate_limit_exceeded':
        return 'Clock';
      case 'unauthorized_access':
        return 'ShieldX';
      default:
        return 'AlertCircle';
    }
  };

  const handleSecurityAction = (eventId, action) => {
    console.log(`${action} security event ${eventId}`);
  };

  const handleIPAction = (ip, action) => {
    console.log(`${action} IP address ${ip}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Security Monitor</h2>
        <div className="flex items-center space-x-2">
          <div className="w-40">
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
              placeholder="Time range"
            />
          </div>
          <div className="w-40">
            <Select
              options={threatLevelOptions}
              value={threatLevel}
              onChange={setThreatLevel}
              placeholder="Threat level"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export Log
          </Button>
        </div>
      </div>
      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityMetrics?.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                metric?.color === 'error' ? 'bg-error/10 text-error' :
                metric?.color === 'warning' ? 'bg-warning/10 text-warning' :
                metric?.color === 'success'? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
              }`}>
                <Icon name={metric?.icon} size={20} />
              </div>
              {metric?.change && (
                <div className={`flex items-center space-x-1 ${
                  metric?.changeType === 'positive' ? 'text-success' :
                  metric?.changeType === 'negative'? 'text-error' : 'text-muted-foreground'
                }`}>
                  <Icon 
                    name={metric?.changeType === 'positive' ? 'TrendingUp' : 
                          metric?.changeType === 'negative' ? 'TrendingDown' : 'Minus'} 
                    size={14} 
                  />
                  <span className="text-xs font-medium">{metric?.change}</span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">{metric?.value}</div>
              <div className="text-sm text-muted-foreground">{metric?.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Events */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Recent Security Events</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {securityEvents?.map((event) => (
              <div key={event?.id} className="border border-border rounded-lg p-4 hover:bg-accent/20 transition-colors duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      event?.severity === 'high' ? 'bg-error/20 text-error' :
                      event?.severity === 'medium'? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                    }`}>
                      <Icon name={getEventIcon(event?.type)} size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {event?.type?.replace('_', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(event.timestamp)?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event?.severity)}`}>
                      {event?.severity}
                    </span>
                    <span className={`px-2 py-1 rounded border text-xs font-medium ${getStatusColor(event?.status)}`}>
                      {event?.status}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{event?.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{event?.source}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Target" size={12} />
                      <span>{event?.target}</span>
                    </div>
                    {event?.attempts > 1 && (
                      <div className="flex items-center space-x-1">
                        <Icon name="RotateCcw" size={12} />
                        <span>{event?.attempts} attempts</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSecurityAction(event?.id, 'investigate')}
                      iconName="Search"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSecurityAction(event?.id, 'block')}
                      iconName="Shield"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blocked IPs */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Blocked IP Addresses</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {blockedIPs?.map((blocked, index) => (
              <div key={index} className="border border-border rounded-lg p-4 hover:bg-accent/20 transition-colors duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-error/20 rounded-full flex items-center justify-center">
                      <Icon name="Shield" size={16} className="text-error" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground font-mono">{blocked?.ip}</div>
                      <div className="text-sm text-muted-foreground">{blocked?.country}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    blocked?.status === 'permanent' ? 'bg-error text-error-foreground' :
                    blocked?.status === 'temporary' ? 'bg-warning text-warning-foreground' :
                    'bg-primary text-primary-foreground'
                  }`}>
                    {blocked?.status}
                  </span>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="text-sm text-foreground">
                    <span className="font-medium">Reason:</span> {blocked?.reason}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Blocked: {new Date(blocked.blockedAt)?.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="RotateCcw" size={12} />
                    <span>{blocked?.attempts} attempts</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleIPAction(blocked?.ip, 'view_details')}
                      iconName="Eye"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleIPAction(blocked?.ip, 'unblock')}
                      iconName="Unlock"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Security Recommendations */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Security Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Shield" size={20} className="text-primary" />
              <span className="font-medium text-foreground">Enable 2FA</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Enforce two-factor authentication for all admin accounts to enhance security.
            </p>
          </div>
          <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={20} className="text-warning" />
              <span className="font-medium text-foreground">Rate Limiting</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Consider implementing stricter rate limits for API endpoints.
            </p>
          </div>
          <div className="p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Lock" size={20} className="text-success" />
              <span className="font-medium text-foreground">SSL Certificate</span>
            </div>
            <p className="text-sm text-muted-foreground">
              SSL certificate is valid and properly configured.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityMonitor;