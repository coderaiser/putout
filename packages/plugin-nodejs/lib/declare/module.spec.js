import {createTest} from '@putout/test';
import montag from 'montag';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['nodejs/declare', declare],
    ],
});

test('putout: plugin: nodejs: declare: module: enableCompileCache', (t) => {
    t.transformCode('enableCompileCache()', montag`
        import {enableCompileCache} from 'node:module';
        
        enableCompileCache();
    
    `);
    t.end();
});
