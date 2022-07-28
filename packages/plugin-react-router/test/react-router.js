'use strict';

const {createTest} = require('@putout/test');
const reactRouter = require('..');
const test = createTest(__dirname, {
    'react-router': reactRouter,
});

test('plugin-react-hooks: transform: convert-swithc-to-routes', (t) => {
    t.transform('convert-switch-to-routes');
    t.end();
});

