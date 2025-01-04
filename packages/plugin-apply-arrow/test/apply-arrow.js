'use strict';

const {createTest} = require('@putout/test');
const {operator} = require('putout');

const plugin = require('..');
const {getTemplateValues} = operator;

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

test('putout: apply-arrow: no report: long', (t) => {
    t.noReport('long');
    t.end();
});

test('putout: apply-arrow: no report: no-loc', (t) => {
    const FN = 'function __a(__args) {return __b}';
    
    t.transform('no-loc', {
        noLoc: {
            report: () => '',
            fix: (path) => {
                const {__b} = getTemplateValues(path, FN);
                delete __b.loc;
            },
            include: () => [FN],
        },
    });
    t.end();
});
