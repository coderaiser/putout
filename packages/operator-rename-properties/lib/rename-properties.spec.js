import test from 'supertape';
import putout from 'putout';
import {renameProperties} from './rename-properties.js';

const {operator} = putout;
const {parse, stringify} = JSON;

const {
    __json,
    toJS,
    fromJS,
} = operator;

const getMessage = ({message}) => message;

test('putout: operator: renameProperties: __json: places', (t) => {
    const rename = renameProperties([
        ['merge-duplicate-imports', 'esm/merge-duplicate-imports'],
    ]);
    
    const source = stringify({
        rules: {
            'merge-duplicate-imports': 'off',
        },
    });
    
    const jsSource = toJS(source);
    
    const {places} = putout(jsSource, {
        fix: false,
        plugins: [
            ['rename', rename],
        ],
    });
    
    const messages = places.map(getMessage);
    const expected = [`Rename property: 'merge-duplicate-imports' -> 'esm/merge-duplicate-imports'`];
    
    t.deepEqual(messages, expected);
    t.end();
});

test('putout: operator: renameProperties: transform', (t) => {
    const rename = renameProperties([
        ['merge-duplicate-imports', 'esm/merge-duplicate-imports'],
    ]);
    
    const source = stringify({
        rules: {
            'merge-duplicate-imports': 'off',
        },
    });
    
    const jsSource = toJS(source);
    
    const {code} = putout(jsSource, {
        plugins: [
            ['rename', rename],
        ],
    });
    
    const result = parse(fromJS(code, __json));
    
    const expected = {
        rules: {
            'esm/merge-duplicate-imports': 'off',
        },
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: operator: renameProperties: transform: remove', (t) => {
    const rename = renameProperties([
        ['merge-duplicate-imports', ''],
    ]);
    
    const source = stringify({
        rules: {
            'merge-duplicate-imports': 'off',
        },
    });
    
    const jsSource = toJS(source);
    
    const {code} = putout(jsSource, {
        plugins: [
            ['rename', rename],
        ],
    });
    
    const result = parse(fromJS(code, __json));
    
    const expected = {
        rules: {},
    };
    
    t.deepEqual(result, expected);
    t.end();
});
