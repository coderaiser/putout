'use strict';

const {createTest} = require('@putout/test');
const vitest = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['vitest', vitest],
    ],
});

test('plugin-vitest: transform: v3-apply-options-as-second-argument', (t) => {
    t.transform('v3-apply-options-as-second-argument');
    t.end();
});

test('plugin-vitest: transform: v3-apply-browser-instances', (t) => {
    t.transform('v3-apply-browser-instances');
    t.end();
});
