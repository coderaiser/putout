import {Writable} from 'stream';

const {
    stringify
} = JSON;

const stream = Writable.from(stringify({
    path,
    files,
}));
