import Peer from 'simple-peer';
import { EventEmitter } from 'events';
import socket from '../../../Functions/Users';

class SimpleSignal extends EventEmitter {
  constructor() {
    super();
    this.state = {
      answer: {},
      offer: {},
      peer: null,
      connected: false,
    };
    this.emit('testing');
  }

  Signal(from, to) {
    this.peer = new Peer({
      initiator: true,
      trickle: false,
    });
    this.peer.on('signal', (data) => {
      this.state.offer = data;
      console.log('Sending data first attempt');
      socket.emit('offer', {
        from,
        to,
        payload: JSON.stringify(this.state.offer),
      });
    });

    this.peer.on('connect', () => {
      console.log('Finally Connected 😀🎉🎊🥳');
      this.print();
      this.state.connected = true;
    });
    socket.on('backAnswer', (data) => {
      console.log(data);
      this.state.answer = JSON.parse(data.payload);
      this.peer.signal(this.state.answer);
    });
  }

  Init() {
    // listen to socket
    socket.on('backOffer', (data) => {
      this.state.offer = JSON.parse(data.payload);
      this.peer = new Peer({
        initiator: false,
        trickle: false,
      });
      console.log(this.state.offer);
      this.peer.on('signal', (answer) => {
        this.state.answer = answer;
        socket.emit('answer', {
          from: data.from,
          to: data.to,
          payload: JSON.stringify(answer),
        });
      });
      this.peer.signal(this.state.offer);

      this.peer.on('connect', () => {
        console.log('Finally Connected 😀🎉🎊🥳');
        this.print();
        this.state.connected = true;
        return this.emit('connected', this.state.connected);
      });
    });
    return this.emit('connected', false);
  }

  print() {
    console.table({ offer: this.state.offer, answer: this.state.answer });
  }
}

export default SimpleSignal;
