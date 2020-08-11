import React from 'react';

export default function Sidebar() {
  return (
    <div
      style={{ border: '0px', borderLeft: '1px solid rgb(56, 68, 77)' }}
      className="hidden lg:block col-span-1 bg-primary font-sans text-white pt-0 p-5 sticky top-0 h-screen"
    >
      <header className=" bg-primary font-sans p-3 text-md text-white font-bold  w-full">
        History
      </header>
      <div
        style={{ borderRadius: '14px' }}
        className="w-full h-64 bg-secondary pt-5 mt-3"
      />
    </div>
  );
}
