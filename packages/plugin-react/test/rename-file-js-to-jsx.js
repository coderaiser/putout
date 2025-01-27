'use strict';

const {createTest} = require('@putout/test');
const react = require('..');

const test = createTest(__dirname, {
    rules: {
        'react/rename-file-js-to-jsx': 'on',
    },
    plugins: [
        ['react', react],
    ],
});

test('plugin-react: transform: rename-file-js-to-jsx: rename-file-js-to-jsx-on', (t) => {
    t.transform('rename-file-js-to-jsx-on');
    t.end();
});
