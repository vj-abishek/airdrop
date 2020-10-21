import { nanoid } from 'nanoid';
import SimpleSignal from '../../Components/Channel/Chat/Utils/SimpleSignal';
import socket from '../../Components/Functions/Users';
import firebase from '../../config/fb';
import 'firebase/database';

const realTimeDB = firebase.database();
let Peer = null;

const getId = (channelID, state) => {
  const { uid } = state().authReducer.user;

  const [to] = state().channelReducer.channels.filter(
    (id) => id.channelId === channelID,
  );
  const finalTo = to.from === uid ? to.to : to.from;
  return finalTo;
};

export const InitSignal = (uid, to) => (dispatch) => {
  Peer = new SimpleSignal();
  console.log('Im the initiator. Happy');
  Peer.Signal(uid, to);

  Peer.peer.on('connect', () => {
    console.log('Connected');
    dispatch({ type: 'PEER_CONNECTED', payload: true });
  });
};

export const InitOther = () => (dispatch) => {
  Peer = new SimpleSignal();
  console.log('Called me');
  Peer.Init();
  Peer.on('connected', () => {
    console.log('Connected');
    dispatch({ type: 'PEER_CONNECTED', payload: true });
  });
};

export const SendFiles = (shareID, channelID, FileList) => (_, getState) => {
  const finalTo = getId(channelID, getState);
  if (finalTo) {
    socket.emit('shareID', {
      shareID, finalTo, channelID, type: FileList.type, name: FileList.name,
    });
  }
};

export const SendFile = (FileList, url, shareID, channelID) => (dispatch, getState) => {
  const { uid } = getState().authReducer.user;
  const to = getId(channelID, getState);

  if (Peer === null) {
    dispatch({ type: 'ERROR_WHILE_SENDING', payload: 'NOT_CONNECTED' });
    return;
  }
  const obj = {
    messages: {
      type: FileList.type,
      name: FileList.name,
      time: Date.now(),
      url,
      shareID,
      from: uid,
      messageId: nanoid(25),
      to,
    },
    channel: channelID,
  };
  dispatch({ type: 'ON_MESSAGE', payload: obj });

  Peer.Send(FileList, shareID);
};

export const RecieveFile = () => (dispatch) => {
  if (Peer) {
    Peer.on('recieved', ({
      url, shareID, channelID, type, name,
    }) => {
      const obj = {
        messages: {
          type,
          name,
          time: Date.now(),
          url,
          shareID,
          from: 'uid',
          messageId: nanoid(25),
        },
        channel: channelID,
      };
      console.log(obj);
      console.log('From frontend', url);
      dispatch({ type: 'ON_MESSAGE', payload: obj });
    });
  }
};

export const IndicateChannel = (channelID, uid, status) => () => {
  if (status) {
    realTimeDB.ref(uid).set(null);
    return;
  }
  realTimeDB.ref(uid).set(channelID);
};

export const getCurrentChannel = (to) => (dispatch) => {
  realTimeDB.ref(to).on('value', (snapshot) => {
    dispatch({ type: 'CURRENT_CHANNEL', payload: { res: snapshot.val() } });
  });
};
