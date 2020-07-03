import React from 'react';
import './style.css';

export default function Howto() {
  return (
    <div style={{ margin: '20px auto', textAlign: 'center' }}>
      <h3 style={{ fontFamily: "'Ubuntu', sans-serif" }}>
        Don't know, how to use safeshare.live?
      </h3>
      <div className='youtube-dl'>
        {' '}
        <iframe
          title='Watch this to know how to use'
          width='600'
          height='350'
          src='https://www.youtube.com/embed/DxDyMuiVGHE?start=2'
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
