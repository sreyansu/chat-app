import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserManagementPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      status: "active",
      role: "user",
      registrationDate: "2024-08-15",
      lastActive: "2 hours ago",
      messageCount: 1247
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      status: "suspended",
      role: "user",
      registrationDate: "2024-07-22",
      lastActive: "1 day ago",
      messageCount: 892
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      status: "active",
      role: "moderator",
      registrationDate: "2024-06-10",
      lastActive: "Online now",
      messageCount: 2156
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      status: "inactive",
      role: "user",
      registrationDate: "2024-05-03",
      lastActive: "2 weeks ago",
      messageCount: 456
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'inactive':
        return 'bg-warning text-warning-foreground';
      case 'suspended':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return 'Shield';
      case 'moderator':
        return 'ShieldCheck';
      default:
        return 'User';
    }
  };

  const handleUserAction = (userId, action) => {
    console.log(`${action} user ${userId}`);
  };

  const handleBulkAction = (action) => {
    console.log(`${action} users:`, selectedUsers);
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev?.includes(userId) 
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">User Management</h2>
          <div className="flex items-center space-x-2">
            {selectedUsers?.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('suspend')}
                  iconName="UserX"
                  iconPosition="left"
                >
                  Suspend ({selectedUsers?.length})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('activate')}
                  iconName="UserCheck"
                  iconPosition="left"
                >
                  Activate ({selectedUsers?.length})
                </Button>
              </>
            )}
            <Button
              variant="default"
              size="sm"
              iconName="UserPlus"
              iconPosition="left"
            >
              Add User
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Filter by status"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <input
                  type="checkbox"
                  className="rounded border-border"
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      setSelectedUsers(filteredUsers?.map(u => u?.id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">User</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Role</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Messages</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Active</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user?.id} className="border-b border-border hover:bg-accent/50">
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={() => toggleUserSelection(user?.id)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{user?.name}</div>
                      <div className="text-sm text-muted-foreground">{user?.email}</div>
                      <div className="text-xs text-muted-foreground">
                        Joined {new Date(user.registrationDate)?.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user?.status)}`}>
                    {user?.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name={getRoleIcon(user?.role)} size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground capitalize">{user?.role}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{user?.messageCount?.toLocaleString()}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">{user?.lastActive}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUserAction(user?.id, 'view')}
                      iconName="Eye"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUserAction(user?.id, 'edit')}
                      iconName="Edit"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUserAction(user?.id, user?.status === 'suspended' ? 'activate' : 'suspend')}
                      iconName={user?.status === 'suspended' ? 'UserCheck' : 'UserX'}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredUsers?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
          <p className="text-muted-foreground">
            {searchQuery || statusFilter !== 'all' ?'Try adjusting your search or filter criteria.' :'No users have been registered yet.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default UserManagementPanel;