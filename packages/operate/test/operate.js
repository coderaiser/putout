'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const putout = require('putout');

const {
    traverse,
    parse,
    types,
    print,
} = putout;

const operate = require('..');

const {readFixtures} = require('./fixture');

const fixture = readFixtures();

const {
    ContinueStatement,
    ExpressionStatement,
} = types;

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

test('putout: operate: replaceWith', (t) => {
    const node = {};
    const newPath = {};
    const replaceWith = stub().returns(newPath);
    
    const path = {
        node,
        replaceWith,
    };
    
    const result = operate.replaceWith(path, node);
    
    t.equal(result, newPath, 'should call reporter');
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
        loc,
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
    const nodes = [];
    const comments = [];
    
    const replaceWithMultiple = stub().returns({
    });
    
    const parentPath = {
        node: {
            comments,
        },
    };
    
    const node = {};
    const path = {
        node,
        parentPath,
        replaceWithMultiple,
    };
    
    operate.replaceWithMultiple(path, nodes);
    
    t.ok(replaceWithMultiple.calledWith(nodes), 'should call reporter');
    t.end();
});

test('putout: operate: replaceWithMultiple: for-of-return', (t) => {
    const ast = parse(fixture.forOfReturn);
    
    traverse(ast, {
        ReturnStatement(path) {
            operate.replaceWithMultiple(path, [
                ExpressionStatement(path.node.argument),
                ContinueStatement(),
            ]);
        },
    });
    
    const result = print(ast);
    const expected = fixture.forOfReturnFix;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operate: replaceWithMultiple: for-of: empty return', (t) => {
    const ast = parse(fixture.forOfEmptyReturn);
    
    traverse(ast, {
        ReturnStatement(path) {
            operate.replaceWithMultiple(path, [
                path.node.argument,
                ContinueStatement(),
            ]);
        },
    });
    
    const result = print(ast);
    const expected = fixture.forOfEmptyReturnFix;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operate: replaceWithMultiple: parent comment', (t) => {
    const {code} = putout(fixture.parentComment, {
        plugins: [
            'split-variable-declarations',
        ],
    });
    const expected = fixture.parentCommentFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operate: replaceWithMultiple: current comment', (t) => {
    const {code} = putout(fixture.currentComment, {
        plugins: [
            'extract-sequence-expressions',
        ],
    });
    const expected = fixture.currentCommentFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operate: replaceWithMultiple: empty array', (t) => {
    const replaceWithMultiple = stub().returns([]);
    const comments = [];
    const node = {
        comments,
    };
    const parentPath = {
        node: {
            comments,
        },
    };
    
    const path = {
        node,
        parentPath,
        replaceWithMultiple,
    };
    
    const newPath = operate.replaceWithMultiple(path, []);
    
    t.deepEqual(newPath, [], 'should equal');
    t.end();
});

