'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    'react-router/convert-switch-to-routes': plugin,
});

test('plugin-react-router: convert-switch-to-routes: report', (t) => {
    t.report('convert-switch-to-routes', `Use 'Routes' instead of 'Switch'`);
    t.end();
});

test('plugin-react-router: convert-switch-to-routes: transform', (t) => {
    t.transform('convert-switch-to-routes');
    t.end();
});

