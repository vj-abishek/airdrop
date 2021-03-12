import React from 'react';
import Nav from './Nav';
import './Header.css';

export default function Header() {
  return (
    <header className="col-span-1 z-40 fixed bottom-0 lg:sticky lg:top-0">
      <div
        style={{
          border: '0px',
          borderRight: '1px solid rgb(56, 68, 77)',
        }}
        className="bg-primary lg:sticky lg:h-screen lg:top-0  lg:m-auto flex flex-wrap justify-center"
      >
        <div className=" w-screen lg:w-auto h-full">
          <Nav />
        </div>
      </div>
    </header>
  );
}
