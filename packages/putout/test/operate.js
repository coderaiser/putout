'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');

const {operate} = require('..');

test('putout: operate: replaceWith', (t) => {
    const node = {
    };
    const replaceWith = stub();
    
    const path = {
        node,
        replaceWith,
    };
    
    operate.replaceWith(path, node);
    
    t.ok(replaceWith.calledWith(node), 'should call reporter');
    t.end();
});

test('putout: operate: replaceWith: comments', (t) => {
    const comments = [];
    const replaceWith = stub();
    
    const node = {
        comments,
    };
    
    const newNode = {
    };
    
    const path = {
        node,
        replaceWith,
    };
    
    operate.replaceWith(path, newNode);
    
    t.equal(path.node.comments, comments, 'should equal');
    t.end();
});

test('putout: operate: replaceWith: loc', (t) => {
    const loc = {};
    const replaceWith = stub();
    
    const node = {
        loc
    };
    
    const newNode = {
    };
    
    const path = {
        node,
        replaceWith,
    };
    
    operate.replaceWith(path, newNode);
    
    t.equal(path.node.loc, loc, 'should equal');
    t.end();
});

test('putout: operate: insertAfter', (t) => {
    const node = {
    };
    const insertAfter = stub();
    
    const path = {
        node,
        insertAfter,
    };
    
    operate.insertAfter(path, node);
    
    t.ok(insertAfter.calledWith(node), 'should call reporter');
    t.end();
});

test('putout: operate: insertAfter: comments', (t) => {
    const comments = [];
    const insertAfter = stub();
    
    const node = {
        comments,
    };
    
    const newNode = {
    };
    
    const path = {
        node,
        insertAfter,
    };
    
    operate.insertAfter(path, newNode);
    
    t.equal(path.node.comments, comments, 'should equal');
    t.end();
});

test('putout: operate: replaceWithMultiple', (t) => {
    const node = {};
    const comments = [];
    
    const replaceWithMultiple = stub().returns([{
        node,
    }]);
    const parentPath = {
        node: {
            comments,
        },
    };
    
    const path = {
        parentPath,
        replaceWithMultiple,
    };
    
    operate.replaceWithMultiple(path, node);
    
    t.ok(replaceWithMultiple.calledWith(node), 'should call reporter');
    t.end();
});

test('putout: operate: replaceWithMultiple: comments', (t) => {
    const node = {};
    const replaceWithMultiple = stub().returns([{
        node,
    }]);
    const comments = [];
    const parentPath = {
        node: {
            comments,
        },
    };
    
    const path = {
        parentPath,
        replaceWithMultiple,
    };
    
    const newPath = operate.replaceWithMultiple(path, node);
    
    t.deepEqual(newPath[0].node.comments, comments, 'should call reporter');
    t.end();
});

test('putout: operate: replaceWithMultiple: empty array', (t) => {
    const replaceWithMultiple = stub().returns([]);
    const comments = [];
    const parentPath = {
        node: {
            comments,
        },
    };
    
    const path = {
        parentPath,
        replaceWithMultiple,
    };
    
    const newPath = operate.replaceWithMultiple(path, []);
    
    t.deepEqual(newPath, [], 'should equal');
    t.end();
});

