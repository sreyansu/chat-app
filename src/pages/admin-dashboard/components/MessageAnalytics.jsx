import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const MessageAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const messageVolumeData = [
    { date: '2024-08-27', messages: 1250, users: 89 },
    { date: '2024-08-28', messages: 1420, users: 95 },
    { date: '2024-08-29', messages: 1680, users: 102 },
    { date: '2024-08-30', messages: 1890, users: 108 },
    { date: '2024-08-31', messages: 2100, users: 115 },
    { date: '2024-09-01', messages: 1950, users: 112 },
    { date: '2024-09-02', messages: 2250, users: 118 }
  ];

  const engagementData = [
    { hour: '00:00', messages: 45 },
    { hour: '02:00', messages: 23 },
    { hour: '04:00', messages: 12 },
    { hour: '06:00', messages: 34 },
    { hour: '08:00', messages: 156 },
    { hour: '10:00', messages: 234 },
    { hour: '12:00', messages: 298 },
    { hour: '14:00', messages: 267 },
    { hour: '16:00', messages: 189 },
    { hour: '18:00', messages: 145 },
    { hour: '20:00', messages: 98 },
    { hour: '22:00', messages: 67 }
  ];

  const messageTypeData = [
    { name: 'Text Messages', value: 68.5, count: 15420, color: '#00ADB5' },
    { name: 'Images', value: 18.2, count: 4098, color: '#4ECDC4' },
    { name: 'Files', value: 8.7, count: 1956, color: '#FFE66D' },
    { name: 'Voice Messages', value: 3.1, count: 698, color: '#FF6F61' },
    { name: 'Other', value: 1.5, count: 338, color: '#9CA3A6' }
  ];

  const topChannelsData = [
    { name: 'General Discussion', messages: 3456, users: 89, growth: '+12%' },
    { name: 'Development Team', messages: 2890, users: 45, growth: '+8%' },
    { name: 'Marketing Updates', messages: 2134, users: 67, growth: '+15%' },
    { name: 'Customer Support', messages: 1876, users: 23, growth: '+5%' },
    { name: 'Random Chat', messages: 1654, users: 78, growth: '+22%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Message Analytics</h2>
        <div className="w-48">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            placeholder="Select time range"
          />
        </div>
      </div>
      {/* Message Volume Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-foreground">Message Volume Trends</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Messages</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">Active Users</span>
            </div>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={messageVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => new Date(value)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-popover-foreground)'
                }}
              />
              <Bar dataKey="messages" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="users" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Engagement */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-foreground mb-6">Hourly Message Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="hour" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-popover-foreground)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="messages" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Message Types */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-foreground mb-6">Message Types Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={messageTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {messageTypeData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-popover-foreground)'
                  }}
                  formatter={(value, name) => [`${value}%`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {messageTypeData?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item?.color }}
                  ></div>
                  <span className="text-sm text-foreground">{item?.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{item?.value}%</div>
                  <div className="text-xs text-muted-foreground">{item?.count?.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Top Channels */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-6">Most Active Channels</h3>
        <div className="space-y-4">
          {topChannelsData?.map((channel, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Icon name="Hash" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{channel?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {channel?.users} active users
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-foreground">
                  {channel?.messages?.toLocaleString()} messages
                </div>
                <div className="text-sm text-success">{channel?.growth}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageAnalytics;