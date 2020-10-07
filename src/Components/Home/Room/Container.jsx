import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Ring } from 'react-spinners-css';
import { nanoid } from 'nanoid';
import Single from './Single';
import { Fetch } from '../../../Store/Actions/Channel';
import Styles from '../../../Styles/responsive.module.css';

function Container({ f, data, load, fetch, sidebar, user, userStatus }) {
  const [id] = React.useState(nanoid);

  useEffect(() => {
    if (!fetch || data.includes(undefined) || data.length === 0) {
      console.log('Fetching...');
      f();
    }
  }, [f, fetch, data]);

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
  user: state.authReducer.user,
  userStatus: state.messageReducer.userStatus,
});

const mapDispatchToProps = (dispatch) => ({
  f: () => dispatch(Fetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
