import React from 'react';
import BackButon from './BackButton';
import Photo from './Photo';
import Styles from '../../../../Styles/responsive.module.css';

export default function Header() {
  return (
    <header
      className={`flex flex-row bg-primary px-3 sticky top-0 w-full items-center justify-between ${Styles.borderBorder}`}
    >
      <div className="flex justify-between">
        <BackButon />
        <Photo />
      </div>
      <div className="flex p-2  items-center cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="text-accent p-2 w-10 h-10"
        >
          <path
            fill="currentColor"
            d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
          />
        </svg>
      </div>
    </header>
  );
}
