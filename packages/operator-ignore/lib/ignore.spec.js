import test from 'supertape';
import putout from 'putout';
import {ignore} from './ignore.js';

const {operator} = putout;
const {parse, stringify} = JSON;

const {
    __json,
    __ignore,
    toJS,
    fromJS,
} = operator;

const getMessage = ({message}) => message;

test('putout: operator: ignore: __json: places', (t) => {
    const npmignore = ignore({
        type: __json,
        name: '.npmignore',
        property: 'exclude',
        list: [
            '.*',
            'yarn-error.log',
            'coverage',
            '*.config.*',
        ],
    });
    
    const source = stringify({
        exclude: [
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
    
    const expected = [
        `Add '.*' to '.npmignore'`,
        `Add 'yarn-error.log' to '.npmignore'`,
        `Add 'coverage' to '.npmignore'`,
        `Add '*.config.*' to '.npmignore'`,
    ];
    
    t.deepEqual(messages, expected);
    t.end();
});

test('putout: operator: ignore: __ignore: places', (t) => {
    const npmignore = ignore({
        name: '.npmignore',
        list: [
            '.*',
            'yarn-error.log',
            'coverage',
            '*.config.*',
        ],
    });
    
    const source = stringify([
        '**/*.spec.*',
    ]);
    
    const jsSource = toJS(source, __ignore);
    
    const {places} = putout(jsSource, {
        fix: false,
        plugins: [
            ['npmignore', npmignore],
        ],
    });
    
    const messages = places.map(getMessage);
    
    const expected = [
        `Add '.*' to '.npmignore'`,
        `Add 'yarn-error.log' to '.npmignore'`,
        `Add 'coverage' to '.npmignore'`,
        `Add '*.config.*' to '.npmignore'`,
    ];
    
    t.deepEqual(messages, expected);
    t.end();
});

test('putout: operator: ignore: __ignore: places: contains: dismiss', (t) => {
    const npmignore = ignore({
        name: '.npmignore',
        list: [
            '**/*.spec.*',
            'hello',
        ],
    });
    
    const source = stringify([
        '**/*.spec.*',
    ]);
    
    const jsSource = toJS(source, __ignore);
    
    const {places} = putout(jsSource, {
        fix: false,
        rules: {
            npmignore: ['on', {
                dismiss: ['hello'],
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

test('putout: operator: ignore: __ignore: transform', (t) => {
    const npmignore = ignore({
        name: '.npmignore',
        list: [
            '.*',
            'yarn-error.log',
            'coverage',
            '*.config.*',
        ],
    });
    
    const source = stringify([
        '**/*.spec.*',
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
        '.*',
        'yarn-error.log',
        'coverage',
        '*.config.*',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: operator: ignore: __ignore: places: contains: dismiss: all', (t) => {
    const npmignore = ignore({
        name: '.npmignore',
        list: [
            '**/*.spec.*',
            'hello',
        ],
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

test('putout: operator: ignore: __json: transform', (t) => {
    const npmignore = ignore({
        type: __json,
        name: '.npmignore',
        property: 'exclude',
        list: [
            '.*',
            'yarn-error.log',
            'coverage',
            '*.config.*',
        ],
    });
    
    const source = stringify({
        exclude: [
            '**/*.spec.*',
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
            '.*',
            'yarn-error.log',
            'coverage',
            '*.config.*',
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: operator: ignore: __json: no property', (t) => {
    const npmignore = ignore({
        type: __json,
        name: '.npmignore',
        property: 'exclude',
        list: [
            '.*',
            'yarn-error.log',
            'coverage',
            '*.config.*',
        ],
    });
    
    const source = stringify({
        hello: [
            '**/*.spec.*',
        ],
    });
    
    const jsSource = toJS(source);
    
    const {places} = putout(jsSource, {
        fix: false,
        plugins: [
            ['npmignore', npmignore],
        ],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: operator: ignore: __ignore: match', (t) => {
    const npmignore = ignore({
        name: '.npmignore',
        list: [
            '.*',
            'coverage',
            '*.config.*',
            '*.log',
        ],
    });
    
    const source = stringify(['yarn-error.log']);
    const jsSource = toJS(source, __ignore);
    
    const {code} = putout(jsSource, {
        plugins: [
            ['npmignore', npmignore],
        ],
    });
    
    const result = parse(fromJS(code, __ignore));
    
    const expected = [
        '.*',
        'coverage',
        '*.config.*',
        '*.log',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: operator: ignore: __ignore: match: report', (t) => {
    const npmignore = ignore({
        name: '.npmignore',
        list: [
            '.*',
            'coverage',
            '*.config.*',
            '*.log',
        ],
    });
    
    const source = stringify(['yarn-error.log']);
    const jsSource = toJS(source, __ignore);
    
    const {places} = putout(jsSource, {
        fix: false,
        plugins: [
            ['npmignore', npmignore],
        ],
    });
    
    const messages = places.map(getMessage);
    
    const expected = [
        `Add '.*' to '.npmignore'`,
        `Add 'coverage' to '.npmignore'`,
        `Add '*.config.*' to '.npmignore'`,
        `Add '*.log' instead of 'yarn-error.log' to '.npmignore'`,
    ];
    
    t.deepEqual(messages, expected);
    t.end();
});

test('putout: operator: ignore: __ignore: match: report: couple', (t) => {
    const npmignore = ignore({
        name: '.npmignore',
        list: [
            '*.lock',
            '*.log',
        ],
    });
    
    const source = stringify(['yarn-error.log', 'hello.log', 'bun.lock']);
    const jsSource = toJS(source, __ignore);
    
    const {places} = putout(jsSource, {
        fix: false,
        plugins: [
            ['npmignore', npmignore],
        ],
    });
    
    const messages = places.map(getMessage);
    
    const expected = [
        `Add '*.lock' instead of 'bun.lock' to '.npmignore'`,
        `Add '*.log' instead of 'yarn-error.log', 'hello.log' to '.npmignore'`,
    ];
    
    t.deepEqual(messages, expected);
    t.end();
});

test('putout: operator: ignore: includes', (t) => {
    const npmignore = ignore({
        name: '.npmignore',
        list: [
            '.*',
            'coverage',
            '*.config.*',
            '*.log',
        ],
    });
    
    const source = stringify(['*.log']);
    
    const jsSource = toJS(source, __ignore);
    
    const {code} = putout(jsSource, {
        plugins: [
            ['npmignore', npmignore],
        ],
    });
    
    const result = parse(fromJS(code, __ignore));
    
    const expected = [
        '*.log',
        '.*',
        'coverage',
        '*.config.*',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

