'use strict';

const test = require('supertape');
const putout = require('putout');

const {ignore} = require('./ignore');
const {operator} = putout;
const {parse, stringify} = JSON;

const {
    __json,
    __ignore,
    toJS,
    fromJS,
} = operator;

test('putout: operator: ignore: __json: places', (t) => {
    const npmignore = ignore(__json, {
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
            ['npmignore', npmignore],
        ],
    });
    
    const expected = [{
        message: `Add dotfiles to '.npmignore'`,
        position: {
            column: 0,
            line: 1,
        },
        rule: 'npmignore',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: operator: ignore: __ignore: places', (t) => {
    const npmignore = ignore(__ignore, {
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
    
    const expected = [{
        message: `Add dotfiles to '.npmignore'`,
        position: {
            column: 0,
            line: 1,
        },
        rule: 'npmignore',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: operator: ignore: __ignore: places: contains: dismiss', (t) => {
    const npmignore = ignore(__ignore, {
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
    const npmignore = ignore(__ignore, {
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
