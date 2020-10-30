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
        console.log('Calles constructor of call.js');
    }

    Call(from, to) {
        this.peer = new Peer({ initiator: true, trickle: false });

        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
        }).then((stream) => {
            this.stream = stream;
            // console.log(stream);
        }).catch(console.log);

        this.peer.on('signal', (data) => {
            console.log('peer1', data);
            this.state.offer = data;
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
            this.peer.addStream(this.stream);
        });

        socket.on('callBackAnswer', (data) => {
            console.log(JSON.parse(data.payload));
            this.state.answer = JSON.parse(data.payload);
            this.peer.signal(this.state.answer);
        });

        this.peer.on('stream', (stream) => {
            const audio = new Audio();
            audio.srcObject = stream;
            audio.play();
            console.log('Got stream', stream);
        });

        this.peer.on('data', (data) => {
            console.log(JSON.parse(data));
        });
    }

    Init() {
        console.log('Init signal');
        this.peer = new Peer({ initiator: false, trickle: false });
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
        }).then((stream) => {
            this.stream = stream;
            console.log(stream);
        }).catch(console.log);
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
                this.peer.addStream(this.stream);
            });
        });
        this.peer.on('stream', (stream) => {
            const audio = new Audio();
            audio.srcObject = stream;
            audio.play();
            console.log(stream);
        });
    }

    print() {
        console.table({ offer: this.state.offer, answer: this.state.answer });
    }
}

export default Call;
