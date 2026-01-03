import {test} from 'supertape';
import {isSimpleRegExp} from './is-simple-regexp.js';

test('putout: operator: regexp: is-simple-regexp: simple regexp', (t) => {
    const result = isSimpleRegExp(/hello world/);
    
    t.ok(result);
    t.end();
});

test('putout: operator: regexp: is-simple-regexp: not simple regexp', (t) => {
    const result = isSimpleRegExp(/[a-z]/);
    
    t.notOk(result);
    t.end();
});
