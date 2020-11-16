import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import socket from '../Functions/Users';
import Content from '../Animation/Content';

function Join({ user }) {
  const { from } = useParams();

  useEffect(() => {
    socket.emit('qrcode', {
      nId: from,
      touID: user.uid,
    });
  }, [from, user.uid]);

  return <Content />;
}

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});
export default connect(mapStateToProps)(Join);
