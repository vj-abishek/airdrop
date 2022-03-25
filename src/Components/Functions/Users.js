import io from 'socket.io-client';

const connectionString = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:8080`
    : 'https://relp-server1.herokuapp.com/';

//: 'https://relp.vsbabuj.repl.co/';
// https://relp-server1.herokuapp.com/
// https://relp-socket.me/
const socket = io.connect(connectionString);
export default socket;
