import {test} from 'supertape';
import {parseScheme} from './parse-scheme.js';

test('putout: scripts: scheme: parse-scheme', (t) => {
    const rules = parseScheme(['remove-debugger']);
    const expected = {
        'remove-debugger': {
            $ref: '#/definitions/rule',
        },
    };
    
    t.deepEqual(rules, expected);
    t.end();
});
