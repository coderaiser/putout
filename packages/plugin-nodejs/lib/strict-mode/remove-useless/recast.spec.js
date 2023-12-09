'use strict';

const {createTest} = require('@putout/test');

const remove = require('.');

const test = createTest(__dirname, {
    printer: 'recast',
    plugins: [
        ['strict-mode/remove', remove],
    ],
});

test('plugin-strict-mode: remove: recast: transform: couple', (t) => {
    t.transform('recast-couple');
    t.end();
});
