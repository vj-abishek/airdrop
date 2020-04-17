import io from 'socket.io-client'

const socket =
  window.location.host === 'localhost:3000'
    ? io.connect('localhost:3030')
    : io.connect('https://airdrop-server.now.sh/')

export default socket
