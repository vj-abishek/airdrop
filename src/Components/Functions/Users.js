import io from 'socket.io-client'

const socket =
  window.location.host === 'localhost:3000'
    ? io.connect('localhost:3030')
    : io.connect('https://denoreact.web.app/server')

export default socket

// https://abigo-facetime.herokuapp.com/
