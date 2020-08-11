import React, { useEffect, useReducer, useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { Ring } from 'react-spinners-css';
import { nanoid } from 'nanoid';
import { Helmet } from 'react-helmet';
import socket from '../Functions/Users';
import { Join } from '../../State/action';
import history from '../history';

export default function Qrcode() {
  // eslint-disable-next-line
  const [sockets, dispatch] = useReducer(Join, {});
  const [created, setCreated] = useState(false);
  const [copied, setCopy] = useState(false);
  const [id, setId] = useState('https://safeshare.live/j');

  const copyTextref = useRef(null);

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

  const copyText = () => {
    const node = copyTextref.current;
    if (document.body.createTextRange) {
      const range = document.body.createTextRange();
      range.moveToElementText(node);
      range.select();
      document.execCommand('copy');
      setCopy(true);
    } else if (window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(node);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      setCopy(true);
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
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgb(24, 24, 24)',
          color: '#fff',
          flexDirection: 'column',
        }}
        className="col-span-2"
      >
        <Ring color="#3f51b5" />
      </div>
    </>
  ) : (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(24, 24, 24)',
        color: '#fff',
        flexDirection: 'column',
      }}
      className="col-span-2"
    >
      <Helmet>
        <title>Safeshare.live - Connect with QRcode</title>
        <link rel="canonical" href="https://safeshare.live/" />
        <meta
          name="description"
          content="SafeShare.live is a online file sharing service. 1. Create a name. 2. Choose a person and send the file realtime"
        />
      </Helmet>
      <h1>Scan the Qrcode</h1>

      <QRCode
        title={`${window.location.origin}/j/${id}`}
        value={`${window.location.origin}/j/${id}`}
        size={200}
        level="L"
        includeMargin
        renderAs="canvas"
      />
      <h3>And Open the link in a browser</h3>
      {copied ? <p>Copied!</p> : <p> OR Copy this </p>}
      <h3
        onClick={copyText}
        ref={copyTextref}
        style={{ cursor: 'pointer' }}
        title="Click to Copy"
      >
        {window.location.origin}
        /j/
        {id}
      </h3>
    </div>
  );
}
