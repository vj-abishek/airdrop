import Peer from 'simple-peer';
import { EventEmitter } from 'events';
import SimplePeerFiles from 'simple-peer-files';
import socket from '../../../Functions/Users';

const spf = new SimplePeerFiles();

class SimpleSignal extends EventEmitter {
  constructor() {
    super();
    this.state = {
      answer: null,
      offer: null,
      peer: null,
      connected: false,
      shareID: null,
    };

    this.peer = new Peer({
      initiator: window.location.hash === '#init',
      trickle: false,
    });
    this.peer.on('signal', (data) => {
      if (data.type === 'offer') {
        this.state.offer = data;
        this.emit('got offer');
      }
    });

    socket.on('shareID', ({
      shareID, channelID, rest
    }) => {
      console.log(shareID, rest);
      this.emit('shareID', shareID);
      this.state.shareID = shareID;
      // peer is the SimplePeer object connection to sender
      spf.receive(this.peer, this.state.shareID).then((transfer) => {
        transfer.on('progress', (sentBytes) => {
          console.log(sentBytes);
        });

        transfer.on('done', (file) => {
          const url = URL.createObjectURL(file);
          this.emit('recieved', {
            url, shareID, channelID, type: rest.type, name: rest.name,
          });
        });

        // Call readyToSend() in the sender side
        this.peer.send('heySenderYouCanSendNow');
      });
    });

    // this.peer.on('data', console.log);

    console.log('Calles consruct');
  }

  Signal(from, to) {
    console.log('called signal');
    if (this.connected) {
      this.peer.destroy();
      this.emit('newConnection');
    }
    this.emit('instance', this.peer);
    this.on('got offer', () => {
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
    console.log('Init signal');
    // listen to socket
    socket.on('backOffer', (data) => {
      this.state.offer = JSON.parse(data.payload);
      this.emit('instance', this.peer);
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
    this.on('newConnection', () => {
      this.emit('connected', false);
    });
    return this.emit('connected', false);
  }

  Send(FileList, shareID) {
    spf.send(this.peer, shareID, FileList).then((transfer) => {
      transfer.on('progress', (sentBytes) => {
        console.log(sentBytes);
      });
      transfer.start();
    });
  }

  print() {
    console.table({ offer: this.state.offer, answer: this.state.answer });
  }
}

export default SimpleSignal;
