'use strict';

const {test, stub} = require('supertape');

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
    
    t.equal(result, parentPath, 'should return result');
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
