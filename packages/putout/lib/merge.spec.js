'use strict';

const test = require('supertape');
const merge = require('./merge');

test('putout: merge', (t) => {
    const defaultConfig = {
        plugins: ['remove-unused-variables'],
    };
    
    const result = merge(defaultConfig, {
        plugins: ['extract-sequence-expressions'],
    });
    
    const expected = {
        plugins: [
            'extract-sequence-expressions',
            'remove-unused-variables',
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: merge: ignore', (t) => {
    const defaultConfig = {
        plugins: ['remove-unused-variables'],
    };
    
    const result = merge(defaultConfig, {
        ignore: [
            '**/coverage',
            '!**/coverage',
        ],
    });
    
    const expected = {
        plugins: ['remove-unused-variables'],
        ignore: [],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: merge: rules', (t) => {
    const options = {
        rules: {
            'filesystem/remove-files': ['on', {
                names: ['*.md'],
            }],
        },
    };
    
    const result = merge({}, options);
    
    t.deepEqual(result, options);
    t.end();
});

test('putout: merge: override: rules', (t) => {
    const defaultConfig = {
        rules: {
            'github/set-node-versions': ['on', {
                versions: [
                    '18.x',
                    '20.x',
                    '21.x',
                ],
            }],
        },
        plugins: ['remove-unused-variables'],
    };
    
    const result = merge(defaultConfig, {
        rules: {
            'github/set-node-versions': ['on', {
                versions: [
                    '18.x',
                    '20.x',
                ],
            }],
        },
        plugins: ['extract-sequence-expressions'],
    });
    
    const expected = {
        rules: {
            'github/set-node-versions': ['on', {
                versions: [
                    '18.x',
                    '20.x',
                ],
            }],
        },
        plugins: [
            'extract-sequence-expressions',
            'remove-unused-variables',
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: merge: override: plugins', (t) => {
    const defaultConfig = {
        plugins: [
            ['throw', {}],
        ],
    };
    
    const result = merge(defaultConfig, {});
    
    const expected = {
        plugins: [
            ['throw', {}],
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: merge: override: printer', (t) => {
    const defaultConfig = {
        printer: ['putout', {
            format: {
                indent: '  ',
            },
        }],
    };
    
    const result = merge(defaultConfig, {
        printer: ['putout', {
            format: {
                indent: '  ',
            },
        }],
    });
    
    const expected = {
        printer: ['putout', {
            format: {
                indent: '  ',
            },
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});
