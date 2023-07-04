'use strict';

const {createTest} = require('@putout/test');
const removeUselessReturn = require('..');

const test = createTest(__dirname, {
    printer: 'recast',
    plugins: [
        ['remove-useless-return', removeUselessReturn],
    ],
});

test('plugin-remove-useless-return: recast: no transform: comment', (t) => {
    t.noTransform('comment');
    t.end();
});
