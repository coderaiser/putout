'use strict';

const {createTest} = require('@putout/test');
const react = require('..');

const test = createTest(__dirname, {
    rules: {
        'react/rename-jsx-to-js': 'on',
    },
    plugins: [
        ['react', react],
    ],
});

test('plugin-react: transform: rename-jsx-to-js: rename-jsx-to-js-on', (t) => {
    t.transform('rename-jsx-to-js-on');
    t.end();
});
