import montag from 'montag';
import {createTest} from '@putout/test';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/declare', declare],
    ],
});

test('plugin-putout: declare: transform: jsx: hasTagName', (t) => {
    t.transformCode(`hasTagName(path, 'li')`, montag`
        import {operator} from 'putout';
        
        const {hasTagName} = operator;
        hasTagName(path, 'li');
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: jsx: getAttributePath', (t) => {
    t.transformCode(`getAttributePath(path, 'className')`, montag`
        import {operator} from 'putout';
        
        const {getAttributePath} = operator;
        getAttributePath(path, 'className');
    
    `);
    t.end();
});
