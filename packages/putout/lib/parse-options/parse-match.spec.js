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
        'test|.spec.js':  rulesSpec,
    };
    
    const expected = {
        rules: {
            ...rulesLib,
            ...rulesSpec,
        },
    };
    
    const result = parseMatch('lib/putout.spec.js', match);
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: parse-match: windows', (t) => {
    const name = '\\bin\\putout.js';
    const rules = {
        'remove-console': 'on',
    };
    const match = {
        'bin/': rules,
    };
    
    const {platform} = process;
    
    defineProperty(process, 'platform', {
        value: 'win32',
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

test('putout: parse-match: linux', (t) => {
    const name = '\\bin\\putout.js';
    const rules = {
        'remove-console': 'on',
    };
    const match = {
        'bin/': rules,
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
        'bin/': rules,
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
