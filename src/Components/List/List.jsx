import React, { useState, useEffect } from 'react'
import history from '../history'
import { useParams } from 'react-router-dom'
import socket from '../Functions/Users'
import './List.css'

//variable for redirection
let click = false

export default function List() {
  //get ID from the URL
  const { id } = useParams()
  const userID = atob(id)
  const [user, setUser] = useState({
    online: 1,
  })
  const [room, setRoom] = useState()
  const [feedback, setfeedback] = useState(false)

  //feedback
  if (room || feedback) {
    window.navigator.vibrate(200)
  }

  //effect
  useEffect(() => {
    const set = (data) => {
      setRoom(data)
    }
    socket.on('join_room', set)
    return () => socket.off('join_room', set)
  }, [room])

  socket.on('users', (user) => {
    setUser({
      online: user.online_users,
      name: user.users,
    })
  })

  //listen to events

  const { name } = user

  //handle click
  const handleClick = (e) => {
    e.stopPropagation() //to stop propagating events
    if (userID === e.target.dataset['name']) return

    setfeedback(true)
    click = !click
    socket.emit('room_name', {
      room: e.target.dataset['name'],
      id: e.target.dataset['id'],
      name: userID,
    })
  }

  socket.on('Joined', (data) => {
    if (click) {
      history.push(`/chat/${data.room}`)
    } else {
      history.push(`/chat/${data.room}#init`)
    }
  })

  const handleAccept = () => {
    socket.emit('Join_by_ME', room)
  }

  return (
    <div className='list_style'>
      <div className='container_for_me'>
        <h3>
          Your name is <q>{userID}</q>: ({user.online})
        </h3>
        <br />
        <ul style={{ listStyle: 'decimal-leading-zero' }}>
          {name &&
            name.map((data) => (
              <li
                key={data.id}
                data-id={data.id}
                data-name={data.name}
                onClick={handleClick}
              >
                {data.name}
              </li>
            ))}
        </ul>
        {!name ? (
          <q>
            Please wait untill your friend joins the connection or you will
            recieve a notification to join
          </q>
        ) : (
          ''
        )}
        {feedback ? (
          <q>
            Request send to the room successfully. Wait until the request is
            accepted!
          </q>
        ) : (
          ''
        )}
        {room ? (
          <div style={{ textAlign: 'center' }}>
            <h4>
              {room.name} wants to connect with you id:({room.room})
            </h4>
            <button className='btn_accept' onClick={handleAccept}>
              Accept
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
