'use strict';

const {createTest} = require('@putout/test');
const react = require('..');

const test = createTest(__dirname, {
    rules: {
        'react/rename-js-to-jsx': 'on',
    },
    plugins: [
        ['react', react],
    ],
});

test('plugin-react: transform: rename-js-to-jsx: rename-js-to-jsx-on', (t) => {
    t.transform('rename-js-to-jsx-on');
    t.end();
});
