import React from 'react'

export default function Howto() {
  return (
    <div style={{ margin: '20px auto', textAlign: 'center' }}>
      <h1 style={{ fontFamily: "'Ubuntu', sans-serif" }}>
        How to use safeshare.live?
      </h1>
      <iframe
        title='How to use Safeshare.live'
        width='80%'
        height='315'
        src='https://www.youtube.com/embed/DxDyMuiVGHE?start=2'
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </div>
  )
}
