import { isToday } from 'date-fns';
import firebase from '../../config/fb';
import history from '../../history';
import socket from '../../Components/Functions/Users';
import E2E from '../../Components/Utils/EndToEnd';
import db from '../../Components/Utils/Message.model';

const e2e = new E2E();
const messageTone = document.querySelector('#message-tone');
let notificationPermission = null;

if('Notification' in window){
  notificationPermission = Notification.permission;
}
const firestoreDb = firebase.firestore();

export const sendmessage = (message, details) => async (dispatch, getState) => {
  const { uid, displayName, photoURL } = getState().authReducer.user;
  const [to] = getState().channelReducer.channels.filter(
    (id) => id.channelId === details.channel,
  );
  const lastMessageMap = getState().messageReducer.lastMessage;
  let lastMessageObj = {};
  const hasInMap = lastMessageMap.has(details.channel);
  const getInMap = lastMessageMap.get(details.channel);

  if (
    hasInMap &&
    typeof getInMap.message !== 'undefined' &&
    !isToday(getInMap.message.time)
  ) {
    lastMessageObj = {
      showDateInfo: true,
    };
  }

  // Case 2: If there is no messages
  if (hasInMap && typeof getInMap.message === 'undefined') {
    lastMessageObj = {
      showDateInfo: true,
    };
  }

  const needsToEnc = {
    from: uid,
    ...message,
  };
  const final = {
    ...needsToEnc,
    ...details,
    ...lastMessageObj,
  };
  const r = { channel: details.channel, fetch: true, messages: final };
  dispatch({ type: 'ON_MESSAGE', payload: r });

  try {
    await db.message.add(final);

    const encMessage = await e2e.encrypt(details.channel, needsToEnc);

    socket.emit('send message', {
      ...details,
      displayName,
      photoURL,
      ...lastMessageObj,
      to: to.from === uid ? to.to : to.from,
      body: encMessage,
    });
    dispatch({
      type: 'SET_LAST_MESSAGE',
      payload: {
        message: final,
        channel: details.channel,
      },
    });
    // console.log({
    //   ...details,
    //   displayName,
    //   photoURL,
    //   ...lastMessageObj,
    //   to: to.from === uid ? to.to : to.from,
    //   body: encMessage,
    // });
  } catch (err) {
    console.log(err);
  }
};

