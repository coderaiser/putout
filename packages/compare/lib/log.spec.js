'use strict';

const {test, stub} = require('supertape');

const {types} = require('putout');
const log = require('./log');
const {identifier} = types;

const {_parseValue} = log;

test('putout: compare: log', (t) => {
    const debug = stub();
    
    debug.enabled = true;
    globalThis.__putout_debug = debug;
    log('hello', 'world');
    delete globalThis.__putout_debug;
    
    const expected = [
        'putout:compare',
        `string: "hello" = string: "world"`,
    ];
    
    t.calledWith(debug, expected);
    t.end();
});

test('putout: compare: run-plugins: template: log: array', (t) => {
    const debug = stub();
    
    debug.enabled = true;
    globalThis.__putout_debug = debug;
    
    log([identifier('hello')], [identifier('world')]);
    delete globalThis.__putout_debug;
    
    const expected = [
        'putout:compare',
        `Identifier: ["hello"] = Identifier: ["world"]`,
    ];
    
    t.calledWith(debug, expected);
    t.end();
});

test('putout: compare: log: object', (t) => {
    const debug = stub();
    
    debug.enabled = true;
    globalThis.__putout_debug = debug;
    
    log(identifier('hello'), identifier('world'));
    delete globalThis.__putout_debug;
    
    const expected = [
        'putout:compare',
        `Identifier: "hello" = Identifier: "world"`,
    ];
    
    t.calledWith(debug, expected);
    t.end();
});

test('putout: compare: log: parseValue: string', (t) => {
    const value = 'hello';
    const result = _parseValue(value);
    const expected = 'string: "hello"';
    
    t.equal(result, expected);
    t.end();
});

test('putout: compare: log: parseValue: array: Identifier', (t) => {
    const value = [{
        type: 'Identifier',
        name: 'x',
    }];
    
    const result = _parseValue(value);
    const expected = 'Identifier: ["x"]';
    
    t.equal(result, expected);
    t.end();
});

test('putout: compare: log: parseValue: array: StringLiteral', (t) => {
    const value = [{
        type: 'StringLiteral',
        value: 'hello',
    }];
    
    const result = _parseValue(value);
    const expected = 'StringLiteral: ["hello"]';
    
    t.equal(result, expected);
    t.end();
});

test('putout: compare: log: parseValue: object', (t) => {
    const value = {
        type: 'StringLiteral',
        value: 'hello',
    };
    
    const result = _parseValue(value);
    const expected = 'StringLiteral: "hello"';
    
    t.equal(result, expected);
    t.end();
});
