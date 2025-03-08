'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['check-declare', plugin],
    ],
});

test('putout: check-declare: report', (t) => {
    t.report('check-declare', [
        `Identifier 'isNumber' has already been declared. (2:6)`,
        `Identifier 'isHello' has already been declared. (2:6)`,
    ]);
    t.end();
});

test('putout: check-declare: report: commonjs', (t) => {
    t.report('commonjs', `Identifier 'isNumber' has already been declared. (2:6)`);
    t.end();
});

test('putout: check-declare: report: commonjs-template', (t) => {
    t.report('commonjs-template', `Identifier 'isNumber' has already been declared. (2:6)`);
    t.end();
});

test('putout: check-declare: no transform', (t) => {
    t.noTransform('check-declare');
    t.end();
});

test('putout: check-declare: no report: not-declaration', (t) => {
    t.noReport('not-declaration');
    t.end();
});

test('putout: check-declare: no report: couple-quasis', (t) => {
    t.noReport('couple-quasis');
    t.end();
});
