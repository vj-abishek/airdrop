import React from 'react'

export default function Article() {
  return (
    <article>
      <p className='about'>ABOUT AIRDROP</p>
      <br />
      <div className='about-section'>
        <div>
          <i
            className='material-icons'
            style={{ fontSize: '50px', color: '#3F3D56' }}
          >
            security
          </i>
          <br />
          <h4>Security</h4>
          <p>
            Share your files privately without being leaked . This is a realtime
            sharing system. The files you shared won't be uploaded to our
            server. This website is based on
            <a href='https://en.wikipedia.org/wiki/WebRTC' target='blank'>
              WEBRTC
            </a>
            . A realtime communication channel to transfer data. You can
            transfer your files to anyone in the world without tension
          </p>
        </div>

        <div>
          <i
            className='material-icons'
            style={{ fontSize: '50px', color: ' #3F3D56' }}
          >
            chat
          </i>
          <h4>Communication</h4>
          <p>
            Now you can communicate with the other peer while sending files.
            Your chat is also private and you can also use our website for
            secrete conversation. This is a handy feature which enables you to
            talk with each other and share your desired files
          </p>
        </div>
        <div>
          <i
            className='material-icons'
            style={{ fontSize: '50px', color: '#3F3D56' }}
          >
            near_me
          </i>
          <h4>Easy to use</h4>
          <p>
            This website is easy to use. Share with one tap. Share your desired
            files with anyone around the world. Share your files with 3 simple
            steps. Easy as a breeze
          </p>
        </div>
      </div>
    </article>
  )
}
