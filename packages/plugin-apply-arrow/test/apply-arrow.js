'use strict';

const {createTest} = require('@putout/test');
const {operator} = require('putout');

const plugin = require('..');
const {
    compare,
    getTemplateValues,
} = operator;

const test = createTest(__dirname, {
    plugins: [
        ['apply-arrow', plugin],
    ],
});

test('putout: apply-arrow: report', (t) => {
    t.report('apply-arrow', `Use 'Arrow Function' instead of 'Function Declaration`);
    t.end();
});

test('putout: apply-arrow: transform', (t) => {
    t.transform('apply-arrow');
    t.end();
});

test('putout: apply-arrow: transform: other-scope-reference', (t) => {
    t.transform('other-scope-reference');
    t.end();
});

test('putout: apply-arrow: no report: long', (t) => {
    t.noReport('long');
    t.end();
});

test('putout: apply-arrow: no report: for-of', (t) => {
    t.noReport('for-of');
    t.end();
});

test('putout: apply-arrow: no report: comment', (t) => {
    t.noReport('comment');
    t.end();
});

test('putout: apply-arrow: no report: logical', (t) => {
    t.noReport('logical');
    t.end();
});

test('putout: apply-arrow: no report: no-loc', (t) => {
    const FN = 'function __a(__args) {return __b}';
    
    t.transform('no-loc', {
        noLoc: {
            report: () => '',
            fix: (path) => {
                const {__b} = getTemplateValues(path.get('body.0.declaration'), FN);
                
                delete __b.loc;
            },
            include: () => ['Program'],
            filter: (path) => {
                const fnPath = path.get('body.0.declaration');
                return compare(fnPath, FN);
            },
        },
    });
    t.end();
});
