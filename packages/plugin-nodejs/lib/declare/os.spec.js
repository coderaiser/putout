import {createTest} from '@putout/test';
import {montag} from 'montag';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['nodejs/declare', declare],
    ],
});

test('putout: plugin: nodejs: declare: os', (t) => {
    t.transformCode('os.platform()', montag`
        import os from 'node:os';
        
        os.platform();
    
    `);
    t.end();
});
