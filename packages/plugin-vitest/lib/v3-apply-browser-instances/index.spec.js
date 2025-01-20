'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['v3-apply-browser-instances', plugin],
    ],
});

test('vitest: v3-apply-browser-instances: report', (t) => {
    t.report('v3-apply-browser-instances', `Use 'browser.instances'`);
    t.end();
});

test('vitest: v3-apply-browser-instances: transform', (t) => {
    t.transform('v3-apply-browser-instances');
    t.end();
});
