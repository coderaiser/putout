'use strict';
import {Readable} from 'stream';

const {
    stringify
} = JSON;

const {
    assign
} = Object;

test('cloudcmd: route: content length', async (t) => {
    const path = '';
    const files = [];
    const stream = Readable.from(stringify({
        path,
        files,
    }));
    
    assign(stream, {
        path,
        files,
    });
});