export const SyncMessages = (channelId) => async (dispatch, getState) => {
  const { data } = getState().messageReducer;

  if (data.has(channelId) && data.get(channelId).needFetch === false) return;

  try {
    const c = await db.message.where('channel').equals(channelId).count();
    const fetch = await db.message
      .where('channel')
      .equals(channelId)
      .offset(c - 20)
      .toArray();
    dispatch({
      type: 'ON_MESSAGE',
      payload: {
        channel: channelId,
        messages: fetch,
        next: c - 20,
        needFetch: false,
      },
    });
    dispatch({
      type: 'SET_LAST_MESSAGE',
      payload: {
        message: fetch[fetch.length - 1],
        channel: channelId,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const Pagnination = (channelId) => async (dispatch, getState) => {
  const { data } = getState().messageReducer;
  if (!data.has(channelId)) return;

  const { next } = data.get(channelId);
  if (next <= 0) return;
  try {
    // const length = await db.message
    //   .where('channel')
    //   .equals(channelId)
    //   .toArray();

    // console.log(length.length);
    const fetch = await db.message
      .where('channel')
      .equals(channelId)
      .offset(next - 20)
      .toArray();
    dispatch({
      type: 'SET_MESSAGE_PAGINATION',
      payload: {
        channel: channelId,
        messages: fetch,
        next: next - 20,
        needFetch: false,
        fromDb: true,
      },
    });
    dispatch({
      type: 'SET_LAST_MESSAGE',
      payload: {
        message: fetch[fetch.length - 1],
        channel: channelId,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const TypingIndication = (status) => (dispatch, getState) => {
  const { uid } = getState().authReducer.user;
  const [to] = getState().channelReducer.channels.filter(
    (id) => id.channelId === status.channel,
  );

  const final = {
    ...status,
    to: to.from === uid ? to.to : to.from,
    from: uid,
  };
  socket.emit('Typing Indicator', final);
  dispatch({ type: 'TYPING_INDICATOR', payload: final });
};

export const RecieveMessage = () => (dispatch) => {
  socket.on('recieve message', async (message) => {
    try {
      const decrypt = await e2e.decrypt(message.channel, message.body);
      const parsed = JSON.parse(decrypt);
      const final = {
        channel: message.channel,
        to: message.to,
        ...parsed,
        showDateInfo: message.showDateInfo,
      };
      await db.message.add(final);
      const locatioHref = window.location.href;
      dispatch({
        type: 'SET_LAST_MESSAGE',
        payload: {
          message: final,
          channel: message.channel,
        },
      });
      if (!locatioHref.includes(message.channel)) {
        messageTone.play();
        if (notificationPermission === 'granted') {
          try {
            navigator.serviceWorker.ready.then((registration) => {
              const notificationTitle = `${message.displayName}`;
              const notificationOptions = {
                body: parsed.message,
                icon: message.photoURL,
                vibrate: [
                  500,
                  110,
                  500,
                  110,
                  450,
                  110,
                  200,
                  110,
                  170,
                  40,
                  450,
                  110,
                  200,
                  110,
                  170,
                  40,
                  500,
                ],
                actions: [{ action: 'open_url', title: 'Read Message' }],
                click_action: `https://relp.now.sh/r/${message.channel}`,
                tag: parsed.channel,
                renotify: true,
                requireInteraction: true,
              };
              registration.showNotification(
                notificationTitle,
                notificationOptions,
              );
            });
          } catch (err) {
            console.log(err);
          }
        }
        dispatch({
          type: 'ON_MESSAGE',
          payload: {
            messages: final,
            channel: message.channel,
            needFetch: true,
            fromDb: false,
            outsideRoom: true,
          },
        });
        dispatch({
          type: 'SET_MESSAGE_COUNT',
          payload: { channel: message.channel },
        });
      }
      if (locatioHref.includes(message.channel)) {
        dispatch({
          type: 'ON_MESSAGE',
          payload: {
            messages: final,
            channel: message.channel,
            needFetch: false,
            fromDb: false,
            outsideRoom: false,
          },
        });

        if (!document.hasFocus()) {
          dispatch({
            type: 'SET_MESSAGE_COUNT',
            payload: { channel: message.channel },
          });
          messageTone.play();
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

  socket.on('new message', (message) => {
    message.forEach(async (msg) => {
      console.log(msg);
      try {
        const decrypt = await e2e.decrypt(msg.channel, msg.body);
        const parsed = JSON.parse(decrypt);
        const locatioHref = window.location.href;

        const final = {
          ...msg,
          ...parsed,
          body: '',
        };
        dispatch({
          type: 'SET_LAST_MESSAGE',
          payload: {
            message: final,
            channel: msg.channel,
          },
        });

        if (locatioHref.includes(msg.channel)) {
          dispatch({
            type: 'MESSAGE_FROM_DISK',
            payload: {
              channel: msg.channel,
              messages: final,
              fromMongoDb: true,
            },
          });
        } else {
          dispatch({
            type: 'SET_MESSAGE_COUNT',
            payload: { channel: msg.channel },
          });
        }

        await db.message.add(final);
        socket.emit('message recieved', msg);
      } catch (err) {
        console.log(err);
      }
    });
  });

  socket.on('user status disk', (data) => {
    dispatch({ type: 'USER_STATUS_DISK', payload: data[0] });
  });

  socket.on('user status', (e) => {
    dispatch({ type: 'USER_STATUS_DISK', payload: e });
  });

  socket.on('Typing Indicator', (e) => {
    dispatch({ type: 'RECIEVED_TYPING_INDICATION', payload: e });
  });

  socket.on('call by', ({ from, to }) => {
    // const call = new Call();

    // call.Init();
    dispatch({ type: 'YOU_HAVE_CALL', payload: { from, to } });
  });

  socket.on('join call', () => {
    // call.addStream();
    dispatch({ type: '_CALL_CONNECTED_' });
  });

  socket.on('dismiss call', () => {
    dispatch({ type: 'DISMISS_CALL' });
  });

  socket.on('current channel', (data) => {
    dispatch({ type: 'INDICATE_CHANNEL', payload: data });
  });

  socket.on('created channel', () => {
    console.log('Refreshing fom the server');
    dispatch({ type: 'REFRESH' });
    if (window.location.pathname.includes('/invite')) {
      history.push('/');
    }
  });

  socket.on('qrcode connected', async ({ to, from, ...rest }) => {
    const { Publickey } = e2e.generateKeys();

    socket.emit('send public key', {
      to,
      from,
      Publickey,
      ...rest,
    });
  });

  socket.on(
    'recieve public key',
    async ({ from, to, fromuID, touID, Publickey, ...rest }) => {
      const publickey = e2e.generateSharedSecret(Publickey);
      const obj = {
        from: fromuID,
        to: touID,
        time: Date.now(),
        both: [fromuID, touID],
        generated: true,
        joinedBy: 'qrcode',
      };

      try {
        const channelId = await firestoreDb.collection('channel').add(obj);
        e2e.setChannel(channelId.id);
        socket.emit('send other public key', {
          to,
          from,
          publickey,
          channelId: channelId.id,
          ...rest,
        });
      } catch (err) {
        console.lor(err);
      }
    },
  );

  socket.on('now refresh', () => {
    dispatch({ type: 'REFRESH' });
    history.push('/');
  });

  socket.on('recieve other key', ({ publickey, channelId, to, ...rest }) => {
    e2e.produceSharedSecret(publickey);
    e2e.setChannel(channelId);

    socket.emit('now refresh', {
      to,
      ...rest,
    });
    dispatch({ type: 'REFRESH' });
    history.push('/');
  });
};
