import {Writable} from 'node:stream';

const stream = Writable.from(stringify({
    path,
    files,
}));
