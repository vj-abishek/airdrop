import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Ring } from 'react-spinners-css';
import { connect } from 'react-redux';
import { addChannel } from '../../Store/Actions/Firestore';

function Auto({ channel, createdRoom }) {
  const { id } = useParams();

  useEffect(() => {
    channel(id);
  }, [channel, id]);

  return (
    <>
      {(!createdRoom || !id || createdRoom === id) && <Redirect to="/" />}
      <div className="w-full lg:col-span-2 h-screen flex justify-center items-center">
        <Ring color="#00b2d2" />
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  channel: (slug) => dispatch(addChannel(slug)),
});

const mapStateToProps = (state) => ({
  createdRoom: state.firestoreReducer.createdRoom,
});

export default connect(mapStateToProps, mapDispatchToProps)(Auto);
