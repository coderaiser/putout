import {readFile, readDir}  from 'fs';

import {createCommons} from 'simport';

const {
  __filename,
  __dirname,
  require
} = createCommons(import.meta.url);

readFile(__filename);
readDir(__dirname);
