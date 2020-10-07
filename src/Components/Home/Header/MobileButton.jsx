import React, { useRef } from 'react';
import { useRipple } from 'react-use-ripple';

export default function MobileButton({ children, desktop }) {
  const buttonRef = useRef();

  useRipple(buttonRef);

  return (
    <button
      type="button"
      ref={buttonRef}
      style={{ right: '11%', bottom: '12%' }}
      className="shadow-2xl outline-none fixed z-30 lg:hidden bg-secondary h-12 w-12 flex justify-center items-center text-white rounded-full"
    >
      {children}
    </button>
  );
}
