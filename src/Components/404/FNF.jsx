import React from 'react';
import error from '../../img/download.png';

export default function FNf(some) {
  console.log(some);
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ccc',
        flexDirection: 'column',
        background: '#fff',
      }}
    >
      <img
        src={error}
        style={{ maxHeight: '400px' }}
        alt='404 page not found'
      />
      <h4 style={{ color: '#000', textAlign: 'center' }}>
        This page is'nt avaliable.
      </h4>
      <p style={{ textAlign: 'center' }}>
        The URL is broke or must be removed from our server.. That's all we
        know.
      </p>
    </div>
  );
}
