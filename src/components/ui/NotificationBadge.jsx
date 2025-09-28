import React from 'react';

const NotificationBadge = ({ count = 0, className = '', variant = 'default' }) => {
  if (count <= 0) return null;

  const displayCount = count > 99 ? '99+' : count?.toString();

  const variantClasses = {
    default: 'bg-error text-error-foreground',
    primary: 'bg-primary text-primary-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground'
  };

  return (
    <div 
      className={`
        inline-flex items-center justify-center
        min-w-[20px] h-5 px-1.5
        text-xs font-medium
        rounded-full
        animate-spring-in
        ${variantClasses?.[variant]}
        ${className}
      `}
    >
      {displayCount}
    </div>
  );
};

export default NotificationBadge;