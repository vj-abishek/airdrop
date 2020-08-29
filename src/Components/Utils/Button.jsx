import React, { useRef } from 'react';
import { useRipple } from 'react-use-ripple';

export default function Button({ children }) {
  const buttonRef = useRef();

  useRipple(buttonRef);
  return (
    <button
      type="button"
      id="generateURl"
      ref={buttonRef}
      style={{
        minHeight: '48px',
        outline: 'none',
        cursor: 'pointer',
        paddingLeft: '30px',
        paddingRight: '30px',
      }}
      className=" bg-accent shadow-2xl  text-white rounded-full text-center font-sans text-bold my-2 w-full"
    >
      <span
        id="generateURlspan"
        style={{ lineHeight: '48px', textAlign: 'center' }}
      >
        {children}
      </span>
    </button>
  );
}
