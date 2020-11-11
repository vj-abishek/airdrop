import React from 'react';
import Styles from '../../Styles/responsive.module.css';

export default function ErrorFallback() {
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <p className={`${Styles.gray1} pt-3`}>Something went wrong</p>
      <div
        onClick={() => window.location.reload()}
        onKeyUp={() => window.location.reload()}
        role="button"
        tabIndex="0"
        className="flex flex-row items-center justify-around mt-3 p-2 px-3 shadow-md bg-secondary rounded-full"
      >
        <svg
          width="24"
          height="24"
          className={`fill-current ${Styles.gray1}`}
          viewBox="0 0 24 24"
        >
          <g>
            <path d="M12 2C6.486 2 2 6.486 2 12c0 .414.336.75.75.75s.75-.336.75-.75c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5c-2.886 0-5.576-1.5-7.13-3.888l2.983.55c.402.08.798-.193.874-.6.076-.408-.194-.8-.6-.874l-4.663-.86c-.204-.04-.414.01-.58.132-.168.123-.276.31-.3.515l-.57 4.706c-.05.412.242.785.653.835.03.004.06.006.09.006.375 0 .698-.278.745-.66l.32-2.63C5.673 20.36 8.728 22 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2z" />
          </g>
        </svg>
        <div className="ml-1">Try again</div>
      </div>
    </div>
  );
}
