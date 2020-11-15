import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import socket from '../Functions/Users';

function Join({ user, setUserData }) {
  const { from } = useParams();

  useEffect(() => {
    const obj = {
      from: user.uid,
      to: from,
    };
    socket.emit('qrcode', obj);
    setUserData(obj);
  }, [user, from, setUserData]);

  return <div />;
}
const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  setUserData: (data) => dispatch({ type: 'QRCODE', payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Join);
