import Peer from 'simple-peer';
import { EventEmitter } from 'events';
import socket from '../Functions/Users';

class Call extends EventEmitter {
    constructor() {
        super();
        this.state = {
            offer: {},
            gotAnswer: false,
            answer: {},
        };
        this.connected = false;
        this.peer = '';
    }

    Call(from, to) {
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
        }).then((stream) => {
            this.stream = stream;
            // console.log(stream);
            this.peer = new Peer({ initiator: true, trickle: false, stream });
            this.peer.on('signal', (data) => {
                console.log('peer1', data);
                if (data.type === 'offer') {
                    this.state.offer = data;
                }
                console.log('Sending offer...');
                socket.emit('callOffer', {
                    from,
                    to,
                    payload: JSON.stringify(data),
                });
            });

            this.peer.on('connect', () => {
                console.log('Finally Connected 😀🎉🎊🥳');
                this.connected = true;
                this.emit('connected');
                this.print();
            });

            socket.on('callBackAnswer', (data) => {
                console.log(JSON.parse(data.payload));
                this.state.answer = JSON.parse(data.payload);
                this.peer.signal(this.state.answer);
            });

            this.peer.on('stream', (s) => {
                const audio = new Audio();
                audio.srcObject = s;
                audio.play();
                console.log('Got s', s);
            });

            this.peer.on('data', (data) => {
                console.log(JSON.parse(data));
            });

            this.peer.on('destroy', () => {
                this.connected = false;
            });
            this.peer.on('error', (e) => {
                this.connected = false;
                console.log(e);
            });

            // this.peer.addStream(this.stream);
        }).catch(() => alert('No webcam access!'));
    }

    Init() {
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
        }).then((stream) => {
            this.stream = stream;
            console.log('Init signal');
            this.peer = new Peer({ trickle: false, stream });
            // console.log(stream);
            // this.peer.addStream(this.stream);
            // listen to socket
            socket.on('callBackOffer', (data) => {
                this.state.offer = JSON.parse(data.payload);
                console.log('peer2', this.state.offer);
                this.peer.on('signal', (answer) => {
                    this.state.answer = answer;
                    socket.emit('callAnswer', {
                        from: data.from,
                        to: data.to,
                        payload: JSON.stringify(answer),
                    });
                });
                this.peer.signal(this.state.offer);
                this.peer.on('connect', () => {
                    console.log('Finally Connected 😀🎉🎊🥳');
                    this.emit('connected');
                    this.connected = true;
                    // this.peer.send(JSON.stringify('Hello world'));
                    this.print();
                });
            });
            this.peer.on('stream', (stream) => {
                const audio = new Audio();
                audio.srcObject = stream;
                audio.play();
                console.log(stream);
            });

            this.peer.on('destroy', () => {
                this.connected = false;
            });
            this.peer.on('error', (e) => {
                this.connected = false;
                console.log(e);
            });
        }).catch(() => alert('No webcam access!'));
    }

    print() {
        console.table({ offer: this.state.offer, answer: this.state.answer });
    }
}

export default Call;
