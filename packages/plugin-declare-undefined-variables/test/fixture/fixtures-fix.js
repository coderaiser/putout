import {readFileSync} from 'fs';
import {join} from 'path';
const readFixture = a => readFileSync(join(__dirname, 'fixture', `${a}.js`), 'utf8');
readFixture('hello.js');
