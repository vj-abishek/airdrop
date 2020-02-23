import React, { useState, useEffect, useRef } from 'react'
import peer, { name_of_room } from './Peer'
import { share_file, bufferArrayuni } from './FileShare/File'
import Success from './Success'
import { from } from 'rxjs'
import { filter, map } from 'rxjs/operators'

import './Chat.css'

export default function Chat() {
  //handle state
  const [text, setText] = useState('')
  const [connected, setConnected] = useState(false)
  const [message, setMessage] = useState([])

  //declare the variable
  const inputVariable = useRef()
  const file = useRef()

  //handle Submit
  const handleSubmit = e => {
    e.preventDefault()
    let data = {},
      name
    if (window.location.hash === '#init') {
      name = name_of_room[1].split('-')
      data = {
        name: name[0],
        message: text.text,
        sentAt: Date.now()
      }
    } else {
      data = {
        name: 'Friend',
        message: text.text,
        type: 'text/plain',
        sentAt: Date.now()
      }
    }
    setMessage([...message, data])
    inputVariable.current.value = ''

    //sent the data to other peer
    peer.send(JSON.stringify(data))
  }

  useEffect(() => {
    //handle when peer is conneted
    peer.on('connect', () => {
      if (!connected) {
        setConnected(true)
      }
    })
    return () => {
      peer.on('destroy', () => {
        peer.close()
      })
    }
  }, [connected])

  useEffect(() => {
    //update the state of message
    const update = data => {
      setMessage([...message, data])
      // console.log('Please work for now', message)
    }
    //handle the data recieved from the peer
    peer.on('data', data => {
      // console.log(JSON.parse(data))
      // console.log(data)
      try {
        console.log(JSON.parse(data))
        update(JSON.parse(data))
      } catch (error) {
        console.error(error)
        console.log(data)
      }
    })
    return () => {
      peer.on('destroy', () => {
        peer.close()
      })
    }
  }, [message])

  //handle file sending using effect

  const handleChange = e => {
    setText({
      text: e.target.value
    })
  }
  const handleFile = () => {
    file.current.click()
  }

  //handle the eventlistener

  // FIXME: send the file to peer and join it...
  //[x] Dismiss first postion and last position.

  const handleFileChange = e => {
    console.log(e.target.files[0])
    let file_data = e.target.files[0]

    // handle with file file reader

    share_file(file_data)

    const BufferToSend = from(bufferArrayuni)

    const modified = BufferToSend.pipe(
      filter(v => v.initial === false),
      map(async file => {
        return new Promise((resolve, reject) => {
          let content = ''
          const reader = new FileReader()
          // Wait till complete
          reader.onloadend = function(e) {
            content = e.target.result
            file.file = content
            resolve(file)
          }
          // Make sure to handle error states
          reader.onerror = function(e) {
            reject(e)
          }
          reader.readAsDataURL(file.file)
        })
      })
    )
    modified.subscribe(original => {
      console.log(original)
      original.then(iGotIt => {
        peer.send(JSON.stringify(iGotIt))
      })
    })
  }
  return (
    <div className='container'>
      <div className='chat-container'>
        <header
          style={{
            width: '98%',
            height: '30px',
            padding: '10px',
            background: '#181717',
            color: '#fff'
          }}
        >
          Room No:- {name_of_room[1]}
        </header>
        <div className='Message'>
          {connected ? (
            message.length > 0 ? (
              message.map((data, i) => {
                let condition = /^image/gi.test(data.type)

                return condition ? (
                  <div
                    key={i + 'hash' + 1}
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <p style={{ color: '#fff', marginLeft: '5px' }}>
                      <span style={{ color: '#ababab' }}>{data.type}</span> :
                      {' Sents a file: ' + data.type}
                      <img width={700} src={data.file} alt={data.type} />
                    </p>
                  </div>
                ) : (
                  <div key={i + 'hash' + 1}>
                    <p style={{ color: '#fff', marginLeft: '5px' }}>
                      <span style={{ color: '#ababab' }}>{data.name}</span> :{' '}
                      {data.message}
                    </p>
                  </div>
                )
              })
            ) : (
              <Success />
            )
          ) : (
            <p
              style={{
                color: '#fff',
                textAlign: 'center',
                verticalAlign: 'center'
              }}
            >
              Settings everything up, Please wait...
            </p>
          )}
        </div>
        <div className='Message-text-box'>
          <form onSubmit={handleSubmit}>
            <div className='input-ka-name'>
              <div style={{ flex: 1 }}>
                <input
                  style={{
                    width: '99%',
                    height: '30px',
                    color: '#000',
                    padding: '3px 10px 3px 24px',
                    borderRadius: '40px 0 0 40px',
                    outline: 'none',
                    border: '0px'
                  }}
                  ref={inputVariable}
                  type='text'
                  onChange={handleChange}
                  placeholder='Type a message...'
                  autoFocus
                  // style={{ width: '100%', height: '50px', outline: 'none' }}
                />
                <input
                  type='file'
                  ref={file}
                  onChange={handleFileChange}
                  hidden
                />
              </div>
              <div>
                <div className='button-style'>
                  <button className='wpO6b ' type='button' onClick={handleFile}>
                    <svg
                      aria-label='Add Photo or Video'
                      className='_8-yf5 '
                      fill='#262626'
                      height='24'
                      viewBox='0 0 48 48'
                      width='24'
                    >
                      <path d='M38.5 0h-29C4.3 0 0 4.3 0 9.5v29C0 43.7 4.3 48 9.5 48h29c5.2 0 9.5-4.3 9.5-9.5v-29C48 4.3 43.7 0 38.5 0zM45 38.5c0 3.6-2.9 6.5-6.5 6.5h-29c-3.3 0-6-2.5-6.4-5.6l8.3-8.3c.1-.1.3-.2.4-.2.1 0 .2 0 .4.2l6.3 6.3c1.4 1.4 3.6 1.4 5 0L35.9 25c.2-.2.6-.2.8 0l8.3 8.3v5.2zm0-9.4l-6.2-6.2c-1.3-1.3-3.7-1.3-5 0L21.3 35.3c-.1.1-.3.2-.4.2-.1 0-.2 0-.4-.2L14.2 29c-1.3-1.3-3.7-1.3-5 0L3 35.2V9.5C3 5.9 5.9 3 9.5 3h29C42.1 3 45 5.9 45 9.5v19.6zM11.8 8.2c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5z'></path>
                    </svg>
                  </button>
                  <button className='sqdOP' type='submit'>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

//code from github
// if (file.name.match(/\.jpg|\.png|\.jpeg|\.gif/gi)) {
//   html += '<img crossOrigin="anonymous" src="' + file.url + '">';
// } else if (file.name.match(/\.wav|\.mp3/gi)) {
//   html += '<audio src="' + file.url + '" controls></audio>';
// } else if (file.name.match(/\.webm|\.flv|\.mp4/gi)) {
//   html += '<video src="' + file.url + '" controls></video>';
// } else if (file.name.match(/\.js|\.txt|\.sh/gi)) {
//   html += '<a href="' + file.url + '" target="_blank" download="' + file.name + '">';
//   html += '<br><iframe class="inline-iframe" src="' + file.url + '"></iframe></a>';
// }

//code at peer.send

// let blob = new Blob([data], {
//   type: 'image/png'
// })
// console.log(data.type)
// let url = window.URL.createObjectURL(blob)
// console.log('URL:', url)
// // console.log(':data:', data)
// console.log(blob)
// let a
// a = document.createElement('a')
// a.href = url
// a.download = 'airdrop'
// document.body.appendChild(a)
// a.style = 'display: none'

// a.remove()
