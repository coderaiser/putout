import {createTest} from '@putout/test';
import montag from 'montag';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['nodejs/declare', declare],
    ],
});

test('putout: plugin: nodejs: declare: timers: setTimeout', (t) => {
    t.transformCode('await setTimeout(1000)', montag`
        import {setTimeout} from 'node:timers/promises';
        
        await setTimeout(1000);
    
    `);
    t.end();
});
