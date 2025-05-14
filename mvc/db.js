import path from 'path';
import { fileURLToPath } from 'url';
import PouchDB from 'pouchdb';

import pouchdbFind from 'pouchdb-find';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a path to the local "data" directory
const dataDirectory = path.join(__dirname, 'data');

PouchDB.plugin(pouchdbFind);

// Use the prefix config for PouchDB to store data in "data" folder
const db = new PouchDB(path.join(dataDirectory, 'jr101')); // 'jr101' is your database name for MVC

export default db;