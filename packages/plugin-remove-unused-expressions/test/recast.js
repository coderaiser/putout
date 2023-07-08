'use strict';

const {createTest} = require('@putout/test');
const removeUnusedExpression = require('..');

const test = createTest(__dirname, {
    printer: 'recast',
    plugins: [
        ['remove-unused-expression', removeUnusedExpression],
    ],
});

test('remove unused expression: transformCode: recast: string', (t) => {
    const code = '"hello"';
    
    t.transformCode(code, '');
    t.end();
});

