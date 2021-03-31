import React, { lazy, Suspense, useEffect } from 'react';
import Content from '../Animation/Content';
import Conversation from './Chat/Conversation';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SyncMessages } from '../../Store/Actions/Message';

const Rooms = lazy(() => import('../Home/Room/Container'));

const Channel = ({ sync }) => {
  const { id } = useParams();

  useEffect(() => {
    sync(id);
  }, [id, sync]);

  return (
    <Suspense fallback={<Content />}>
      <main className="col-span-1 lg:col-span-3 grid grid-cols-3 text-white text-xl">
        <div className="col-span-3 lg:col-span-2 flex-shrink-0">
          <Conversation channelId={id} />
        </div>
        <div
          style={{ border: '0px', borderLeft: '1px solid rgb(56, 68, 77)' }}
          className="w-full"
        >
          <Rooms sidebar={true} />
        </div>
      </main>
    </Suspense>
  );
};

const mapDispatchToProps = (dispatch) => ({
  sync: (channelId) => dispatch(SyncMessages(channelId)),
});

export default connect(null, mapDispatchToProps)(Channel);
