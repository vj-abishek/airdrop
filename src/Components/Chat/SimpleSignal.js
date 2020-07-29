import { EventEmitter } from 'events';
import socket from '../Functions/Users'
import Peer from 'simple-peer'


class SimpleSignal extends EventEmitter {
    constructor() {
        super();
        this.state = {
            anwser: {},
            offer: {},
            peer: null,
            connected: false
        }

        this.peer = new Peer({
            initiator: window.location.hash === "#init",
            trickle: false,
        })

        this.peer.on('signal', (data) => {
            if (data.type === "offer") {
                this.state.offer = data;
                socket.emit('airdropOffer', data)
                return this.emit('signal', data)
            }
            else {
                this.state.answer = data;
                socket.emit('airdropAnswer', data)
                return this.emit('offer', data)
            }
        })

        //listen to socket
        socket.on('backOffer', (data) => {
            this.state.offer = data;
            this.peer.signal(data)
        })


        socket.on('airdropBackAnswer', data => {
            this.state.answer = data
            this.peer.signal(data)
        })

    }

    // // sendOffer() {
    // //     this.peer.on('signal', (data) => {
    // //         this.state.offer = data;
    // //         socket.emit('airdropOffer', this.state.offer)
    // //     })

    // }

    print() {
        console.table({ offer: this.state.offer, answer: this.state.anwser })
    }


}

export { SimpleSignal };