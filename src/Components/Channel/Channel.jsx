import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Content from '../Animation/Content';
import Header from '../Utils/Header';
import Conversation from './Chat/Conversation';

const Rooms = lazy(() => import('../Home/Room/Container'));

const Channel = () => {
  const { id } = useParams();

  return (
    <Suspense fallback={<Content />}>
      <main className="col-span-1 lg:col-span-3 grid grid-cols-3 text-white text-xl">
        <div className="col-span-3 lg:col-span-2 flex-shrink-0">
          <Conversation />
        </div>
        <div
          style={{ border: '0px', borderLeft: '1px solid rgb(56, 68, 77)' }}
          className="w-full"
        >
          <Header home={false}>Chat</Header>
          <Rooms sidebar={true} />
        </div>
      </main>
    </Suspense>
  );
};

export default Channel;
