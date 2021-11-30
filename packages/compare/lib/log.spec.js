'use strict';

const test = require('supertape');
const mockRequire = require('mock-require');
const {Identifier} = require('putout').types;
const stub = require('@cloudcmd/stub');

const {_parseValue} = require('./log');

const {assign} = Object;
const {reRequire, stopAll} = mockRequire;

test('putout: compare: log', (t) => {
    const namespace = stub();
    
    assign(namespace, {
        enabled: true,
    });
    
    const debug = stub().returns(namespace);
    
    mockRequire('debug', debug);
    
    const log = reRequire('./log');
    
    log('hello', 'world');
    const expected = `string: "hello" = string: "world"`;
    
    stopAll();
    
    t.calledWith(namespace, [expected]);
    t.end();
});

test('putout: compare: run-plugins: template: log: array', (t) => {
    const namespace = stub();
    
    assign(namespace, {
        enabled: true,
    });
    
    const debug = stub().returns(namespace);
    
    mockRequire('debug', debug);
    
    const log = reRequire('./log');
    
    log([Identifier('hello')], [Identifier('world')]);
    const expected = `Identifier: ["hello"] = Identifier: ["world"]`;
    
    stopAll();
    
    t.calledWith(namespace, [expected]);
    t.end();
});

test('putout: compare: log: object', (t) => {
    const namespace = stub();
    
    assign(namespace, {
        enabled: true,
    });
    
    const debug = stub().returns(namespace);
    
    mockRequire('debug', debug);
    
    const log = reRequire('./log');
    
    log(Identifier('hello'), Identifier('world'));
    const expected = `Identifier: "hello" = Identifier: "world"`;
    
    stopAll();
    
    t.calledWith(namespace, [expected]);
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
