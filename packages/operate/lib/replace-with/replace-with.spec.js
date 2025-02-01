'use strict';

const putout = require('putout');
const {test, stub} = require('supertape');
const montag = require('montag');
const {replaceWith} = require('./replace-with');

test('putout: operate: replaceWith', (t) => {
    const node = {};
    const isExpressionStatement = stub().returns(false);
    const replaceWithStub = stub();
    
    const parentPath = {
        isExpressionStatement,
    };
    
    const path = {
        node,
        parentPath,
        replaceWith: replaceWithStub,
    };
    
    replaceWith(path, node);
    
    t.calledWith(replaceWithStub, [node], 'should call replaceWith');
    t.end();
});

test('putout: operate: replaceWith: no parentPath', (t) => {
    const node = {};
    
    const path = {
        node,
        replaceWith: stub(),
    };
    
    const result = replaceWith(path, node);
    
    t.equal(result, path, 'should return result');
    t.end();
});

test('putout: operate: replaceWith: result', (t) => {
    const node = {};
    const isExpressionStatement = stub().returns(false);
    
    const parentPath = {
        isExpressionStatement,
    };
    
    const path = {
        node,
        parentPath,
        replaceWith: stub(),
    };
    
    const result = replaceWith(path, node);
    
    t.equal(result, path, 'should return result');
    t.end();
});

test('putout: operate: replaceWith: expression', (t) => {
    const node = {};
    const isExpressionStatement = stub().returns(true);
    const isProgram = stub().returns(false);
    
    const parentPath = {
        isExpressionStatement,
        node,
        replaceWith: stub(),
        isProgram,
    };
    
    const path = {
        parentPath,
        node,
        replaceWith: stub(),
    };
    
    const result = replaceWith(path, node);
    
    const expected = {
        node: {
            comments: undefined,
            loc: undefined,
        },
        isExpressionStatement: stub(),
        isProgram: stub(),
        replaceWith: stub(),
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: operate: replaceWith: expression: isProgram', (t) => {
    const node = {};
    const isExpressionStatement = stub().returns(true);
    const isProgram = stub().returns(true);
    
    const parentPath = {
        node,
        replaceWith: stub(),
        isProgram,
        isExpressionStatement,
    };
    
    const path = {
        parentPath,
        node,
        replaceWith: stub(),
    };
    
    const result = replaceWith(path, node);
    
    t.equal(result, path, 'should return result');
    t.end();
});

test('putout: operate: replaceWith: comments', (t) => {
    const comments = [];
    const isExpressionStatement = stub().returns(false);
    
    const parentPath = {
        isExpressionStatement,
    };
    
    const node = {
        comments,
    };
    
    const newNode = {};
    
    const path = {
        node,
        parentPath,
        replaceWith: stub(),
    };
    
    replaceWith(path, newNode);
    
    t.equal(path.node.comments, comments);
    t.end();
});

test('putout: operate: replaceWith: loc', (t) => {
    const loc = {};
    const isExpressionStatement = stub().returns(false);
    
    const node = {
        loc,
    };
    
    const newNode = {};
    
    const parentPath = {
        isExpressionStatement,
    };
    
    const path = {
        node,
        replaceWith: stub(),
        parentPath,
    };
    
    replaceWith(path, newNode);
    
    t.equal(path.node.loc, loc);
    t.end();
});

test('putout: operate: replaceWith: parentPath', (t) => {
    const source = montag`
        const test = require('@putout/test')(__dirname, {
            'remove-debugger': require('..'),
        });
        
        test('remove debugger: report', (t) => {
            t.transform('debugger', {
                'remove-debugger': require('..'),
            });
            t.end();
        });
    `;
    
    const {code} = putout(source, {
        rules: {
            'putout': 'off',
            'putout/apply-fixture-name-to-messsage': 'on',
            'putout/move-require-on-top-level': 'on',
        },
        plugins: ['putout'],
    });
    
    const expected = montag`
        import {createTest} from '@putout/test';
        
        const removeDebugger = require('..');
        const test = createTest(import.meta.url, {
            'remove-debugger': removeDebugger,
        });
        
        test('remove debugger: report: debugger', (t) => {
            t.transform('debugger', {
                'remove-debugger': removeDebugger,
            });
            t.end();
        });\n
    `;
    
    t.equal(code, expected);
    t.end();
});
