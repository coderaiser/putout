'use strict';

const test = require('supertape');
const parseMatch = require('./parse-match');

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

