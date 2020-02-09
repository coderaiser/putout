'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const customParser = require('./custom-parser');

test('putout: parser: custom parser: object', (t) => {
    const source = 'hello';
    const parse = stub();
    const parser = {
        parse,
    };
    
    customParser(source, {
        parser,
    });
    
    t.ok(parse.calledWith(source));
    t.end();
});

