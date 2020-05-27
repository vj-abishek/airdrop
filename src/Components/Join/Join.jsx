import React, { useEffect, useReducer } from 'react'
// import { Join } from '../../State/action'
import { useParams } from 'react-router-dom'
import { roomJoin } from '../../State/action'
import history from '../history'
import { Ring } from 'react-spinners-css'
import socket from '../Functions/Users'
import { Helmet } from 'react-helmet'

export default function Join() {
  // eslint-disable-next-line
  const [sockets, dispatch] = useReducer(roomJoin, {})
  //get ID from the URL
  const { id } = useParams()
  useEffect(() => {
    console.log('Dispatching')
    if (id !== undefined) dispatch({ type: 'JOIN_ROOM', id })
  }, [id])

  useEffect(() => {
    const fun = () => {
      console.log('Joined,Redirecting...')
      history.push(`/chat/${id}#init`)
    }
    socket.on('createdJoined', fun)
    return () => {
      socket.off('createdJoined', fun)
    }
  }, [id])

  return (
    <>
      <Helmet>
        <title>Joning to other peer...</title>
        <link rel='canonical' href='https://safeshare.live/' />
        <meta
          name='description'
          content='SafeShare.live is a online file sharing service. 1. Create a name. 2. Choose a person and send the file realtime'
        />
      </Helmet>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgb(24, 24, 24)',
          color: '#fff',
          flexDirection: 'column',
        }}
      >
        <Ring color='#3f51b5' />
      </div>
    </>
  )
}
