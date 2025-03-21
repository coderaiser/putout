import {test} from 'supertape';
import {getRule} from './get-rule.js';
import * as index from './index.js';

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
