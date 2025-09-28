import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GroupInfoCard = ({ group, currentUser, onUpdateGroup }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGroup, setEditedGroup] = useState({
    name: group?.name,
    description: group?.description
  });

  const isAdmin = group?.admins?.some(admin => admin?.id === currentUser?.id);

  const handleSave = () => {
    onUpdateGroup(editedGroup);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedGroup({
      name: group?.name,
      description: group?.description
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center overflow-hidden">
            {group?.avatar ? (
              <Image 
                src={group?.avatar} 
                alt={group?.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon name="Users" size={24} className="text-muted-foreground" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{group?.name}</h2>
            <p className="text-sm text-muted-foreground">
              {group?.participants?.length} members • Created {group?.createdAt}
            </p>
          </div>
        </div>
        {isAdmin && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            iconName={isEditing ? "X" : "Edit"}
            iconPosition="left"
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-4">
          <Input
            label="Group Name"
            type="text"
            value={editedGroup?.name}
            onChange={(e) => setEditedGroup(prev => ({ ...prev, name: e?.target?.value }))}
            placeholder="Enter group name"
            required
          />
          <Input
            label="Description"
            type="text"
            value={editedGroup?.description}
            onChange={(e) => setEditedGroup(prev => ({ ...prev, description: e?.target?.value }))}
            placeholder="Enter group description"
          />
          <div className="flex space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              iconName="Check"
              iconPosition="left"
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-1">Description</h3>
            <p className="text-sm text-muted-foreground">
              {group?.description || "No description provided"}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">Created by</p>
              <p className="text-sm font-medium text-foreground">{group?.createdBy}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Privacy</p>
              <div className="flex items-center space-x-1">
                <Icon 
                  name={group?.isPrivate ? "Lock" : "Globe"} 
                  size={14} 
                  className="text-muted-foreground"
                />
                <p className="text-sm font-medium text-foreground">
                  {group?.isPrivate ? "Private" : "Public"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupInfoCard;