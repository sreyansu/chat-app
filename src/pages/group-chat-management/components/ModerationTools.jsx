import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ModerationTools = ({ group, currentUser, admins, moderators, onArchiveGroup, onDeleteGroup, onExportChat }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  
  const isAdmin = admins?.some(admin => admin?.id === currentUser?.id);
  const isModerator = moderators?.some(mod => mod?.id === currentUser?.id);
  const canModerate = isAdmin || isModerator;

  const handleDeleteGroup = () => {
    if (deleteConfirmText === group?.name) {
      onDeleteGroup();
      setShowDeleteConfirm(false);
      setDeleteConfirmText('');
    }
  };

  const handleArchiveGroup = () => {
    onArchiveGroup();
    setShowArchiveConfirm(false);
  };

  const moderationActions = [
    {
      title: 'Export Chat History',
      description: 'Download all messages and media from this group',
      icon: 'Download',
      action: onExportChat,
      variant: 'outline',
      available: canModerate
    },
    {
      title: 'Archive Group',
      description: 'Hide this group from active conversations',
      icon: 'Archive',
      action: () => setShowArchiveConfirm(true),
      variant: 'outline',
      available: isAdmin
    },
    {
      title: 'Delete Group',
      description: 'Permanently delete this group and all messages',
      icon: 'Trash2',
      action: () => setShowDeleteConfirm(true),
      variant: 'destructive',
      available: isAdmin
    }
  ];

  const groupStats = [
    {
      label: 'Total Messages',
      value: group?.messageCount || 0,
      icon: 'MessageCircle'
    },
    {
      label: 'Media Files',
      value: group?.mediaCount || 0,
      icon: 'Image'
    },
    {
      label: 'Active Members',
      value: group?.participants?.filter(p => p?.status === 'online')?.length,
      icon: 'Users'
    },
    {
      label: 'Created',
      value: group?.createdAt,
      icon: 'Calendar'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Moderation Tools</h3>
      {/* Group Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {groupStats?.map((stat, index) => (
          <div key={index} className="bg-secondary/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={stat?.icon} size={16} className="text-primary" />
              <span className="text-xs text-muted-foreground">{stat?.label}</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{stat?.value}</p>
          </div>
        ))}
      </div>
      {/* Moderation Actions */}
      <div className="space-y-4">
        {moderationActions?.map((action, index) => (
          action?.available && (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  action?.variant === 'destructive' ? 'bg-destructive/10' : 'bg-secondary'
                }`}>
                  <Icon 
                    name={action?.icon} 
                    size={18} 
                    className={action?.variant === 'destructive' ? 'text-destructive' : 'text-muted-foreground'}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">{action?.title}</h4>
                  <p className="text-xs text-muted-foreground">{action?.description}</p>
                </div>
              </div>
              <Button
                variant={action?.variant}
                size="sm"
                onClick={action?.action}
                iconName={action?.icon}
                iconPosition="left"
              >
                {action?.title?.split(' ')?.[0]}
              </Button>
            </div>
          )
        ))}
      </div>
      {!canModerate && (
        <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              You need administrator or moderator permissions to access these tools.
            </p>
          </div>
        </div>
      )}
      {/* Archive Confirmation Modal */}
      {showArchiveConfirm && (
        <div className="fixed inset-0 z-300 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="Archive" size={20} className="text-warning" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground">Archive Group</h4>
                <p className="text-sm text-muted-foreground">This action can be undone later</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to archive "{group?.name}"? The group will be hidden from active conversations but can be restored later.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowArchiveConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="warning"
                onClick={handleArchiveGroup}
                className="flex-1"
                iconName="Archive"
                iconPosition="left"
              >
                Archive Group
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-300 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-destructive" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground">Delete Group</h4>
                <p className="text-sm text-destructive">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              This will permanently delete the group "{group?.name}" and all its messages, media, and history. All participants will lose access immediately.
            </p>
            <Input
              label={`Type "${group?.name}" to confirm deletion`}
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e?.target?.value)}
              placeholder={group?.name}
              className="mb-6"
            />
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteGroup}
                disabled={deleteConfirmText !== group?.name}
                className="flex-1"
                iconName="Trash2"
                iconPosition="left"
              >
                Delete Forever
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModerationTools;