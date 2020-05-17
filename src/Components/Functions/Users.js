import io from 'socket.io-client'

const socket =
  window.location.host === 'localhost:3000'
    ? io.connect('localhost:3030')
    : io.connect('https://us-central1-denoreact.cloudfunctions.net/app')

export default socket

//The server URL
//https://denoreact.web.app/
//https://us-central1-denoreact.cloudfunctions.net/app
// https://abigo-facetime.herokuapp.com/
