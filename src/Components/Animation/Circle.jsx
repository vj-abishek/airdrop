import React from 'react';

export default function Circle() {
  return (
    <svg
      style={{
        animation: 'rotate 2s linear infinite',
      }}
      width="24"
      height="24"
      viewBox="0 0 46 46"
      role="status"
    >
      <circle
        style={{
          stroke: 'var(--color-accent)',
          strokeDasharray: '1,150',
          strokeDashoffset: 0,
          strokeLinecap: 'round',
          animation: 'stroke 1.5s ease-in-out infinite',
        }}
        cx="23"
        cy="23"
        r="20"
        fill="none"
        strokeWidth="6"
      />
    </svg>
  );
}
