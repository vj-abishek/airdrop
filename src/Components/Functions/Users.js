import io from 'socket.io-client';

// const connectionString = window.location.hostname === 'localhost'
//   ? `https://relp-server1.herokuapp.com/`
//   : 'https://relp-server1.herokuapp.com/';
const socket = io.connect('https://relp-server1.herokuapp.com/');

export default socket;
