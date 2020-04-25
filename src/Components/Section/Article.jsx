import React from 'react'

export default function Article() {
  return (
    <article>
      <p className='about'>ABOUT ONSHARE</p>
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
            Share your files privately without getting them leaked . This is a realtime
            sharing system. The files you share won't be uploaded to our
            server. This website is based on
            <a href='https://en.wikipedia.org/wiki/WebRTC' target='blank'>
              WEBRTC
            </a>
            . A realtime communication channel to transfer data. You can
            transfer your files to anyone, anywhere in the world without 
            Worrying about confidentiality. 
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
            Now you can communicate with the other peer along with sending files.
            Your chat is private and you also can use our website for
            secrete conversations. This is a handy feature which enables you to
            chat with each other and share your desired files
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
            files with anyone anywhere in the world. Start sharing your files after 3 simple
            steps. Easy as a breeze!
          </p>
        </div>
      </div>
    </article>
  )
}
