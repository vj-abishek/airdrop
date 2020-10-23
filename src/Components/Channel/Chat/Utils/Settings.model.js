import Dexie from 'dexie';

const ddb = new Dexie('setting');
ddb.version(1).stores({
    uid: 'id',
});

export default ddb;
