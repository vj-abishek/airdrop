import React from 'react';
import Styles from '../../Styles/responsive.module.css';

const matched = window.matchMedia('(prefers-color-scheme: dark)').matches;

const Loading = () => (
  <div className="flex w-screen h-screen justify-center items-center bg-primary fixed z-50">
    <div className={`${matched ? Styles.neomorphism : Styles.lightNeomorphism} p-16 `}>
      <svg
        className="w-24 h-24"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M461.143 265C594.906 -107.264 71 512 71 512C71 512 146.242 401.414 146.242 265C461.143 55.05 71 18 71 18C71 18 327.379 637.264 461.143 265Z"
          fill="#00B2D2"
        />
      </svg>
    </div>

  </div>
);

export default Loading;
