import React, { useState, useEffect } from 'react'
import history from '../history'
// import { setUser } from '../../State/action'
import socket from '../Functions/Users'
import './List.css'

export default function List() {
  const { location } = history
  let er = location.search
  // console.log()
  let name_of_users = er.split('?name=')
  // console.log(location.search)
  // console.log(users)
  const [user, setUser] = useState({
    online: 1,
  })
  const [room, setRoom] = useState()
  const [feedback, setfeedback] = useState(false)

  if (room || feedback) {
    window.navigator.vibrate(200)
  }
  //effect
  useEffect(() => {
    socket.on('join_room', (data) => {
      // console.log('The server data:', data)
      setRoom(data)
    })
    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [room])

  socket.on('users', (user) => {
    // console.log(user)
    setUser({
      online: user.online_users,
      name: user.users,
    })
  })
  //listen to events

  const { name } = user
  // console.log(!name)
  //handle click
  const handleClick = (e) => {
    if (name_of_users[1] === e.target.dataset['name']) return
    // console.log(e.target.dataset['name'])
    setfeedback(true)
    socket.emit('room_name', {
      room: e.target.dataset['name'],
      id: e.target.dataset['id'],
      name: name_of_users[1],
    })
    // console.log(name_click.current.dataset['name'])
  }

  socket.on('Joined', (data) => {
    history.push(`/chat/?chat=${data.room}`)
  })

  const handleAccept = () => {
    socket.emit('Join_by_ME', room)
    // console.log('Click this')
    history.push(`/chat/?chat=${room.room}#init`)
    // console.log(socket)
  }

  return (
    <div className='list_style'>
      <p>
        There are {user.online} users active now. And Your name is{' '}
        <b>{name_of_users[1]}</b>
      </p>
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
          Request send to the room successfully. Wait untill the request is
          accepted!
        </q>
      ) : (
        ''
      )}
      {room ? (
        <div>
          <div>
            {room.name} wants to connect with you id:({room.room})
          </div>
          <button onClick={handleAccept}>Accept</button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
