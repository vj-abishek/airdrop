import React from 'react';

export default function Main({ children }) {
  return (
    <div
      style={{ gridTemplateColumns: '50px 1fr' }}
      className="grid gap-1 cursor-pointer"
    >
      <div id="nothing" />
      <div className="font-sans text-base flex flex-col justify-between text-white p-2">
        {children}
      </div>
    </div>
  );
}
