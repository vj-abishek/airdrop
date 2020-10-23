import { produce, enableMapSet } from 'immer';

enableMapSet();

const map = new Map();

const initialState = {
  data: map,
  userStatus: map,
  currentChannel: map,
};

export default produce((draft, { type, payload }) => {
  switch (type) {
    case 'ON_MESSAGE':
      console.log(payload);
      if (
        !draft.data.has(payload.channel) ||
        !draft.data.get(payload.channel).messages
      ) {
        draft.data.set(payload.channel, {
          channel: payload.channel,
          fetch: true,
          messages: payload.messages,
          next: payload.next,
          indication: 'NO_CONTENT',
        });
      } else draft.data.get(payload.channel).messages.push(payload.messages);

      return draft;
    case 'SET_MESSAGE_PAGINATION': {
      const book = draft.data.get(payload.channel);
      book.messages = payload.messages;
      book.next = payload.next;
      return draft;
    }

    case 'SET_URL': {
      const { messages } = draft.data.get(payload.payload.channel);
      const len = messages.length - 1;
      messages[len].url = payload.url;
      return draft;
    };

    case 'USER_STATUS_DISK':
      if (!(payload && payload.uid)) return draft;
      draft.userStatus.set(payload.uid, { status: payload });
      return draft;

    case 'TYPING_INDICATION':
      if (draft.data.has(payload.channelId)) {
        draft.data.get(payload.channelId).indication = payload.type;
      } else {
        draft.set(payload.channelId, { indication: payload.type });
      }
      return draft;
    case 'TYPING_INDICATOR':
      if (draft.data.has(payload.channel)) {
        draft.data.get(payload.channel).self = payload.type;
      } else {
        draft.data.set(payload.channel, { self: payload.type });
      }
      return draft;
    case 'RECIEVED_TYPING_INDICATION':
      if (draft.data.has(payload.channel)) {
        draft.data.get(payload.channel).other = payload.type;
      } else {
        draft.data.set(payload.channel, { other: payload.type });
      }
      return draft;
    case 'INDICATE_CHANNEL':
      if (draft.currentChannel.size <= 1) {
        console.log(payload);
        if (draft.currentChannel.has(payload.channelID)) {
          const res = draft.currentChannel.get(payload.channelID);
          res.IDs.push(payload.uid);
        } else {
          draft.currentChannel.set(payload.channelID, { IDs: [payload.uid] });
        }
      }
      return draft;

    default:
      return draft;
  }
}, initialState);
