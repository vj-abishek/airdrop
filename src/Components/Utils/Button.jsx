import React from 'react';

export default function Button({ children }) {
  return (
    <div
      style={{
        minHeight: '48px',
        boxShadow: 'rgba(0, 0, 0, 0.08) 0px 8px 28px',
        outline: 'none',
        cursor: 'pointer',
        paddingLeft: '30px',
        paddingRight: '30px',
      }}
      className=" bg-accent  text-white rounded-full text-center font-sans text-bold my-2 w-full"
    >
      <span style={{ lineHeight: '48px', textAlign: 'center' }}>
        {children}
      </span>
    </div>
  );
}
