import React from 'react'

export default class Ad extends React.Component {
  componentDidMount() {
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    return (
      <div
        style={{
          position: 'fixed',
          width: '970px',
          height: ' 90px',
          bottom: '0px',
        }}
      >
        <ins
          className='adsbygoogle'
          style={{ display: 'block', width: '100%', height: ' 50px' }}
          data-ad-client='ca-pub-4314629461501774'
          data-ad-slot='5177790706'
          data-ad-format='auto'
          data-full-width-responsive='true'
        ></ins>
        <p
          style={{
            textAlign: 'center',
            margin: 'auto',
            position: 'relative',
            zIndex: -1,
          }}
        >
          Please disable ad-blocker! You may not like this ad, but it supports
          the developer and keeps this site free.
        </p>
      </div>
    )
  }
}
