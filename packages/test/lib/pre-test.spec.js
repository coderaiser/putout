'use strict';

const {test} = require('supertape');
const {_maybeEntries, _maybeTuple} = require('./pre-test.js');

test('test: pre-test: maybeEntries: array', (t) => {
    const plugin = ['a', 1];
    const result = _maybeEntries(plugin);
    
    t.equal(result, plugin);
    t.end();
});

test('test: pre-test: maybeEntries: object', (t) => {
    const plugin = {
        a: 1,
    };
    
    const result = _maybeEntries(plugin);
    const expected = ['a', 1];
    
    t.deepEqual(result, expected);
    t.end();
});

test('test: pre-test: maybeTuple', (t) => {
    const result = _maybeTuple('x');
    const expected = [
        'on',
        'x',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('test: pre-test: maybeTuple: array', (t) => {
    const result = _maybeTuple(['x', 'y']);
    const expected = [
        'x',
        'y',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
