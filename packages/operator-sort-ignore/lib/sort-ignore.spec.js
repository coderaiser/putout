import test from 'supertape';
import putout from 'putout';
import {sortIgnore} from './sort-ignore.js';

const {operator} = putout;
const {parse, stringify} = JSON;

const {
    __json,
    __ignore,
    toJS,
    fromJS,
} = operator;

const getMessage = ({message}) => message;

test('putout: operator: sortIgnore: __json: places', (t) => {
    const npmignore = sortIgnore({
        type: __json,
        name: '.npmignore',
        property: 'exclude',
    });
    
    const source = stringify({
        exclude: [
            'coverage',
            '**/*.spec.*',
        ],
    });
    
    const jsSource = toJS(source);
    
    const {places} = putout(jsSource, {
        fix: false,
        plugins: [
            ['coverage', npmignore],
        ],
    });
    
    const messages = places.map(getMessage);
    const expected = [`Sort '.npmignore'`];
    
    t.deepEqual(messages, expected);
    t.end();
});

test('putout: operator: sortIgnore: __json: no property', (t) => {
    const npmignore = sortIgnore({
        type: __json,
        name: '.npmignore',
        field: 'exclude',
    });
    
    const source = stringify({
        exclude: [
            'coverage',
            '**/*.spec.*',
        ],
    });
    
    const jsSource = toJS(source);
    
    const {places} = putout(jsSource, {
        fix: false,
        plugins: [
            ['coverage', npmignore],
        ],
    });
    
    const messages = places.map(getMessage);
    const expected = [];
    
    t.deepEqual(messages, expected);
    t.end();
});

test('putout: operator: sortIgnore: __ignore: transform', (t) => {
    const npmignore = sortIgnore({
        name: '.npmignore',
    });
    
    const source = stringify([
        '**/*.spec.*',
        '.*',
        'yarn-error.log',
        'coverage',
        '*.config.*',
        '# hello',
    ]);
    
    const jsSource = toJS(source, __ignore);
    
    const {code} = putout(jsSource, {
        plugins: [
            ['npmignore', npmignore],
        ],
    });
    
    const result = parse(fromJS(code, __ignore));
    
    const expected = [
        '**/*.spec.*',
        '*.config.*',
        '',
        '.*',
        '',
        'yarn-error.log',
        '',
        'coverage',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: operator: sortIgnore: __ignore: places: contains: dismiss: all', (t) => {
    const npmignore = sortIgnore({
        name: '.npmignore',
    });
    
    const source = stringify([
        '**/*.spec.*',
    ]);
    
    const jsSource = toJS(source, __ignore);
    
    const {places} = putout(jsSource, {
        fix: false,
        rules: {
            npmignore: ['on', {
                dismiss: [
                    'hello',
                    '**/*.spec.*',
                ],
            }],
        },
        plugins: [
            ['npmignore', npmignore],
        ],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: operator: sortIgnore: __json: transform', (t) => {
    const npmignore = sortIgnore({
        type: __json,
        name: '.npmignore',
        property: 'exclude',
    });
    
    const source = stringify({
        exclude: [
            '**/*.spec.*',
            '.*',
            'yarn-error.log',
            'coverage',
            '*.config.*',
        ],
    });
    
    const jsSource = toJS(source);
    
    const {code} = putout(jsSource, {
        plugins: [
            ['npmignore', npmignore],
        ],
    });
    
    const result = parse(fromJS(code));
    
    const expected = {
        exclude: [
            '**/*.spec.*',
            '*.config.*',
            '.*',
            'yarn-error.log',
            'coverage',
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: operator: sortIgnore: includes', (t) => {
    const npmignore = sortIgnore({
        name: '.npmignore',
    });
    
    const source = stringify([
        '*.log',
        '.*',
        'coverage',
        '*.config.*',
    ]);
    
    const jsSource = toJS(source, __ignore);
    
    const {code} = putout(jsSource, {
        plugins: [
            ['npmignore', npmignore],
        ],
    });
    
    const result = parse(fromJS(code, __ignore));
    
    const expected = [
        '*.log',
        '*.config.*',
        '',
        '.*',
        '',
        'coverage',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
