import montag from 'montag';
import {createTest} from '@putout/test';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/declare', declare],
    ],
});

test('plugin-putout: declare: transform: operator: findFileUp', (t) => {
    t.transformCode(`findFileUp(root, 'package.json')`, montag`
        import {operator} from 'putout';
        
        const {findFileUp} = operator;
        findFileUp(root, 'package.json');
    
    `);
    t.end();
});

