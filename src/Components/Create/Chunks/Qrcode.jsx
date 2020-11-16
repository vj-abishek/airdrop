import React, { useEffect, useState } from 'react';
import { Ring } from 'react-spinners-css';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import QRCode from '../../Utils/QrCode';
import GenerateUrl from './GenerateUrl';
import Popup from './Popup';
import socket from '../../Functions/Users';

function Qrcode({ user }) {
  const [created, setCreated] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    const nId = nanoid();
    setId(`${nId}`);
    setCreated(true);
    console.log(`${window.location.origin}/join/${nId}`);

    // send that data to server
    socket.emit('create qrcode', {
      nId,
      fromuID: user.uid,
    });
  }, [user.uid]);
  const handleClick = (e) => {
    const target = e.target.id;
    if (
      target === 'closeButtons' ||
      target === 'generateURl' ||
      target === 'popupmain' ||
      target === 'generateURlWrapper' ||
      target === 'generateURlspan'
    ) {
      setShow(!show);
    }
  };

  return !created ? (
    <>
      <Helmet>
        <title>Relp / Connect with QRcode</title>
      </Helmet>
      <div className="w-auto h-auto flex items-center justify-center">
        <Ring color="#00B2D2" />
      </div>
    </>
  ) : (
    <div className="w-auto h-auto m-5 flex items-center justify-center flex-col">
      <Helmet>
        <title>Relp / Connect with QRcode</title>
      </Helmet>
      <QRCode
        value={`${window.location.origin}/join/${id}`}
        size={160}
        fill="#F4F4F9"
      />
      <h3 className="m-4 font-sans text-light text-md">
        And Open the link in a browser
      </h3>
      <p className="text-light text-md font-semibold"> --OR-- </p>
      <GenerateUrl onClicks={handleClick} show={show} />
      <Popup onClicks={handleClick} show={show} />
    </div>
  );
}

const mapStatToProps = (state) => ({
  user: state.authReducer.user,
});

export default connect(mapStatToProps)(Qrcode);
