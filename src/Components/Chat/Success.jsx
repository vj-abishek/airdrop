import React from 'react'
import success from '../../img/undraw_arrived_f58d.svg'

export default function Success() {
  return (
    <div
      style={{
        display: 'flex',
        height: '500px',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
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
  )
}
