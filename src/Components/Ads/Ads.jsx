import React from 'react'

export default class Ad extends React.Component {
  componentDidMount() {
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    return (
      <>
        {/* Horizontal Ad  */}
        <ins
          class='adsbygoogle'
          style={{ display: 'block' }}
          data-ad-client='ca-pub-4314629461501774'
          data-ad-slot='8928267796'
          data-ad-format='auto'
          data-full-width-responsive='true'
        ></ins>
      </>
    )
  }
}
