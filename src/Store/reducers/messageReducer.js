import { produce, enableMapSet } from 'immer';

enableMapSet();

const map = new Map();

const initialState = {
  data: map,
  userStatus: map,
  currentChannel: map,
  localCache: map,
  messageCount: map,
  lastMessage: map,
};

const getPendingMessages = (draft, channelID) => {
  if (draft.localCache.has(channelID)) {
    const localMessages = draft.localCache.get(channelID);
    draft.data.get(channelID).messages.push(localMessages.messages);
    draft.localCache.delete(channelID);
  }
};

export default produce((draft, { type, payload }) => {
  switch (type) {
    case 'ON_MESSAGE': {
      const hasInMap = draft.data.has(payload.channel);
      const getMap = draft.data.get(payload.channel);

      // refresh from db
      if (hasInMap && payload.needFetch && payload.fromDb) {
        draft.data.set(payload.channel, {
          channel: payload.channel,
          needFetch: payload.needFetch,
          messages: payload.messages,
          next: payload.next,
          indication: 'NO_CONTENT',
        });
        return draft;
      }

      if (payload.outsideRoom) {
        if (getMap.needFetch) {
          getMap.needFetch = payload.needFetch;
          return draft;
        }

        draft.data.set(payload.channel, {
          needFetch: payload.needFetch,
        });
        return draft;
      }

      if (payload.fromMongoDb && !getMap.messages) {
        draft.data.set(payload.channel, {
          needFetch: true,
        });
      }

      // There is Channel in the map, but it doesnt have messages
      if (hasInMap && !getMap.messages && Array.isArray(payload.messages)) {
        draft.data.set(payload.channel, {
          channel: payload.channel,
          needFetch: payload.needFetch,
          messages: payload.messages,
          next: payload.next,
          indication: 'NO_CONTENT',
        });
        // check if there are any pending messages
        getPendingMessages(draft, payload.channel);
        return draft;
      }

      // Sync messages
      if (!hasInMap) {
        draft.data.set(payload.channel, {
          channel: payload.channel,
          needFetch: payload.needFetch,
          messages: payload.messages,
          next: payload.next,
          indication: 'NO_CONTENT',
        });

        // check if there are any pending messages
        getPendingMessages(draft, payload.channel);
        return draft;
      }

      draft.data.get(payload.channel).messages.push(payload.messages);

      return draft;
    }

    case 'MESSAGE_FROM_DISK': {
      const hasInMap = draft.data.has(payload.channel);
      const getMap = draft.data.get(payload.channel);
      if (hasInMap && Array.isArray(getMap.messages)) {
        getMap.messages.push(payload.messages);
      } else {
        draft.localCache.set(payload.channel, {
          messages: payload.messages,
        });
      }
      return draft;
    }

    case 'SET_MESSAGE_COUNT': {
      const hasInMap = draft.messageCount.has(payload.channel);
      const getMap = draft.messageCount.get(payload.channel);

      if (hasInMap) {
        getMap.messageCount += 1;
      } else {
        draft.messageCount.set(payload.channel, {
          messageCount: 1,
        });
      }
      document.title = '(1) Relp';
      return draft;
    }

    case 'CLEAR_MESSAGE_COUNT': {
      const hasInMap = draft.messageCount.has(payload.channel);

      if (hasInMap) {
        draft.messageCount.delete(payload.channel);
      }

      if ('clearAppBadges' in navigator) {
        // Clear the badge
        navigator.clearAppBadge().catch((error) => {
          console.log(error);
        });
      }
      return draft;
    }

    case 'SET_LAST_MESSAGE':
      draft.lastMessage.set(payload.channel, {
        message: payload.message,
      });
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
    }

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
