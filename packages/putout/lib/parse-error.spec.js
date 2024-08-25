'use strict';

const parseError = require('./parse-error');
const test = require('supertape');

test('putout: parse error', (t) => {
    const e = Error('hello');
    const result = parseError(e);
    
    const expected = [{
        rule: 'parser',
        message: 'hello',
        position: {
            line: 1,
            column: 1,
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parse error: cut braces', (t) => {
    const e = Error('Unexpected token (1:10)');
    const result = parseError(e);
    
    const expected = [{
        message: 'Unexpected token',
        rule: 'parser',
        position: {
            line: 1,
            column: 1,
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parse error: rule', (t) => {
    const e = Error('hello');
    
    e.rule = 'remove-debugger';
    const result = parseError(e);
    
    const expected = [{
        rule: 'remove-debugger (parser)',
        message: 'hello',
        position: {
            line: 1,
            column: 1,
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parse error: loc', (t) => {
    const e = Error('hello');
    
    e.loc = {
        line: 1,
        column: 1,
    };
    
    const result = parseError(e);
    
    const expected = [{
        rule: 'parser',
        message: 'hello',
        position: {
            line: 1,
            column: 1,
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parse error: loader', (t) => {
    const e = Error('hello');
    
    e.loc = {
        line: 1,
        column: 1,
    };
    
    const result = parseError(e, 'loader');
    
    const expected = [{
        rule: 'loader',
        message: 'hello',
        position: {
            line: 1,
            column: 1,
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});
