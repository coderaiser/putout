'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['merge-return-with-next-sibling', plugin],
    ],
});

test('putout: merge-return-with-next-sibling: report', (t) => {
    t.report('merge-return-with-next-sibling', `Merge 'return' with next sibling`);
    t.end();
});

test('putout: merge-return-with-next-sibling: transform', (t) => {
    t.transform('merge-return-with-next-sibling');
    t.end();
});
