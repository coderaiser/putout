'use strict';

import {Readable} from 'node:stream';

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
