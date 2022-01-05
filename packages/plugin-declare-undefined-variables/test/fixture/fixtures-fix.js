import {join} from 'path';
import {readFileSync} from 'fs';
const readFixture = a => readFileSync(join(__dirname, 'fixture', `${a}.js`), 'utf8');
readFixture('hello.js');
