import {Writable} from 'stream';
const stream = Writable.from(stringify({
    path,
    files,
}));
