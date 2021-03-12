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
          <div style={{ paddingBottom: '150px' }}></div>

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
        <MobileNav>
          <svg
            className="w-9 h-9 fill-current text-accent"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
              fill="currentColor"
            />
          </svg>
        </MobileNav>
      </NavLink>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({
  em: state.channelReducer.empty,
  lo: state.channelReducer.loading,
});

export default connect(mapStateToProps)(Home);
