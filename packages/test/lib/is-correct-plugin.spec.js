'use strict';

const {test, stub} = require('supertape');
const isCorrectPlugin = require('./is-correct-plugin');

test('test: isCorrectPlugin: not', (t) => {
    const result = isCorrectPlugin({});
    
    t.notOk(result);
    t.end();
});

test('test: isCorrectPlugin: include', (t) => {
    const result = isCorrectPlugin({
        replace: stub(),
        include: stub(),
    });
    
    t.ok(result);
    t.end();
});

test('test: isCorrectPlugin: exclude + fix', (t) => {
    const result = isCorrectPlugin({
        exclude: stub(),
        fix: stub(),
    });
    
    t.ok(result);
    t.end();
});

test('test: isCorrectPlugin: replace, filter', (t) => {
    const result = isCorrectPlugin({
        replace: stub(),
        filter: stub(),
    });
    
    t.ok(result);
    t.end();
});

test('test: isCorrectPlugin: traverse + fix', (t) => {
    const result = isCorrectPlugin({
        traverse: stub(),
        fix: stub(),
    });
    
    t.ok(result);
    t.end();
});

test('test: isCorrectPlugin: replace', (t) => {
    const result = isCorrectPlugin({
        replace: stub(),
    });
    
    t.ok(result);
    t.end();
});

test('test: isCorrectPlugin: replace + filter', (t) => {
    const result = isCorrectPlugin({
        replace: stub(),
        filter: stub(),
    });
    
    t.ok(result);
    t.end();
});

test('test: isCorrectPlugin: replace + match', (t) => {
    const result = isCorrectPlugin({
        replace: stub(),
        match: stub(),
    });
    
    t.ok(result);
    t.end();
});
