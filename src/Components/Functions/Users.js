import io from 'socket.io-client'


// const socket = (window.location.hostname === 'localhost' || '192.168.43.50') ? io.connect(`http://${window.location.hostname}:3030`) : io.connect('https://abigo-facetime.herokuapp.com/', { transports: ['websocket'] })

const socket = io.connect('https://abigo-facetime.herokuapp.com/', { transports: ['websocket'] })

export default socket

// The server URL's

//https://denoreact.web.app/
//https://us-central1-denoreact.cloudfunctions.net/app
// https://abigo-facetime.herokuapp.com/
// https://facetime.azurewebsites.net/
