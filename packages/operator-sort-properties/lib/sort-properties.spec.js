import test from 'supertape';
import putout from 'putout';
import {sortProperties} from './sort-properties.js';

const {operator} = putout;
const {toJS, fromJS} = operator;
const {parse, stringify} = JSON;
const getMessage = (a) => a.message;

test('putout: operator: sortProperties: __json: places', (t) => {
    const npmignore = sortProperties('rules');
    const source = toJS(stringify({
        rules: {
            'remove-unused': 'on',
            'add-missing': 'off',
        },
    }));
    
    const {places} = putout(source, {
        fix: false,
        plugins: [
            ['coverage', npmignore],
        ],
    });
    
    const messages = places.map(getMessage);
    const expected = [`Sort 'rules'`];
    
    t.deepEqual(messages, expected);
    t.end();
});

test('putout: operator: sortProperties: __json', (t) => {
    const npmignore = sortProperties('rules');
    const source = toJS(stringify({
        rules: {
            'remove-unused': 'on',
            'add-missing': 'off',
        },
    }));
    
    const {code} = putout(source, {
        plugins: [
            ['coverage', npmignore],
        ],
    });
    
    const result = parse(fromJS(code));
    
    const expected = {
        rules: {
            'remove-unused': 'on',
            'add-missing': 'off',
        },
    };
    
    t.deepEqual(result, expected);
    t.end();
});
