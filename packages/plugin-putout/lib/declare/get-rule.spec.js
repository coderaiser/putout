import {createRequire} from 'node:module';
import {test} from 'supertape';
import * as index from './index.js';

const require = createRequire(import.meta.url);
const {getRule} = require('./get-rule.cjs');

test('putout: plugin-putout: declare: getRule', (t) => {
    const rule = getRule('index');
    const expected = ['on', index];
    
    t.deepEqual(rule.index, expected);
    t.end();
});

test('putout: plugin-putout: declare: getRule: off', (t) => {
    const rule = getRule('index', 'off');
    const expected = {
        index: ['off', index],
    };
    
    t.deepEqual(rule, expected);
    t.end();
});
