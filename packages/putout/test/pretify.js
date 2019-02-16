'use strict';

const test = require('supertape');
const {prettify} = require('..');
const chalk = require('chalk');

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
    
    const {enabled} = chalk;
    chalk.enabled = false;
    
    const message = 'hello';
    const rule = 'remove-hello';
    
    const places = [{
        message,
        position,
        rule,
    }];
    const result = prettify('hello', places);
    const expected = 'hello\n 1:1  error   hello  remove-hello \n';
    
    chalk.enabled = enabled;
    
    t.equal(result, expected, 'should equal');
    t.end();
});

