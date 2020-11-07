import React from 'react';
import Wrapper from './Main';

export default function Fotter() {
  return (
    <div>
      <Wrapper href="https://old-safeshare.now.sh">
        <div className="w-12 h-12 text-white flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            className="fill-current w-7 h-7"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm.4-4.78c-.01.01-.02.03-.03.05-.05.08-.1.16-.14.24-.02.03-.03.07-.04.11-.03.07-.06.14-.08.21-.07.21-.1.43-.1.68H10.5c0-.51.08-.94.2-1.3 0-.01 0-.02.01-.03.01-.04.04-.06.05-.1.06-.16.13-.3.22-.44.03-.05.07-.1.1-.15.03-.04.05-.09.08-.12l.01.01c.84-1.1 2.21-1.44 2.32-2.68.09-.98-.61-1.93-1.57-2.13-1.04-.22-1.98.39-2.3 1.28-.14.36-.47.65-.88.65h-.2c-.6 0-1.04-.59-.87-1.17.55-1.82 2.37-3.09 4.43-2.79 1.69.25 3.04 1.64 3.33 3.33.44 2.44-1.63 3.03-2.53 4.35z" />
          </svg>
        </div>
        <div className="w-auto font-sans p-3">
          <div className="text-white text-lg">
            <span>Contact us</span>
          </div>
        </div>
      </Wrapper>

      {/* Logout button */}

      <Wrapper href="/logout">
        <div className="w-12 h-12 text-white flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current w-7 h-7"
            viewBox="0 0 512 512"
            height="24"
            width="24"
          >
            <path d="M255.15 468.625H63.787c-11.737 0-21.262-9.526-21.262-21.262V64.638c0-11.737 9.526-21.262 21.262-21.262H255.15c11.758 0 21.262-9.504 21.262-21.262S266.908.85 255.15.85H63.787C28.619.85 0 29.47 0 64.638v382.724c0 35.168 28.619 63.787 63.787 63.787H255.15c11.758 0 21.262-9.504 21.262-21.262 0-11.758-9.504-21.262-21.262-21.262z" />
            <path d="M505.664 240.861L376.388 113.286c-8.335-8.25-21.815-8.143-30.065.213s-8.165 21.815.213 30.065l92.385 91.173H191.362c-11.758 0-21.262 9.504-21.262 21.262 0 11.758 9.504 21.263 21.262 21.263h247.559l-92.385 91.173c-8.377 8.25-8.441 21.709-.213 30.065a21.255 21.255 0 0015.139 6.336c5.401 0 10.801-2.041 14.926-6.124l129.276-127.575A21.303 21.303 0 00512 255.998c0-5.696-2.275-11.118-6.336-15.137z" />
          </svg>
        </div>
        <div className="w-auto font-sans p-3">
          <div className="text-white text-lg">
            <span>Logout</span>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
