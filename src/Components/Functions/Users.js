import io from 'socket.io-client'


const socket =
  window.location.protocol === 'http'
    ? io.connect(`${window.location.hostname}:3030`)
    : io.connect('https://abigo-facetime.herokuapp.com/')

export default socket

//The server URL
//https://denoreact.web.app/
//https://us-central1-denoreact.cloudfunctions.net/app
// https://abigo-facetime.herokuapp.com/
// https://facetime.azurewebsites.net/
