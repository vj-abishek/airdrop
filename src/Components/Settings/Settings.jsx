import React, { lazy, Suspense } from 'react';
import Header from '../Utils/Header';
import Profile from './Profile';
import Section from './Section';
import Fotter from './Fotter/Fotter';

const Sidebar = lazy(() => import('../Sidebar/Sidebar'));

export default function Settings() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <main className=" flex-grow lg:col-span-3 grid grid-cols-3">
        <div
          style={{ height: '120vh' }}
          className="col-span-3 lg:col-span-2 flex-shrink-0"
        >
          {/* This is the header */}

          <Header back={true}>Settings</Header>

          {/* This is the profile section */}

          <Profile />

          {/* This is the Settings Section */}

          <Section />

          {/* This is Fotter */}
          <Fotter />
        </div>
        {/* This is the side bar */}

        <Sidebar />
      </main>
    </Suspense>
  );
}
