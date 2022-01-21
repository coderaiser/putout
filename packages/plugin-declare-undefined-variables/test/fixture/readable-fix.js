'use strict';
import {Readable} from 'stream';

const {
    assign
} = Object;

const {
    stringify
} = JSON;

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

