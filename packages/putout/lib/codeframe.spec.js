'use strict';

const {join} = require('path');
const {readFile} = require('fs/promises');

const test = require('supertape');
const codeframe = require('./codeframe');

test('putout: codeframe: undefined', (t) => {
    const result = codeframe({
        source: '', error: {},
    });
    const expected = undefined;
    
    t.equal(result, expected);
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
    
    t.equal(result, expected);
    t.end();
});

test('putout: codeframe: not highlited', async (t) => {
    const loc = {
        line: 2,
        column: 8,
    };
    
    const error = {
        message: 'some error is here',
        loc,
    };
    const source = `
      function(a) {
        return a;
      }
    `;
    
    const result = codeframe({
        source, error, highlightCode: false,
    });
    
    const expected = await readFile(join(__dirname, 'fixture', 'codeframe'), 'utf8');
    
    t.equal(result, expected);
    t.end();
});
