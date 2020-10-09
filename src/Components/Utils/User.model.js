import Dexie from 'dexie';

const ddb = new Dexie('user_database');
ddb.version(1).stores({
  channel: 'id',
});

export default ddb;
