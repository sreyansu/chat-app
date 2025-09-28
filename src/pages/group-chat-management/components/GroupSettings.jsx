import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const GroupSettings = ({ settings, currentUser, admins, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);
  
  const isAdmin = admins?.some(admin => admin?.id === currentUser?.id);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    setHasChanges(JSON.stringify(newSettings) !== JSON.stringify(settings));
  };

  const handleSave = () => {
    onUpdateSettings(localSettings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setLocalSettings(settings);
    setHasChanges(false);
  };

  const settingsConfig = [
    {
      key: 'allowMemberInvites',
      label: 'Allow members to invite others',
      description: 'Members can add new participants to the group',
      icon: 'UserPlus'
    },
    {
      key: 'allowMediaSharing',
      label: 'Allow media sharing',
      description: 'Members can share images, videos, and files',
      icon: 'Image'
    },
    {
      key: 'allowMessageEditing',
      label: 'Allow message editing',
      description: 'Members can edit their messages after sending',
      icon: 'Edit'
    },
    {
      key: 'allowMessageDeletion',
      label: 'Allow message deletion',
      description: 'Members can delete their own messages',
      icon: 'Trash2'
    },
    {
      key: 'enableReadReceipts',
      label: 'Enable read receipts',
      description: 'Show when messages have been read',
      icon: 'Eye'
    },
    {
      key: 'enableTypingIndicators',
      label: 'Enable typing indicators',
      description: 'Show when someone is typing',
      icon: 'MessageCircle'
    },
    {
      key: 'muteNotifications',
      label: 'Mute notifications',
      description: 'Disable push notifications for this group',
      icon: 'BellOff'
    },
    {
      key: 'archiveOldMessages',
      label: 'Auto-archive old messages',
      description: 'Automatically archive messages older than 30 days',
      icon: 'Archive'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Group Settings</h3>
        {hasChanges && isAdmin && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {settingsConfig?.map((setting) => (
          <div key={setting?.key} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Icon name={setting?.icon} size={18} className="text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    {setting?.label}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {setting?.description}
                  </p>
                </div>
                <Checkbox
                  checked={localSettings?.[setting?.key]}
                  onChange={(e) => handleSettingChange(setting?.key, e?.target?.checked)}
                  disabled={!isAdmin}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {!isAdmin && (
        <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Only group administrators can modify these settings.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupSettings;