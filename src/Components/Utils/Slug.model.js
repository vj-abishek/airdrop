import Dexie from 'dexie';

const ddb = new Dexie('slug');
ddb.version(1).stores({
  slug: 'id',
});

export default ddb;
