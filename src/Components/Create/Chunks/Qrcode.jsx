import React, { useEffect, useReducer, useState } from 'react';
import QRCode from 'qrcode.react';
import { Ring } from 'react-spinners-css';
import { nanoid } from 'nanoid';
import { Helmet } from 'react-helmet';
import socket from '../../Functions/Users';
import { Join } from '../../../State/action';
import GenerateUrl from './GenerateUrl';
import Popup from './Popup';
import Logo from '../../../assets/logo_512x512.png';

export default function Qrcode({ history }) {
  // eslint-disable-next-line
  const [sockets, dispatch] = useReducer(Join, {});
  const [created, setCreated] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState('https://safeshare.live/j');

  useEffect(() => {
    const uid = nanoid(10);
    setId(`${uid}`);
    console.log(uid);
    if (uid) dispatch({ type: 'JOIN_ME', uid });
  }, []);

  useEffect(() => {
    const fun = () => {
      console.log('Created room');
      setCreated(true);
    };
    socket.on('createdRoom', fun);
    return () => socket.off('createdRoom', fun);
  }, [created]);

  useEffect(() => {
    const anFun = () => {
      console.log('Joined,Redirecting...');
      history.push(`/chat/${id}`);
    };
    socket.on('createdJoined', anFun);
    return () => socket.off('createdJoined', anFun);
  });

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
        <title>Safeshare.live - Connect with QRcode</title>
        <link rel="canonical" href="https://safeshare.live/" />
        <meta
          name="description"
          content="SafeShare.live is a online file sharing service. 1. Create a name. 2. Choose a person and send the file realtime"
        />
      </Helmet>
      <div className="w-auto h-auto flex items-center justify-center">
        <Ring color="#00B2D2" />
      </div>
    </>
  ) : (
    <div className="w-auto h-auto m-5 flex items-center justify-center flex-col">
      <Helmet>
        <title>Safeshare.live - Connect with QRcode</title>
        <link rel="canonical" href="https://safeshare.live/" />
        <meta
          name="description"
          content="SafeShare.live is a online file sharing service. 1. Create a name. 2. Choose a person and send the file realtime"
        />
      </Helmet>
      <QRCode
        title={`${window.location.origin}/j/${id}`}
        value={`${window.location.origin}/j/${id}`}
        size={200}
        level="L"
        imageSettings={{
          src: Logo,
          x: null,
          y: null,
          height: 24,
          width: 24,
          excavate: true,
        }}
        includeMargin
        renderAs="canvas"
      />
      <h3 className="m-4 font-sans text-light text-md">
        And Open the link in a browser
      </h3>
      <p className="text-accent text-md font-semibold"> --OR-- </p>
      <GenerateUrl onClicks={handleClick} show={show} />
      <Popup onClicks={handleClick} show={show} />
    </div>
  );
}
