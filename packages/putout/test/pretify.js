'use strict';

const test = require('supertape');
const {prettify} = require('..');

test('putout: prettify: no places', (t) => {
    const places = [];
    const result = prettify('hello', places);
    const expected = '';
    
    t.equal(result, expected, 'should equal');
    t.end();
});

test('putout: prettify', (t) => {
    const line = 1;
    const column = 1;
    const position = {
        line,
        column,
    };
    
    const message = 'hello';
    const rule = 'remove-hello';
    
    const places = [{
        message,
        position,
        rule,
    }];
    const result = prettify('hello', places);
    const expected = '\x1b[4mhello\x1b[24m\n \x1b[90m1:1\x1b[39m  \x1b[31merror\x1b[39m   hello  \x1b[90mremove-hello\x1b[39m \n';
    
    t.equal(result, expected, 'should equal');
    t.end();
});

