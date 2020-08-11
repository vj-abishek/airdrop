import { EventEmitter } from 'events';
import Peer from 'simple-peer';
import socket from '../Functions/Users';

class SimpleSignal extends EventEmitter {
    constructor() {
        super();
        this.state = {
            answer: {},
            offer: {},
            peer: null,
            connected: false,
            peers: [],
            first: true,
        };

        this.peer = new Peer({
            initiator: window.location.hash === '#init',
            trickle: false,
        });

        this.peer.on('signal', (data) => {
            if (data.type === 'offer') {
                this.state.offer = data;
                console.log('Sending data first attempt');
                this.state.first = false;
                socket.emit('airdropOffer', this.state.offer);
                return this.emit('signal', data);
            }

                this.state.answer = data;
                socket.emit('airdropAnswer', data);
                return this.emit('offer', data);
        });

        // listen to socket
        socket.on('backOffer', (data) => {
            this.state.offer = data;
            this.peer.signal(data);
        });

        socket.on('airdropBackAnswer', (data) => {
            this.state.answer = data;
            this.peer.signal(data);
        });

        socket.on('indicateOtherPeer', (peer) => {
            console.log(`${peer.peer} send connection at ${peer.time}`);
            this.state.peers.push(peer);
            console.log(this.state.peers);
            this.generate();
        });

        this.peer.on('connect', () => {
            console.log('Finally Connected 😀🎉🎊🥳');
            this.print();
            this.state.connected = true;
        });
    }

    signal(peer) {
        if (window.location.hash !== '#init' && this.state.first === false && !this.state.connected) {
            socket.emit('indicateOtherPeer', {
                peer,
                time: Date.now(),
            });
        } else if (peer === 'retry') {
            socket.emit('indicateOtherPeer', {
                peer,
                time: Date.now(),
            });
        } else return;
    }

    generate() {
        console.log('Sending data Second attempt');
        socket.emit('airdropOffer', this.state.offer);
    }

    print() {
        console.table({ offer: this.state.offer, answer: this.state.answer });
    }
}

export { SimpleSignal };
