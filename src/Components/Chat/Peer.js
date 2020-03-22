import socket from '../Functions/Users'
import Peer from 'simple-peer'
import history from '../history'
// import { Ripme, recievedFile } from './FileShare/PromiseFile'
import b64toBlob from 'b64-to-blob'

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

//listen for data changes
let array = []
let original = ''
peer.on('data', data => {
  const parsed = JSON.parse(data)
  if (parsed.type === 'text/plain') {
    console.log('Text message', parsed)
  } else {
    // Ripme(parsed)
    array = [...array, parsed]
    let news = array.filter((data, i) => {
      let file = data.file !== undefined ? data.file : ''

      let only = file.split(`data:${data.type};base64,`)
      let base = only[1]

      return base
    })
    console.log(news.length === parsed.chunk - 1, news.length, parsed.chunk)
    if (news.length === parsed.chunk && news.length > 0 && parsed.chunk > 0) {
      news.map((data, i) => {
        let file = data.file !== undefined ? data.file : ''
        let only = file.split(`data:${data.type};base64,`)
        let base = only[1]
        original += base

        return original
      })
      console.log(
        news.length === parsed.chunk && news.length > 0 && parsed.chunk > 0
      )

      let blob = b64toBlob(original, parsed.type)
      console.log(blob)

      let url = window.URL.createObjectURL(blob)
      console.log('URL:', url)
      let a
      a = document.createElement('a')
      a.href = url
      a.download = `airdrop`
      document.body.appendChild(a)
      a.style = 'display: none'
      a.click()
      array = []
      original = ''
    } else {
      console.log('im here')
    }
  }
})

export default peer
// let buffer = new Blob(array, {
//   type: parsed.type
// })
// let url = window.URL.createObjectURL(buffer)
// console.log('URL:', url)
// let a
// a = document.createElement('a')
// a.href = url
// a.download = `airdrop`
// document.body.appendChild(a)
// a.style = 'display: none'
// a.click()
