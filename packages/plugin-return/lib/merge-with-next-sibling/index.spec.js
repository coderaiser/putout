'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['merge-with-next-sibling', plugin],
    ],
});

test('putout: merge-with-next-sibling: report', (t) => {
    t.report('merge-with-next-sibling', `Merge 'return' with next sibling`);
    t.end();
});

test('putout: merge-with-next-sibling: transform', (t) => {
    t.transform('merge-with-next-sibling');
    t.end();
});
