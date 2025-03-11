import React from 'react';

interface Props {
  id: string;
  children: React.ReactNode;
}

const ComponentTracker: React.FC<Props> = ({ id, children }) => {
  // In development, add data attributes for component tracking
  const debugProps = process.env.NODE_ENV === 'development' 
    ? {
        'data-component-id': id,
        'data-component-name': children.type?.displayName || children.type?.name
      }
    : {};

  return (
    <div {...debugProps}>
      {children}
    </div>
  );
};

export default ComponentTracker;