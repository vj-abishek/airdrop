import React, { lazy, Suspense } from 'react';
import Header from '../Utils/Header';

const Sidebar = lazy(() => import('../Sidebar/Sidebar'));

const Home = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <main className="col-span-1 lg:col-span-3 grid grid-cols-3">
        <div
          style={{ height: '200vh' }}
          className="col-span-3 lg:col-span-2 flex-shrink-0"
        >
          <Header>Home</Header>

          <p className="font-sans text-white text-xl p-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi vero
            quis pariatur explicabo voluptatem ullam nobis modi sequi eveniet!
            Vero maiores, maxime harum vitae fuga mollitia? Expedita, magnam?
            Temporibus, ad.
          </p>
        </div>
        <Sidebar />
      </main>
    </Suspense>
  );
};

export default Home;
