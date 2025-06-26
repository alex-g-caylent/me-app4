// app/articles/_components/ValidationStatusIcon.tsx
import React, { useEffect } from 'react';
import { Box } from '@radix-ui/themes';

interface ValidationStatusIconProps {
  isValid: boolean | undefined;
  showIcon: boolean;
}

const ValidationStatusIcon: React.FC<ValidationStatusIconProps> = ({ isValid, showIcon }) => {

  // If validation status is undefined, don't show any icon
  if (isValid === undefined || !showIcon) return null;

  return (
    <Box
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: isValid ? '#10B981' : '#EF4444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      {isValid ? '✓' : '✕'}
    </Box>
  );
};

export default ValidationStatusIcon;