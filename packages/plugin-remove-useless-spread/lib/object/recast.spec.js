'use strict';

const {createTest} = require('@putout/test');
const object = require('.');

const test = createTest(__dirname, {
    printer: 'recast',
    plugins: [
        ['remove-useless-spread/object', object],
    ],
});

test('plugin-remove-useless-spread: object: recast: no transform: comment', (t) => {
    t.noTransform('comment');
    t.end();
});

