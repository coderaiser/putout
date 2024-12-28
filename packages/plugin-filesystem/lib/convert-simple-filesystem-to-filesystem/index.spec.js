'use strict';

const tryCatch = require('try-catch');
const {createTest} = require('@putout/test');
const plugin = require('.');

const CHECK_ASSERTIONS_COUNT = {
    checkAssertionsCount: false,
};

const test = createTest(__dirname, {
    plugins: [
        ['convert-simple-filesystem-to-filesystem', plugin],
    ],
});

test('putout: filesystem: convert-simple-filesystem-to-filesystem: report', (t) => {
    t.report('convert-simple-filesystem-to-filesystem', `Convert Simple Filesystem to Filesystem`);
    t.end();
});

test('putout: filesystem: convert-simple-filesystem-to-filesystem: transform', (t) => {
    t.transform('convert-simple-filesystem-to-filesystem');
    t.end();
});

test('putout: filesystem: convert-simple-filesystem-to-filesystem: transform: no-root', (t) => {
    t.transform('no-root');
    t.end();
});

test('putout: filesystem: convert-simple-filesystem-to-filesystem: transform: template', (t) => {
    t.transform('template');
    t.end();
});

test('putout: filesystem: convert-simple-filesystem-to-filesystem: no transform: no-slash', (t) => {
    const [error] = tryCatch(t.noTransform, 'no-slash');
    
    t.equal(error.message, `☝️ Looks like directory '/hello/world/' is missing`);
    t.end();
}, CHECK_ASSERTIONS_COUNT);

test('putout: filesystem: convert-simple-filesystem-to-filesystem: no transform: no-parent-directory', (t) => {
    const [error] = tryCatch(t.noTransform, 'no-parent-directory');
    
    t.equal(error.message, `☝️ Looks like directory '/example/' is missing`);
    t.end();
}, CHECK_ASSERTIONS_COUNT);

test('putout: filesystem: convert-simple-filesystem-to-filesystem: no transform: not-filesystem', (t) => {
    t.noTransform('not-filesystem');
    t.end();
});

test('putout: filesystem: convert-simple-filesystem-to-filesystem: no transform: no-directory', (t) => {
    const [error] = tryCatch(t.noTransform, 'no-directory');
    
    t.equal(error.message, `☝️ Looks like directory path is missing: 'hello.txt'`);
    t.end();
}, CHECK_ASSERTIONS_COUNT);

test('putout: filesystem: convert-simple-filesystem-to-filesystem: no transform: member', (t) => {
    const [error] = tryCatch(t.noTransform, 'member');
    
    t.equal(error.message, `☝️ Looks like file '['/App.js', '']['/AppViewList.js', '']' has wrong type: 'MemberExpression' expected: 'string | array'`);
    t.end();
}, CHECK_ASSERTIONS_COUNT);

test('putout: filesystem: convert-simple-filesystem-to-filesystem: no transform: wrong-content', (t) => {
    const [error] = tryCatch(t.noTransform, 'wrong-content');
    
    t.equal(error.message, `☝️ Looks like wrong content type: 'NumericLiteral' from file: '['/App.js', 5]'`);
    t.end();
}, CHECK_ASSERTIONS_COUNT);
