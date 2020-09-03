import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Ring } from 'react-spinners-css';
import { nanoid } from 'nanoid';
import Single from './Single';
import { Fetch } from '../../../Store/Actions/Channel';
import Styles from '../../../Styles/responsive.module.css';

function Container({ f, data, load, fetch, sidebar }) {
  const [id] = React.useState(nanoid);

  useEffect(() => {
    if (!fetch) {
      console.log('Fetching...');
      f();
    }
  }, [f, fetch]);

  return load ? (
    <div className="w-full flex justify-center">
      <Ring color="#00b2d2" />
    </div>
  ) : (
    <div className={sidebar && Styles.borderLeft}>
      <Single key={id} data={data} />
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    data: state.channelReducer.channels,
    load: state.channelReducer.loading,
    fetch: state.channelReducer.fetch,
  };
};

const mapDispatchToProps = (dispatch) => ({
  f: () => dispatch(Fetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
