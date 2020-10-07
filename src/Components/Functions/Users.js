import io from 'socket.io-client';

const connectionString = (window.location.hostname === 'localhost') ? `http://${window.location.hostname}:8080` : 'https://relp-server.herokuapp.com/';
const socket = io.connect(connectionString, { transports: ['websocket'] });

export default socket;
