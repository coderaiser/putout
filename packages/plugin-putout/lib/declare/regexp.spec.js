import {montag} from 'montag';
import {createTest} from '@putout/test';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/declare', declare],
    ],
});

test('plugin-putout: declare: transform: regexp: getStringFromRegExp', (t) => {
    t.transformCode(`getStringFromRegExp(node)`, montag`
        import {operator} from 'putout';
        
        const {getStringFromRegExp} = operator;
        getStringFromRegExp(node);
    
    `);
    t.end();
});

