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
  Peer = new SimpleSignal(uid);
  console.log('Im the initiator. Happy');
  Peer.Signal(uid, to);

  Peer.peer.on('connect', () => {
    console.log('Connected');
    dispatch({ type: 'PEER_CONNECTED', payload: true });
  });
};

export const InitOther = () => (dispatch, getState) => {
  const { uid } = getState().authReducer.user;

  Peer = new SimpleSignal(uid);
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
  const messageId = nanoid(25);
  const obj = {
    messages: {
      type: FileList.type,
      name: FileList.name,
      time: Date.now(),
      url,
      shareID,
      from: uid,
      messageId,
      to,
    },
    channel: channelID,
  };
  dispatch({ type: 'ON_MESSAGE', payload: obj });

  // Send meta data
  Peer.Send({
    type: 'text/relp',
    payload: {
      channel: obj.channel,
      messages: {
        url: 'placeholder',
        type: FileList.type,
        name: FileList.name,
        size: FileList.size,
        time: Date.now(),
        shareID,
        from: uid,
        messageId,
        to,
      },
    },
  });

  Peer.Send(false, FileList, shareID);
  dispatch({ type: 'PROGRESS', payload: { sentBytes: 0, shareID } });
  Peer.on('send progress', (data) => {
    dispatch({ type: 'PROGRESS', payload: { sentBytes: data, shareID } });
  });
};

export const RecieveFile = () => (dispatch) => {
  if (Peer) {
    Peer.on('transfer started', (payload) => {
      dispatch({ type: 'ON_MESSAGE', payload });
    });

    Peer.on('receive progress', (data) => {
      console.log('recieve progresss', data)
      dispatch({ type: 'PROGRESS', payload: data });
    });

    Peer.on('recieved', ({ url, payload }) => {
      dispatch({ type: 'SET_URL', payload: { url, payload } });
      dispatch({ type: 'PROGRESS', payload: { sentBytes: 100, shareID: payload.shareID } });
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
