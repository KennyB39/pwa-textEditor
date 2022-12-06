import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
const constantDb = await openDB ('jate',1);
const trx = constantDb.transaction('jate', 'readwrite');
const store = trx.objectStore('jate');
const req = store.put(content);
const res = await req;
console.log('Saved Data', res);
return result;}


// const result = await request;
// console.log('Saved Data', result);
// return result;


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
const jateDb = await openDB ('jate',1);
const tx = jateDb.transaction('jate', 'readwrite');
const stor = tx.objectStore('jate');
const request = stor.getAll();
const result = await request;
result.length > 0
    ? console.log('Data retrieved from database')
    : console.log('Data not found in the database.');

return result?.values() || [];}



initdb();
