'use strict';

const test = require('tape');
const parseMatch = require('../lib/parse-match');

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
    
    const result = parseMatch(match, 'test/fixtures/1.js');
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
    
    const result = parseMatch(match, 'lib/putout.js');
    const expected = {};
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

