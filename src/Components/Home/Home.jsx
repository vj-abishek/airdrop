import React, { lazy, Suspense } from 'react';
import Header from '../Utils/Header';
import MobileNav from './Header/MobileButton';
import { NavLink } from 'react-router-dom';
import Search from './Search/Search';
import Room from './Room/Room';
import { connect } from 'react-redux';
import Content from '../Animation/Content';

const Sidebar = lazy(() => import('../Sidebar/Sidebar'));

const Home = ({ em, lo }) => {
  return (
    <Suspense fallback={<Content />}>
      <main className="col-span-1 lg:col-span-3 grid grid-cols-3">
        <div className="col-span-3 lg:col-span-2 flex-shrink-0">
          <Header back={false} home={true}>
            Home
          </Header>

          {!em && !lo && <Search />}

          <Room />

          {em && (
            <div
              style={{ height: 'calc(100vh - 200px)' }}
              className="font-sans text-light text-md p-2  flex flex-col justify-center items-center "
            >
              <span>Nothing to show. Create a room to get started.</span>
              <span>
                Click on the {window.innerWidth <= 768 ? '+' : 'Invite'} button
              </span>
            </div>
          )}
        </div>
        <Sidebar />
      </main>
      <NavLink to="/create">
        <MobileNav />
      </NavLink>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({
  em: state.channelReducer.empty,
  lo: state.channelReducer.loading,
});

export default connect(mapStateToProps)(Home);
