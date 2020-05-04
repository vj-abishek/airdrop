import React, { useReducer, useState, useEffect } from 'react'
import Info from '../../Tools/Getdevice'
// import { Redirect } from 'react-router-dom'
import { setUser } from '../../State/action'

export default function AutoPage() {
  // eslint-disable-next-line
  const [socket, dispatch] = useReducer(setUser, '')
  const [name, setName] = useState()

  useEffect(() => {
    const info = Info()
    setName(info[2])
    if (name) dispatch({ type: 'SET_NAME', name })
  }, [name])

  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        height: '100vh',
        background: 'rgb(24,24,24)',
        color: '#fff',
        textAlign: 'center',
        margin: 'auto',
        verticalAlign: 'middle',
        width: '100%',
      }}
    >
      <h1 style={{ marginTop: '40vh' }}> Loading...</h1>
    </div>
  )
}
