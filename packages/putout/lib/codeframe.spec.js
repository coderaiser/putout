'use strict';

const test = require('supertape');
const codeframe = require('./codeframe');

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

test('putout: codeframe: not highlited', (t) => {
    const loc = {
        line: 2,
        column: 8,
    };
    
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
