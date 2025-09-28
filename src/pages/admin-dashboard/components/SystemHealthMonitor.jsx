import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealthMonitor = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    serverStatus: 'healthy',
    uptime: '99.98%',
    responseTime: 145,
    activeConnections: 1247,
    messageQueue: 23,
    databaseStatus: 'healthy',
    storageUsed: 68.5,
    memoryUsage: 72.3,
    cpuUsage: 45.2
  });

  const [realtimeData, setRealtimeData] = useState([]);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      const newDataPoint = {
        timestamp: new Date()?.toLocaleTimeString(),
        responseTime: Math.floor(Math.random() * 50) + 120,
        activeConnections: Math.floor(Math.random() * 200) + 1200,
        cpuUsage: Math.floor(Math.random() * 20) + 40,
        memoryUsage: Math.floor(Math.random() * 15) + 65
      };

      setRealtimeData(prev => {
        const updated = [...prev, newDataPoint];
        return updated?.slice(-10); // Keep only last 10 data points
      });

      // Update system metrics
      setSystemMetrics(prev => ({
        ...prev,
        responseTime: newDataPoint?.responseTime,
        activeConnections: newDataPoint?.activeConnections,
        cpuUsage: newDataPoint?.cpuUsage,
        memoryUsage: newDataPoint?.memoryUsage
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'critical':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 75) return 'bg-warning';
    return 'bg-success';
  };

  const systemComponents = [
    {
      name: 'Web Server',
      status: 'healthy',
      uptime: '15d 8h 23m',
      lastCheck: '2 minutes ago'
    },
    {
      name: 'Database',
      status: 'healthy',
      uptime: '15d 8h 23m',
      lastCheck: '1 minute ago'
    },
    {
      name: 'WebSocket Service',
      status: 'healthy',
      uptime: '15d 8h 23m',
      lastCheck: '30 seconds ago'
    },
    {
      name: 'File Storage',
      status: 'warning',
      uptime: '15d 8h 23m',
      lastCheck: '5 minutes ago'
    },
    {
      name: 'Email Service',
      status: 'healthy',
      uptime: '15d 8h 23m',
      lastCheck: '3 minutes ago'
    },
    {
      name: 'Push Notifications',
      status: 'healthy',
      uptime: '15d 8h 23m',
      lastCheck: '1 minute ago'
    }
  ];

  const performanceMetrics = [
    {
      label: 'Response Time',
      value: `${systemMetrics?.responseTime}ms`,
      status: systemMetrics?.responseTime < 200 ? 'healthy' : 'warning',
      icon: 'Zap'
    },
    {
      label: 'Active Connections',
      value: systemMetrics?.activeConnections?.toLocaleString(),
      status: 'healthy',
      icon: 'Users'
    },
    {
      label: 'Message Queue',
      value: systemMetrics?.messageQueue,
      status: systemMetrics?.messageQueue < 50 ? 'healthy' : 'warning',
      icon: 'MessageSquare'
    },
    {
      label: 'Uptime',
      value: systemMetrics?.uptime,
      status: 'healthy',
      icon: 'Clock'
    }
  ];

  const resourceUsage = [
    {
      label: 'CPU Usage',
      percentage: systemMetrics?.cpuUsage,
      icon: 'Cpu'
    },
    {
      label: 'Memory Usage',
      percentage: systemMetrics?.memoryUsage,
      icon: 'HardDrive'
    },
    {
      label: 'Storage Used',
      percentage: systemMetrics?.storageUsed,
      icon: 'Database'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">System Health Monitor</h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-muted-foreground">Live monitoring</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date()?.toLocaleTimeString()}
          </div>
        </div>
      </div>
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics?.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                metric?.status === 'healthy' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
              }`}>
                <Icon name={metric?.icon} size={20} />
              </div>
              <Icon 
                name={getStatusIcon(metric?.status)} 
                size={16} 
                className={getStatusColor(metric?.status)}
              />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">{metric?.value}</div>
              <div className="text-sm text-muted-foreground">{metric?.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Components */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">System Components</h3>
          <div className="space-y-3">
            {systemComponents?.map((component, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getStatusIcon(component?.status)} 
                    size={20} 
                    className={getStatusColor(component?.status)}
                  />
                  <div>
                    <div className="font-medium text-foreground">{component?.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Uptime: {component?.uptime}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${getStatusColor(component?.status)}`}>
                    {component?.status}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {component?.lastCheck}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Usage */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Resource Usage</h3>
          <div className="space-y-6">
            {resourceUsage?.map((resource, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name={resource?.icon} size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{resource?.label}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {resource?.percentage?.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(resource?.percentage)}`}
                    style={{ width: `${resource?.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Real-time Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Real-time Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-accent/20 rounded-lg">
            <div className="text-2xl font-bold text-primary">{systemMetrics?.activeConnections}</div>
            <div className="text-sm text-muted-foreground">Active WebSocket Connections</div>
          </div>
          <div className="text-center p-4 bg-accent/20 rounded-lg">
            <div className="text-2xl font-bold text-success">
              {Math.floor(systemMetrics?.activeConnections * 0.15)}
            </div>
            <div className="text-sm text-muted-foreground">Messages per Minute</div>
          </div>
          <div className="text-center p-4 bg-accent/20 rounded-lg">
            <div className="text-2xl font-bold text-warning">
              {Math.floor(systemMetrics?.activeConnections * 0.08)}
            </div>
            <div className="text-sm text-muted-foreground">New Connections/Min</div>
          </div>
          <div className="text-center p-4 bg-accent/20 rounded-lg">
            <div className="text-2xl font-bold text-error">
              {Math.floor(systemMetrics?.activeConnections * 0.02)}
            </div>
            <div className="text-sm text-muted-foreground">Disconnections/Min</div>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground mb-3">Recent System Events</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {[
              { time: '09:35:47', event: 'WebSocket connection established', type: 'info' },
              { time: '09:35:45', event: 'Database query optimization completed', type: 'success' },
              { time: '09:35:42', event: 'High memory usage detected (78%)', type: 'warning' },
              { time: '09:35:38', event: 'User authentication successful', type: 'info' },
              { time: '09:35:35', event: 'Message delivery confirmed', type: 'success' },
              { time: '09:35:32', event: 'File upload processing started', type: 'info' },
              { time: '09:35:28', event: 'Cache refresh completed', type: 'success' }
            ]?.map((log, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm p-2 hover:bg-accent/30 rounded">
                <div className="text-muted-foreground font-mono">{log?.time}</div>
                <div className={`w-2 h-2 rounded-full ${
                  log?.type === 'success' ? 'bg-success' :
                  log?.type === 'warning' ? 'bg-warning' :
                  log?.type === 'error' ? 'bg-error' : 'bg-primary'
                }`}></div>
                <div className="text-foreground">{log?.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;