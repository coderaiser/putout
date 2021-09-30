import {createCommons} from 'simport';

const {
  __filename,
  __dirname,
  require
} = createCommons(import.meta.url);

const a = require('./package.json');
