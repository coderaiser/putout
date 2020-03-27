'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');

const {_isCorrectPlugin} = require('..');

test('test: isCorrectPlugin: not', (t) => {
    const result = _isCorrectPlugin({
    });
    
    t.notOk(result);
    t.end();
});

test('test: isCorrectPlugin: include', (t) => {
    const result = _isCorrectPlugin({
        replace: stub(),
        include: stub(),
    });
    
    t.ok(result);
    t.end();
});

test('test: isCorrectPlugin: exclude', (t) => {
    const result = _isCorrectPlugin({
        replace: stub(),
        exclude: stub(),
    });
    
    t.ok(result);
    t.end();
});

