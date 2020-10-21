import socket from '../../Components/Functions/Users';
import E2E from '../../Components/Utils/EndToEnd';
import db from '../../Components/Utils/Message.model';

const e2e = new E2E();

export const sendmessage = (message, details) => async (dispatch, getState) => {
  const { uid, displayName, photoURL } = getState().authReducer.user;
  const [to] = getState().channelReducer.channels.filter(
    (id) => id.channelId === details.channel,
  );

  const needsToEnc = {
    from: uid,
    ...message,
  };
  const final = {
    ...needsToEnc,
    ...details,
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
      to: to.from === uid ? to.to : to.from,
      body: encMessage,
    });
    console.log({
      ...details,
      to: to.from === uid ? to.to : to.from,
      body: encMessage,
    });
  } catch (err) {
    console.log(err);
  }
};

export const SyncMessages = (channelId) => async (dispatch, getState) => {
  const { data } = getState().messageReducer;

  if (data.has(channelId) && data.get(channelId).fetch) return;

  try {
    const c = await db.message.where('channel').equals(channelId).count();
    console.log(c);
    const fetch = await db.message
      .where('channel')
      .equals(channelId)
      .offset(c - 20)
      .toArray();
    console.log(fetch);
    dispatch({
      type: 'ON_MESSAGE',
      payload: { channel: channelId, messages: fetch, next: c - 20 },
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
  console.log(next - 20, next);
  try {
    const fetch = await db.message
      .where('channel')
      .equals(channelId)
      .offset(next - 20)
      .toArray();
    console.log(fetch);
    dispatch({
      type: 'SET_MESSAGE_PAGINATION',
      payload: { channel: channelId, messages: fetch, next: next - 20 },
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
      };
      console.log('New message recieved', parsed);
      if (window.location.pathname !== `/r/${message.channel}`) {
        const n = new Notification(`${message.displayName}`, {
          icon: message.photoURL,
          body: parsed.message,
          onclick: `http://localhost:3000/r/${message.channel}`,
        });
        console.log(n);
      }
      dispatch({
        type: 'ON_MESSAGE',
        payload: { messages: final, channel: message.channel },
      });
      await db.message.add(final);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on('new message', (message) => {
    message.forEach(async (msg) => {
      try {
        const decrypt = await e2e.decrypt(msg.channel, msg.body);
        const parsed = JSON.parse(decrypt);
        const final = {
          ...msg,
          ...parsed,
        };
        dispatch({
          type: 'ON_MESSAGE',
          payload: { channel: msg.channel, messages: final },
        });
        await db.message.add(final);
        socket.emit('message recieved', msg);
      } catch (err) {
        console.log(err);
      }
    });
  });

  socket.on('user status disk', (data) => {
    console.log(data);
    dispatch({ type: 'USER_STATUS_DISK', payload: data[0] });
  });

  socket.on('user status', (e) => {
    dispatch({ type: 'USER_STATUS_DISK', payload: e });
  });

  socket.on('Typing Indicator', (e) => {
    dispatch({ type: 'RECIEVED_TYPING_INDICATION', payload: e });
  });

  socket.on('shareID', ({ shareID }) => {
    console.log(shareID);
    dispatch({ type: 'SET_SHAREID', payload: shareID });
  });

  socket.on('current channel', (data) => {
    console.log(data);
    dispatch({ type: 'INDICATE_CHANNEL', payload: data });
  });

  socket.on('created channel', () => {
    console.log('Refreshing fom the server');
    dispatch({ type: 'REFRESH' });
  });
};
