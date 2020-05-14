import React, { useEffect, useReducer, useState } from 'react'
import QRCode from 'qrcode.react'
import { Ring } from 'react-spinners-css'
import socket from '../Functions/Users'
import { v4 as uuid } from 'uuid'
import { Join } from '../../State/action'
import history from '../history'

export default function Qrcode() {
  // eslint-disable-next-line
  const [sockets, dispatch] = useReducer(Join, {})
  const [created, setCreated] = useState(false)
  console.log(sockets)
  const [id, setId] = useState('https://safeshare.live/join')
  useEffect(() => {
    const uid = uuid()
    setId(`${uid}`)
    console.log(uid)
    if (uid) dispatch({ type: 'JOIN_ME', uid })
  }, [])

  useEffect(() => {
    const fun = () => {
      console.log('Created room')
      setCreated(true)
    }
    socket.on('createdRoom', fun)
    return () => socket.off('createdRoom', fun)
  }, [created])

  useEffect(() => {
    const anFun = () => {
      console.log('Joined,Redirecting...')
      history.push(`/chat/${id}`)
    }
    socket.on('createdJoined', anFun)
    return () => socket.off('createdJoined', anFun)
  })

  return !created ? (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Ring color='#3f51b5' />
    </div>
  ) : (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Scan the Qrcode</h1>

      <QRCode
        title={`${window.location.origin}/join/${id}`}
        value={`${window.location.origin}/join/${id}`}
        size={200}
        level={'L'}
        includeMargin={true}
        renderAs={'canvas'}
      />
      <h3>And Open the link in a browser</h3>
    </div>
  )
}
