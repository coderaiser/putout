'use strict';

const test = require('supertape');
const mockRequire = require('mock-require');
const {Identifier} = require('@babel/types');

const {reRequire} = mockRequire;
const stub = require('@cloudcmd/stub');

const {assign} = Object;

test('putout: run-plugins: template: log', (t) => {
    const namespace = stub();
    
    assign(namespace, {
        enabled: true,
    });
    
    const debug = stub().returns(namespace);
    
    mockRequire('debug', debug);
    
    const log = reRequire('./log');
    
    log('hello', 'world');
    const expected = `string: "hello" = string: "world"`;
    
    t.ok(namespace.calledWith(expected));
    t.end();
});

test('putout: run-plugins: template: log: array', (t) => {
    const namespace = stub();
    
    assign(namespace, {
        enabled: true,
    });
    
    const debug = stub().returns(namespace);
    
    mockRequire('debug', debug);
    
    const log = reRequire('./log');
    
    log([Identifier('hello')], [Identifier('world')]);
    const expected = `Identifier: ["hello"] = Identifier: ["world"]`;
    
    t.ok(namespace.calledWith(expected));
    t.end();
});

test('putout: run-plugins: template: log: object', (t) => {
    const namespace = stub();
    
    assign(namespace, {
        enabled: true,
    });
    
    const debug = stub().returns(namespace);
    
    mockRequire('debug', debug);
    
    const log = reRequire('./log');
    
    log(Identifier('hello'), Identifier('world'));
    const expected = `Identifier: "hello" = Identifier: "world"`;
    
    t.ok(namespace.calledWith(expected));
    t.end();
});
