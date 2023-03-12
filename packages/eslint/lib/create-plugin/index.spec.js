'use strict';

const {test, stub} = require('supertape');
const {
    createPlugin,
    createGetSpaceBeforeNode,
    createGetSpacesAfterNode,
} = require('./index.js');

test('@putout/eslint: create-plugin: filter', (t) => {
    const {create} = createPlugin({
        include: () => [
            'DebuggerStatement',
        ],
        filter: () => true,
        report: () => `Avoid 'debugger'`,
        fix: () => '',
    });
    
    const replaceText = stub();
    
    const result = create({
        getSourceCode: stub().returns({
            getText: stub(),
            getCommentsBefore: stub(),
            getCommentsAfter: stub(),
            getCommentsInside: stub(),
        }),
        getFilename: stub(),
        report: ({fix}) => fix({
            replaceText,
        }),
    });
    
    const node = {};
    result.DebuggerStatement({
        node,
    });
    
    const expected = [{
        node,
    }, ''];
    
    t.calledWith(replaceText, expected);
    t.end();
});

test('@putout/eslint: create-plugin: createGetSpacesBeforeNode', (t) => {
    const getText = stub().returns('hello');
    const fn = createGetSpaceBeforeNode({
        getText,
    });
    
    const node = {};
    const result = fn(node, {
        text: 'hello',
    });
    
    t.equal(result, 'ello');
    t.end();
});

test('@putout/eslint: create-plugin: createGetSpacesBeforeNode: first', (t) => {
    const getText = stub().returns('hello');
    const fn = createGetSpaceBeforeNode({
        getText,
    });
    
    const body = [];
    const node = {
        parent: {
            body,
        },
    };
    
    body.push({
        expression: node,
    });
    
    const result = fn(node, {
        text: 'hello',
    });
    
    t.equal(result, '');
    t.end();
});

test('@putout/eslint: create-plugin: createGetSpacesAfterNode', (t) => {
    const getText = stub().returns('hello');
    const fn = createGetSpacesAfterNode({
        getText,
    });
    
    const node = {
        parent: {},
    };
    
    const result = fn(node, {
        text: ' hello',
    });
    
    t.equal(result, 'hell');
    t.end();
});

test('@putout/eslint: create-plugin: createGetSpacesAfterNode: last', (t) => {
    const getText = stub().returns('hello ');
    const fn = createGetSpacesAfterNode({
        getText,
    });
    
    const body = [];
    const parent = {
        body,
    };
    
    const node = {
        parent,
    };
    
    body.push(node);
    
    const result = fn(node, {
        text: 'hello ',
    });
    
    t.equal(result, '');
    t.end();
});

