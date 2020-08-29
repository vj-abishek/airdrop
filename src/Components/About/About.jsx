import React, { lazy, Suspense } from 'react';
import Header from '../Utils/Header';
import Build from './Content/Build';
import OpenSource from './Content/OpenSource';
import Privacy from './Content/Privacy';
// import Terms from './Content/Terms';
import Footer from './Content/Footer';

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

          <Header back={true}>About</Header>
          <Build />
          <OpenSource />
          <Privacy />
          {/* <Terms /> */}

          <Footer />
        </div>
        {/* This is the side bar */}

        <Sidebar />
      </main>
    </Suspense>
  );
}
