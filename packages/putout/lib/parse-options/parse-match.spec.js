'use strict';

const test = require('supertape');
const {reRequire} = require('mock-require');

const parseMatch = require('./parse-match');

const {defineProperty} = Object;

test('putout: parse-match: empty', (t) => {
    const result = parseMatch();
    const expected = {};
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: parse-match: find', (t) => {
    const rules = {};
    const match = {
        'test/fixtures': rules,
    };
    
    const result = parseMatch('test/fixtures/1.js', match);
    const expected = {
        rules,
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: parse-match: not found', (t) => {
    const rules = {};
    const match = {
        'test/fixtures': rules,
    };
    
    const result = parseMatch('lib/putout.js', match);
    const expected = {
        rules,
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: parse-match: merge', (t) => {
    const rulesLib = {
        'remove-console': false,
    };
    
    const rulesSpec = {
        'remove-only': true,
    };
    
    const match = {
        'lib': rulesLib,
        '{test,*.spec.js}': rulesSpec,
    };
    
    const expected = {
        rules: {
            ...rulesLib,
            ...rulesSpec,
        },
    };
    
    const result = parseMatch('lib/cli/putout.spec.js', match);
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: parse-match: linux', (t) => {
    const name = '\\bin\\putout.js';
    const rules = {
        'remove-console': 'on',
    };
    const match = {
        bin: rules,
    };
    
    const {platform} = process;
    
    defineProperty(process, 'platform', {
        value: 'linux',
    });
    
    reRequire('./parse-sep');
    
    const parseMatch = reRequire('./parse-match');
    const result = parseMatch(name, match);
    
    defineProperty(process, 'platform', {
        value: platform,
    });
    
    const expected = {
        rules: {},
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parse-match: linux: match', (t) => {
    const name = 'bin/putout.js';
    const rules = {
        'remove-console': 'on',
    };
    const match = {
        bin: rules,
    };
    
    const {platform} = process;
    
    defineProperty(process, 'platform', {
        value: 'linux',
    });
    
    reRequire('./parse-sep');
    
    const parseMatch = reRequire('./parse-match');
    const result = parseMatch(name, match);
    
    defineProperty(process, 'platform', {
        value: platform,
    });
    
    const expected = {
        rules,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parse-match: encoding', (t) => {
    const rules = {
        madrun: 'on',
    };
    
    const match = {
        '.madrun.js': rules,
    };
    
    const result = parseMatch('lib/madrun.js', match);
    const expected = {
        rules: {},
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: parse-match: couple', (t) => {
    const rules = {
        ts: 'on',
    };
    
    const match = {
        '*.{ts,tsx}': rules,
    };
    
    const result = parseMatch('lib/madrun.ts', match);
    const expected = {
        rules,
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: parse-match: extension', (t) => {
    const rules = {
        madrun: 'on',
    };
    
    const match = {
        '.madrun.*': rules,
    };
    
    const result = parseMatch('.madrun.js', match);
    const expected = {
        rules,
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: parse-match: extension: long path', (t) => {
    const rules = {
        madrun: 'on',
    };
    
    const match = {
        '.madrun.*': rules,
    };
    
    const result = parseMatch('packages/putout/.madrun.js', match);
    const expected = {
        rules,
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: parse-match: similar matches', (t) => {
    const match = {
        'packages/plugin-*': {
            putout: 'on',
        },
        'packages/plugin-putout/README.md': {
            putout: 'off',
        },
    };
    
    const expected = {
        rules: {
            putout: 'off',
        },
    };
    
    const result = parseMatch('packages/plugin-putout/README.md', match);
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: parse-match: absolute', (t) => {
    const match = {
        '{test,*.spec.js}': {
            'remove-only': 'on',
        },
    };
    
    const expected = {
        rules: {
            'remove-only': 'on',
        },
    };
    
    const result = parseMatch('/putout/packages/process-css/test/css.js', match);
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

