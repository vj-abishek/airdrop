import socket from '../Functions/Users'
import Peer from 'simple-peer'
import history from '../history'

const { location } = history
let er = location.search
// console.log()
export let name_of_room = er.split('?chat=')
const peer = new Peer({
  initiator: window.location.hash === '#init',
  trickle: false
})
peer.on('signal', data => {
  console.log('SIGNAL', data)
  // console.log(name_of_room[1])
  let now = {
    data,
    room: name_of_room[1]
  }
  socket.emit('offer', now)
})

//listen to socket
socket.on('backOffer', data => {
  peer.signal(data.data)
})

export default peer
