import React, { useEffect, useState } from 'react';
import { Ring } from 'react-spinners-css';
import { nanoid } from 'nanoid';
import { Helmet } from 'react-helmet';
import QRCode from '../../Utils/QrCode';
import GenerateUrl from './GenerateUrl';
import Popup from './Popup';

export default function Qrcode() {
  const [created, setCreated] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    const uid = nanoid(10);
    setId(`${uid}`);
    setCreated(true);
  }, []);
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
      <QRCode value={`https://onlink.tk/${id}`} size={160} fill="#F4F4F9" />
      <h3 className="m-4 font-sans text-light text-md">
        And Open the link in a browser
      </h3>
      <p className="text-light text-md font-semibold"> --OR-- </p>
      <GenerateUrl onClicks={handleClick} show={show} />
      <Popup onClicks={handleClick} show={show} />
    </div>
  );
}
