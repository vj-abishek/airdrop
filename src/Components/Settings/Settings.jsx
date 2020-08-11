import React, { lazy, Suspense } from 'react';
import Header from '../Utils/Header';
import Profile from './Profile';
import Toggle from './ToggleButtons';

const Sidebar = lazy(() => import('../Sidebar/Sidebar'));

export default function Settings() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <main className=" flex-grow lg:col-span-3 grid grid-cols-3">
        <div
          style={{ height: '200vh' }}
          className="col-span-3 lg:col-span-2 flex-shrink-0"
        >
          {/* This is the header */}

          <Header back={true}>Settings</Header>

          {/* This is the profile section */}

          <Profile />

          {/* This is the toggle section */}

          <Toggle>
            <div className="w-12 h-12 text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current "
                width="24"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M12 6.5c-2.49 0-4 2.02-4 4.5v6h8v-6c0-2.48-1.51-4.5-4-4.5z"
                  opacity=".3"
                />
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
              </svg>
            </div>
            <div className="w-auto font-sans ">
              <div className="text-white text-lg">
                <span>Notifications</span>
              </div>
            </div>
          </Toggle>
        </div>

        {/* This is the side bar */}

        <Sidebar />
      </main>
    </Suspense>
  );
}
