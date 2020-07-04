/**
 * Table of Content
 *
 * Message sharing
 * File sharing
 * Typing indicator
 * Peer connection
 * Socket Connection
 * Chunk stream
 * Base64 to Blob
 *
 */

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import peer from './Peer';
import { share_file, bufferArrayuni, dataURItoBlob } from './FileShare/File.js';
import Success from './Success';
import { v4 as uuid } from 'uuid';
import { Helmet } from 'react-helmet';
import { from } from 'rxjs';
import { useParams } from 'react-router-dom';
import './Chat.css';
import { combaine } from './FileShare/Combine';
import socket from '../Functions/Users';
import Message from '../Message/Message';
import ImageCon from '../Message/ImageCon';

let array = [];

export default function Chat() {
  //handle state
  const [text, setText] = useState('');
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState([]);
  const [Filetype, setType] = useState(null);
  const [final, setFinal] = useState({ final: false });
  const [err, setError] = useState(false);
  const [name, setName] = useState(false);
  const [Typing, setTyping] = useState(false);
  // const [typingFocus, setTypingFocus] = useState(false);

  const inputVariable = useRef(null);
  const file = useRef(null);
  const messageContainer = useRef(null);
  const imageID = useRef(null);

  // get ID from the URL
  const { id } = useParams();

  // alert the user to not to go back
  useLayoutEffect(() => {
    const onUnload = (e) => {
      e.preventDefault();
      return (e.returnValue = 'Are you sure to leave ?');
    };
    window.addEventListener('beforeunload', onUnload);
    return () => window.removeEventListener('beforeunload', onUnload);
  });

  // get the online user
  useEffect(() => {
    const user = (data) => {
      setName(data);
    };
    socket.on('user', user);

    return () => socket.off('get_user', user);
  }, [name]);

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!connected || err || inputVariable.current.value === '') return;

    const data = {
      id: uuid(),
      name: name[0].name,
      message: text.text,
      type: 'text/plain',
      sentAt: Date.now(),
    };

    // send the data to other peer
    peer.send(JSON.stringify(data));
    peer.send(
      JSON.stringify({
        type: 'info',
        typing: false,
      })
    );
    data.self = true;
    setMessage((old) => [...old, data]);
    inputVariable.current.value = '';
  };

  // handle page scrolling
  useEffect(() => {
    try {
      window.element = messageContainer.current;
      // console.log('elem')
      messageContainer.current.scrollIntoView({
        behavior: 'smooth',
      });
    } catch (err) {
      // console.log('Do nothing')
    }
  }, [message]);

  useEffect(() => {
    // handle when peer is conneted

    if (!name) {
      socket.emit('get_user', {
        id: socket.id,
      });
    }

    peer.on('connect', () => {
      if (!connected) {
        setConnected(true);
        window.navigator.vibrate(200); // feedback when connected
      }
    });
  }, [connected, name]);

  // Handle Errors
  useEffect(() => {
    // update the UI
    const update = (newData) => {
      setMessage([...message, newData]);
    };
    const handleError = (err) => {
      let error = {
        id: uuid(),
        name: 'Bot',
        message: 'The other peer disconnected :(  ' + err,
        time: Date.now(),
      };
      // console.log(error)
      update(error);
      setError(true);
    };

    peer.on('error', handleError);
    return () => peer.off('error', handleError);
  }, [message]);

  // handle Incoming Message
  useEffect(() => {
    // get permissions for notifications
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          new Notification(
            'This is how the notification will be shown when a file is downloaded'
          );
        }
      });
    }

    const handleIncomingMessage = (data) => {
      // console.log(JSON.parse(data))
      /* Hadling files that are recievied ⌛ */

      const update = (newData) => {
        setMessage([...message, newData]);
      };

      const upDateTyping = (Data) => {
        console.log(Data);
        setTyping(Data);
      };

      // parse the data and update
      try {
        let parsed = JSON.parse(data);

        if (parsed.type === 'text/plain') {
          update(parsed);
          // console.log(parsed)
        } else if (parsed.type === 'info') {
          if (parsed.typing) {
            upDateTyping(true);
          } else {
            upDateTyping(false);
          }
        } else if (parsed.final) {
          setFinal(parsed);
        } else {
          if (parsed.initial) {
            setType({ type: parsed.type, fileName: parsed.fileName });
          }

          let message = combaine(parsed);

          update(message);
        }
      } catch (err) {
        // console.log(err)
        let condition = new TextDecoder('utf-8').decode(data);
        if (condition === 'final') {
          let buffer = new Blob(array, {
            type: Filetype.type,
          });
          let url = window.URL.createObjectURL(buffer);
          console.log('URL:', url);

          let message = {
            name: 'Bot',
            id: uuid(),
            message: `${Filetype.fileName || 'airdrop'}`,
            type: Filetype.type || 'text/plain',
            custom: true,
            sentAt: Date.now(),
            array,
            url,
          };
          let regex = new RegExp(/^image/gi);
          // console.log(!regex.test(Filetype.type))

          if (!regex.test(Filetype.type)) {
            // let a
            // a = document.createElement('a')
            // a.href = url
            // a.download = Filetype.fileName || 'airdrop'
            // document.body.appendChild(a)
            // a.style = 'display: none'
            // a.click()
            // a.remove()
            // if (Notification.permission === 'granted') {
            //   new Notification(
            //     `${
            //       Filetype.fileName || 'airdrop ' + Date.now()
            //     } downloaded successfully 😀`
            //   )
            // }
          }
          update(message);
          array = [];
        } else {
          array = [...array, data];
        }
      }
    };

    // listener for data stream
    peer.on('data', handleIncomingMessage);

    // cleanup the data
    return () => peer.off('data', handleIncomingMessage);
  }, [message, Filetype, final, Typing]);

  // handle file sending using effect

  const handleChange = (e) => {
    setText({
      text: e.target.value,
    });
  };
  const handleFile = () => {
    file.current.click();
  };

  // handle the eventlistener
  const handleFileChange = async (e) => {
    // console.log(e.target.files[0])
    if (!e.target.files[0] || err) return;
    let file_data = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const url = URL.createObjectURL(dataURItoBlob(reader.result));
      let datas = {
        id: uuid(),
        name: name[0].name,
        message: `${file_data.name} is sending...`,
        url,
        type: file_data.type,
        sentAt: Date.now(),
        self: true,
      };

      setMessage((old) => [...old, datas]);

      try {
        // set Blured Image
        imageID.current.style.filter = 'blur(10px)';
      } catch (err) {
        console.log('This is not an image');
      }
    };
    reader.readAsDataURL(file_data);

    // chunkStream.write(demo)

    let share = await share_file(file_data);
    bufferArrayuni[0].name = name[0].name;
    peer.send(JSON.stringify(bufferArrayuni[0]));
    // console.log(bufferArrayuni)
    // console.log('Raw Data from the chunk', share)
    if (share.slice(-1)[0].byteLength === 0) {
      const stream = from(share);
      stream.subscribe((data) => {
        // console.log('Sending the file: and the file is:', new Buffer.from(data))
        peer.write(new Buffer.from(data), () => {
          // console.log('Send the chunk:', data)
          if (data.byteLength === 0) {
            // peer.send(JSON.stringify(bufferArrayuni.slice(-1).pop()))
            peer.send('final');
            try {
              // Remove Blured Image
              imageID.current.style.filter = 'blur(0px)';
            } catch (err) {
              console.log('This is not an image');
            }
          }
        });
      });
    } else {
      console.log('Cant send');
    }
  };

  /**
   * Handle Focus,
   * Send typing to other peer
   *
   */
  const handleFocus = () => {
    if (!connected) return;
    peer.send(
      JSON.stringify({
        type: 'info',
        typing: false,
      })
    );
  };

  const handleBlur = () => {
    if (!connected) return;
    peer.send(
      JSON.stringify({
        type: 'info',
        typing: false,
      })
    );
  };

  const handleKeyPress = () => {
    if (!connected) return;

    if (inputVariable.current.value === '')
      peer.send(
        JSON.stringify({
          type: 'info',
          typing: true,
        })
      );
  };
  return (
    <>
      <Helmet>
        <title>Safeshare.live - Connected with room {id}</title>
        <link rel='canonical' href='https://safeshare.live/' />
        <meta
          name='description'
          content='SafeShare.live is a online file sharing service. 1. Create a name. 2. Choose a person and send the file realtime'
        />
      </Helmet>
      <div className='container'>
        <div className='chat-container'>
          <div
            style={{
              display: 'flex',
              width: '98%',
              height: '30px',
              padding: '10px',
              background: '#181717',
              color: '#fff',
            }}
          >
            <a className=' Iazdo' href='/'>
              <span
                style={{ display: 'inline-block', transform: 'rotate(270deg)' }}
              >
                <svg
                  aria-label='Back'
                  className='_8-yf5 '
                  fill='#fff'
                  height='24'
                  viewBox='0 0 48 48'
                  width='24'
                >
                  <path d='M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z'></path>
                </svg>
              </span>
            </a>
            <header> {id}</header>
            {window.location.hash === '#init' ? (
              <span className='msg-check'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 16 15'
                  width='16'
                  height='15'
                >
                  <path
                    fill='#fff'
                    d='M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z'
                  ></path>
                </svg>
              </span>
            ) : (
              ''
            )}
          </div>

          <div className='Message'>
            {connected ? (
              message.length > 0 ? (
                message.map((data) => {
                  let condition = /^image/gi.test(data.type);

                  return condition ? (
                    <ImageCon
                      key={data.id}
                      data={data}
                      messageContainer={messageContainer}
                      imageID={imageID}
                    />
                  ) : (
                    <Message
                      key={data.id}
                      forwardedRef={messageContainer}
                      data={data}
                    />
                  );
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
                Setting everything up, Don't Refresh, Please wait...
              </p>
            )}
            {Typing ? (
              <Message
                forwardedRef={messageContainer}
                data={{
                  self: false,
                  typing: true,
                }}
              />
            ) : (
              <Message
                forwardedRef={messageContainer}
                data={{
                  self: false,
                  typing: false,
                }}
              />
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
                    onKeyPress={handleKeyPress}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder='Type a message or send a file... '
                    // autoFocus
                    // style={{ width: '100%', height: '50px', outline: 'none' }}
                  />
                  <input
                    type='file'
                    ref={file}
                    onChange={handleFileChange}
                    style={{
                      cursor: 'text',
                      whiteSpace: 'pre-wrap',
                      overflowWrap: 'break-word',
                    }}
                    hidden
                  />
                </div>
                <div>
                  <div className='button-style'>
                    <button
                      className='wpO6b '
                      style={{
                        background: 'transparent',
                        border: '0px',
                        cursor: 'pointer',
                        outline: 'none',
                      }}
                      type='button'
                      onClick={handleFile}
                    >
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
    </>
  );
}
