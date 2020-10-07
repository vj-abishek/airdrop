import io from 'socket.io-client';

// const socket = io.connect('https://abigo-facetime.herokuapp.com/', { transports: ['websocket'] });
const socket = io.connect(`http://${window.location.hostname}:8080`, { transports: ['websocket'] });

export default socket;
