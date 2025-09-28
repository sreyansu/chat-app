import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import PresenceIndicator from '../../../components/ui/PresenceIndicator';

const ParticipantsList = ({ participants, admins, moderators, currentUser, onRemoveParticipant, onChangeRole }) => {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  
  const isCurrentUserAdmin = admins?.some(admin => admin?.id === currentUser?.id);
  
  const getParticipantRole = (participant) => {
    if (admins?.some(admin => admin?.id === participant?.id)) return 'admin';
    if (moderators?.some(mod => mod?.id === participant?.id)) return 'moderator';
    return 'member';
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-error';
      case 'moderator': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const handleRoleChange = (participant, newRole) => {
    onChangeRole(participant?.id, newRole);
    setSelectedParticipant(null);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Participants ({participants?.length})
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="UserPlus"
          iconPosition="left"
        >
          Add Members
        </Button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {participants?.map((participant) => {
          const role = getParticipantRole(participant);
          const canManage = isCurrentUserAdmin && participant?.id !== currentUser?.id;
          
          return (
            <div
              key={participant?.id}
              className="flex items-center justify-between p-3 hover:bg-accent/50 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-secondary rounded-full overflow-hidden">
                    <Image
                      src={participant?.avatar}
                      alt={participant?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <PresenceIndicator
                    status={participant?.status}
                    size="sm"
                    className="absolute -bottom-0.5 -right-0.5"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-foreground">
                      {participant?.name}
                    </p>
                    {participant?.id === currentUser?.id && (
                      <span className="text-xs text-primary">(You)</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-muted-foreground">
                      {participant?.email}
                    </p>
                    <span className="text-xs">•</span>
                    <span className={`text-xs font-medium capitalize ${getRoleColor(role)}`}>
                      {role}
                    </span>
                  </div>
                </div>
              </div>
              {canManage && (
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedParticipant(
                        selectedParticipant === participant?.id ? null : participant?.id
                      )}
                      iconName="MoreVertical"
                    />
                    
                    {selectedParticipant === participant?.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg z-50">
                        <div className="py-2">
                          <button
                            onClick={() => handleRoleChange(participant, 'admin')}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-accent/50 flex items-center space-x-2"
                            disabled={role === 'admin'}
                          >
                            <Icon name="Shield" size={14} />
                            <span>Make Admin</span>
                          </button>
                          <button
                            onClick={() => handleRoleChange(participant, 'moderator')}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-accent/50 flex items-center space-x-2"
                            disabled={role === 'moderator'}
                          >
                            <Icon name="Star" size={14} />
                            <span>Make Moderator</span>
                          </button>
                          <button
                            onClick={() => handleRoleChange(participant, 'member')}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-accent/50 flex items-center space-x-2"
                            disabled={role === 'member'}
                          >
                            <Icon name="User" size={14} />
                            <span>Make Member</span>
                          </button>
                          <hr className="my-1 border-border" />
                          <button
                            onClick={() => onRemoveParticipant(participant?.id)}
                            className="w-full px-3 py-2 text-left text-sm text-destructive hover:bg-accent/50 flex items-center space-x-2"
                          >
                            <Icon name="UserMinus" size={14} />
                            <span>Remove from Group</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParticipantsList;