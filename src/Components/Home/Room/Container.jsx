import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Ring } from 'react-spinners-css';
import { nanoid } from 'nanoid';
import Single from './Single';
import { Fetch } from '../../../Store/Actions/Channel';
import Styles from '../../../Styles/responsive.module.css';

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
    console.log(waiting);
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
    <div className={sidebar && `${Styles.borderLeft} hidden lg:block`}>
      <Single key={id} data={data} user={user} userStatus={userStatus} />
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
