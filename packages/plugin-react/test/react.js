'use strict';

const {createTest} = require('@putout/test');
const react = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['react', react],
    ],
});

test('plugin-react: transform: remove-useless-provider', (t) => {
    t.transform('remove-useless-provider');
    t.end();
});
