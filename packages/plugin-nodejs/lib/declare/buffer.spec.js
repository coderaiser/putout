import {createTest} from '@putout/test';
import montag from 'montag';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['nodejs/declare', declare],
    ],
});

test('putout: plugin: nodejs: declare: buffer: setTimeout', (t) => {
    t.transformCode('Buffer.from([])', montag`
        import {Buffer} from 'node:buffer';
        
        Buffer.from([]);
    
    `);
    t.end();
});
