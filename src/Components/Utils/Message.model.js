import Dexie from 'dexie';

const ddb = new Dexie('messages');
ddb.version(1).stores({
  message: '++id , messageId, message, channel, time',
});

export default ddb;
