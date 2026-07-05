import {montag} from 'montag';
import {createTest} from '@putout/test';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/declare', declare],
    ],
});

test('plugin-putout: declare: transform: wasm: hasTagName', (t) => {
    t.transformCode(`__wasm`, montag`
        import {operator} from 'putout';
        
        const {__wasm} = operator;
        __wasm;
    
    `);
    t.end();
});
