'use strict';

const {parseError} = require('./parse-error');
const test = require('supertape');

test('putout: cli: parse error', (t) => {
    const e = Error('hello');
    const result = parseError(e, {
        debug: true,
    });
    
    const expected = [{
        rule: 'parser',
        message: 'hello',
        position: {
            line: 7,
            column: 15,
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: parse error: no debug', (t) => {
    const e = Error('hello');
    const result = parseError(e, {
        debug: false,
    });
    
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

test('putout: cli: parse error', (t) => {
    const e = Error('hello');
    
    e.loc = {
        line: 1,
        column: 1,
    };
    
    const result = parseError(e, {
        debug: false,
    });
    
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
