import React from 'react';
import Header from '../Utils/Header';
import Title from './Chunks/Title';
import Qrcode from './Chunks/Qrcode';

const Create = () => (
  <div
    style={{ borderRight: '1px solid rgb(56, 68, 77)' }}
    className="col-span-2 text-white text-lg"
  >
    <Header back>Invite Friend</Header>

    <Title />

    <Qrcode />
  </div>
);

export default Create;
