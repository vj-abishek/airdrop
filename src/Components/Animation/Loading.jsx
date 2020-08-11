import React from 'react';
import Logo from '../../assets/logo_512x512.svg';

const Loading = () => (
  <div className="flex w-screen h-screen justify-center items-center bg-primary fixed z-50">
    <img className="w-24 h-24" src={Logo} alt="Loading..." />
  </div>
);

export default Loading;
