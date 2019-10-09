'use strict';

const test = require('supertape');
const codeframe = require('../lib/codeframe');

test('putout: codeframe: undefined', (t) => {
    const result = codeframe({
        source: '', error: {},
    });
    const expected = undefined;
    
    t.equal(result, expected, 'should equal');
    t.end();
});

test('putout: codeframe: should return message', (t) => {
    const error = {
        message: 'some error is here',
    };
    const source = `
        function(a) {
            return a;
        }
    `;
    
    const result = codeframe({
        source, error,
    });
    const expected = error.message;
    
    t.equal(result, expected, 'should equal');
    t.end();
});

test('putout: codeframe: should return source with error pointed', (t) => {
    const loc = { line: 2, column: 8 };
    const error = {
        message: 'some error is here',
        loc,
    };
    const source = `
      fonction(a) {
        return a;
      }
    `;
    const result = codeframe({
        source, error,
    });
    const expected = '\x1b[0m \x1b[90m 1 | \x1b[39m\x1b[0m\n\x1b[0m\x1b[31m\x1b[1m>\x1b[22m\x1b[39m\x1b[90m 2 | \x1b[39m      fonction(a) {\x1b[0m\n\x1b[0m \x1b[90m   | \x1b[39m       \x1b[31m\x1b[1m^\x1b[22m\x1b[39m \x1b[31m\x1b[1msome error is here\x1b[22m\x1b[39m\x1b[0m\n\x1b[0m \x1b[90m 3 | \x1b[39m        \x1b[36mreturn\x1b[39m a\x1b[33m;\x1b[39m\x1b[0m\n\x1b[0m \x1b[90m 4 | \x1b[39m      }\x1b[0m\n\x1b[0m \x1b[90m 5 | \x1b[39m    \x1b[0m';
    
    t.equal(result, expected, 'should equal');
    t.end();
});

test('putout: codeframe: not highlited', (t) => {
    const loc = { line: 2, column: 8 };
    const error = {
        message: 'some error is here',
        loc,
    };
    const source = `
      fonction(a) {
        return a;
      }
    `;
    const result = codeframe({
        source, error, highlightCode: false,
    });
    const expected = '  1 | \n> 2 |       fonction(a) {\n    |        ^ some error is here\n  3 |         return a;\n  4 |       }\n  5 |     ';
    
    t.equal(result, expected, 'should equal');
    t.end();
});
