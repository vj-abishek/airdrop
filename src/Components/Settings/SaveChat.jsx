import React, { useState } from 'react';
import Toggle from './ToggleButtons';

export default function Section() {
  const [checked, setChecked] = useState(true);

  const Change = () => setChecked(!checked);
  return (
    <>
      {/* Notification Section */}

      <Toggle handleChange={Change} checked={checked}>
        <div className="w-12 h-12 text-white flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current w-7 h-7"
            height="24"
            width="24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M17.59 3.59c-.38-.38-.89-.59-1.42-.59H5a2 2 0 00-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7.83c0-.53-.21-1.04-.59-1.41l-2.82-2.83zM12 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm1-10H7c-1.1 0-2-.9-2-2s.9-2 2-2h6c1.1 0 2 .9 2 2s-.9 2-2 2z" />
          </svg>
        </div>
        <div className="w-auto font-sans p-3">
          <div className="text-white text-lg">
            <span>Save Chat</span>
          </div>
        </div>
      </Toggle>
    </>
  );
}
