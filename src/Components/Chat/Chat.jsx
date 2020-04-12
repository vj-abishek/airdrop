import React, { useState, useEffect, useRef } from 'react'
import peer, { name_of_room } from './Peer'
import { share_file, bufferArrayuni } from './FileShare/File.js'
import Success from './Success'
import { v4 as uuid } from 'uuid'
import chunks from 'chunk-stream'

import { from } from 'rxjs'
// import { combaine } from './FileShare/Combine'
// import { filter, map } from 'rxjs/operators'
// import { Ripme, recievedFile } from './FileShare/PromiseFile'

import './Chat.css'
import socket from '../Functions/Users'

const chunkStream = chunks(16000)
chunkStream.pipe(peer)

export default function Chat() {
  //handle state
  const [text, setText] = useState('')
  const [connected, setConnected] = useState(false)
  const [message, setMessage] = useState([])

  const inputVariable = useRef()
  const file = useRef()
  const messageContainer = useRef()

  //handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    let data = {},
      name
    if (window.location.hash === '#init') {
      name = name_of_room[1].split('-')
      data = {
        id: uuid(),
        name: name[0],
        message: text.text,
        type: 'text/plain',
        sentAt: Date.now(),
      }
    } else {
      data = {
        id: uuid(),
        name: 'Friend',
        message: text.text,
        type: 'text/plain',
        sentAt: Date.now(),
      }
    }

    setMessage((old) => [...old, data])
    inputVariable.current.value = ''

    //sent the data to other peer
    peer.send(JSON.stringify(data))

    //FIXME:Must fix the scrolling issue
    try {
      window.element = messageContainer.current
      console.log('elem')
      messageContainer.current.scrollIntoView({
        behavior: 'smooth',
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // const update = (data) => {
    //   setMessage([...message, data])
    //   // console.log('Please work for now', message)
    // }
    //handle when peer is conneted
    peer.on('connect', () => {
      if (!connected) {
        setConnected(true)
      }
    })
    // peer.on('disconnect', () => {
    //   let error = {
    //     name: 'Robot',
    //     message: 'An error occured. Cannot connect to other peer :(',
    //     time: Date.now(),
    //   }
    //   update(error)
    // })
    // return () => {
    //   console.log('Component unmounted from 1st useEffect')
    //   peer.on('destroy', () => {
    //     let error = {
    //       name: 'Robot',
    //       message: 'An error occured. Cannot connect to other peer :(',
    //       time: Date.now(),
    //       type: 'text/plain',
    //     }
    //     update(error)
    //     peer.send(JSON.parse(error))
    //     peer.close()
    //   })
    // }
  }, [connected])

  socket.on('file', (data) => {
    console.log(data)
  })
  useEffect(() => {
    const update = (newData) => {
      setMessage([...message, newData])
      // console.log('Please work for now', message)
    }
    peer.on('data', (data) => {
      //TODO:Hadling files that are recievied ⌛
      console.log(data)

      try {
        let parsed = JSON.parse(data)
        if (parsed.type === 'text/plain') {
          update(parsed)
          console.log(parsed)
          try {
            // console.log(elem)
            messageContainer.current.scrollIntoView({
              behavior: 'smooth',
            })
          } catch (error) {
            // console.log('Do nothing')
            console.log('An error')
          }
        }
      } catch (err) {
        let array = []
        array = [...array, data]
        console.log(array)
        let buffer = new Blob(array, {
          type: 'image/jpeg',
        })
        let url = window.URL.createObjectURL(buffer)
        console.log('URL:', url)
        let a
        a = document.createElement('a')
        a.href = url
        a.download = `airdrop`
        document.body.appendChild(a)
        a.style = 'display: none'
        a.click()
      }

      // try {

      //   }
      // } catch (error) {
      //   console.log('An error')

      //   let news = {
      //     name: 'Robot',
      //     message: `An error occured While recieving a message. ${error}`,
      //     time: Date.now(),
      //     type: 'text/plain',
      //   }
      //   update(news)
      //   peer.send(JSON.parse(error))
      //   // console.log(parsed)
      // }
    })
    return () => {
      console.log('Component unmounted from 1st useEffect')
      peer.on('destroy', () => {
        let error = {
          name: 'Robot',
          message: 'An error occured. Cannot connect to other peer :(',
          time: Date.now(),
          type: 'text/plain',
        }
        update(error)
        peer.send(JSON.parse(error))
      })
    }
  }, [message])

  //handle file sending using effect

  const handleChange = (e) => {
    setText({
      text: e.target.value,
    })
  }
  const handleFile = () => {
    file.current.click()
  }

  //handle the eventlistener
  const handleFileChange = async (e) => {
    console.log(e.target.files[0])
    let file_data = e.target.files[0]

    // chunkStream.write(demo)
    // handle with file file reader

    let share = await share_file(file_data)
    peer.send(JSON.stringify(bufferArrayuni[0]))
    console.log('Raw Data from the chunk', share)
    if (share.slice(-1)[0].byteLength === 0) {
      // console.log('File:,', new Uint8Array(share))

      console.log('Buffer file::', new Buffer.from(share))
      const stream = from(share)
      stream.subscribe((data) => {
        console.log('Sending the file: and the file is:', new Buffer.from(data))
        peer.write(new Buffer(data))
      })

      //
    } else {
      console.log('Cant send')
    }
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
            color: '#fff',
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
                    key={i + 'Filehash' + 1}
                    style={{ display: 'flex', flexDirection: 'column' }}
                    ref={messageContainer}
                  >
                    <p style={{ color: '#fff', marginLeft: '5px' }}>
                      <img
                        width={300}
                        height={300}
                        src={`data:image/png;base64,${data.realFile}`}
                        alt={data.type}
                      />
                    </p>
                  </div>
                ) : (
                  <div key={data.id} ref={messageContainer}>
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
                verticalAlign: 'center',
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
                    border: '0px',
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

//FIXME: fix this code

// if (parsed.initial || parsed.custom) {
//   update(combaine(parsed))
// }
// const base64_data = of(parsed)
// let array = ''
// const modified = base64_data.pipe(
//   // takeWhile(v => v.final === true),
//   filter(val => val.initial === false),
//   map(file => {
//     let refile = file.file.split('data:image/png;base64,')
//     setReffile({
//       file: refile[1]
//     })

//     console.log(refile[1])
//     if (refile[1] !== undefined) {
//       array += refFile.file
//       file.realFile = array
//     }

//     return file
//   })
// )
// modified.subscribe(file => {
//   if (file.final) {
//     // let blob = new Blob([file.realFile], {
//     //   type: file.type
//     // })

//     // let url = window.URL.createObjectURL(blob)
//     // console.log('URL REady:', url)
//     // file.url = url
//     update(file)
//     //reset the things

//     // console.log('Running this by the way')
//   }
// })

// console.log(FileArray)
// const BufferToSend = from(File)

// const modified = BufferToSend.pipe(
//   filter(v => v.initial === false),
//   takeWhile(F),
//   map(async file => {
//     console.log(file  )
//   })
// )
// modified.subscribe(original => {
//   original.then(iGotIt => {
//     console.log(iGotIt)
//     peer.send(JSON.stringify(iGotIt))
//   })
// })
