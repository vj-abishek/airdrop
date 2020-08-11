import React from 'react';
import success from '../../img/undraw_arrived_f58d.svg';

export default function Success() {
  return (
    <div
      style={{
        display: 'flex',
        height: '460px',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      className='success-mobile'
    >
      <img
        src={success}
        style={{ height: '30vmin' }}
        alt='Successfully connected'
      />
      <p style={{ color: '#fff' }}>
        Successfully Connected. Now you can transfer files
      </p>
    </div>
  );
}
