import Peer from 'simple-peer';
import { EventEmitter } from 'events';
import * as streamSaver from 'streamsaver';
import db from './Settings.model';
import * as ponyfill from 'web-streams-polyfill/ponyfill'
import SimplePeerFiles from 'simple-peer-files';
import socket from '../../../Functions/Users';

const spf = new SimplePeerFiles();

class SimpleSignal extends EventEmitter {
  constructor(uid) {
    super();
    this.state = {
      answer: null,
      offer: null,
      peer: null,
      connected: false,
      shareID: null,
      autoDownload: false,
    };

    this.uid = uid;

    this.params = window.location.pathname.split('/')[2];


    db.uid
      .where('id')
      .equalsIgnoreCase(this.uid)
      .toArray()
      .then(data => {
        if (data) {
          this.state.autoDownload = data[0].autoDownload;
        }
      }).catch(err => console.log);

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

    this.on('got meta data', (parsed) => {
      // peer is the SimplePeer object connection to sender
      const { payload } = parsed;
      spf.receive(this.peer, payload.messages.shareID).then((transfer) => {
        this.emit('transfer started', payload);
        transfer.on('progress', (sentBytes) => {
          this.emit('receive progress', { sentBytes, shareID: payload.messages.shareID });
        });

        transfer.on('done', (file) => {
          const url = URL.createObjectURL(file);
          this.emit('recieved', { url, payload });
        });

        if (this.state.autoDownload) {
          const fileStream = transfer.createReadStream();
          streamSaver.WritableStream = ponyfill.WritableStream;
          const downloadStream = streamSaver.createWriteStream(payload.messages.name, {
            size: payload.messages.size
          });

          const writer = downloadStream.getWriter()

          fileStream
            .on('data', chunk => writer.write(chunk))
            .on('end', () => writer.close())
        }

      });

    })
    this.peer.on('data', (data) => {
      try {
        const parsed = JSON.parse(data);
        if (parsed?.type === 'text/relp') {
          this.emit('got meta data', parsed);
        }
      } catch (err) {
        console.log(err);
      }
    });

  }

  Signal(from, to) {
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
      this.state.answer = JSON.parse(data.payload);
      this.peer.signal(this.state.answer);
    });
  }

  Init() {
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

  Send(TextMessage, FileList, shareID) {
    if (TextMessage) {
      this.peer.send(JSON.stringify(TextMessage));
    } else {
      spf.send(this.peer, shareID, FileList).then((transfer) => {
        transfer.on('progress', (sentBytes) => {
          this.emit('send progress', sentBytes);
        });
        transfer.start();
      });
    }
  }

  print() {
    console.table({ offer: this.state.offer, answer: this.state.answer });
  }
}

export default SimpleSignal;
