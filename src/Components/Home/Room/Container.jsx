import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Ring } from 'react-spinners-css';
import { nanoid } from 'nanoid';
import Single from './Single';
import Styles from '../../../Styles/responsive.module.css';
import { Fetch } from '../../../Store/Actions/Channel';

function Container({
  f,
  data,
  load,
  fetch,
  sidebar,
  user,
  userStatus,
  waiting,
}) {
  const [id] = React.useState(nanoid);

  useEffect(() => {
    if (!fetch && !waiting) {
      console.log('Fetching...');
      f();
    }
  }, [f, fetch, data, waiting]);

  return load ? (
    <div className="w-full flex justify-center">
      <Ring color="#00b2d2" />
    </div>
  ) : (
    <div
      className={sidebar && 'hidden lg:block bg-secondary m-5'}
      style={
        sidebar && {
          borderRadius: '16px',
          overflow: 'hidden',
          maxHeight: '500px',
        }
      }
    >
      {sidebar ? (
        <>
          <header
            className={`${Styles.borderBorder} sticky top-0 z-50 w-full px-4 py-3 uppercase font-bold text-base`}
            style={{ background: '#00313A' }}
          >
            Chats
          </header>
          <div style={{ overflow: 'hidden auto', maxHeight: 'calc(500px - 50px)' }}>
            <Single key={id} data={data} user={user} userStatus={userStatus} />
          </div>
        </>
      ) : (
        <Single key={id} data={data} user={user} userStatus={userStatus} />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.channelReducer.channels,
  load: state.channelReducer.loading,
  fetch: state.channelReducer.fetch,
  waiting: state.firestoreReducer.waiting,
  user: state.authReducer.user,
  userStatus: state.messageReducer.userStatus,
});

const mapDispatchToProps = (dispatch) => ({
  f: () => dispatch(Fetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
