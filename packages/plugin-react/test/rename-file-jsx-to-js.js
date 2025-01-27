'use strict';

const {createTest} = require('@putout/test');
const react = require('..');

const test = createTest(__dirname, {
    rules: {
        'react/rename-file-jsx-to-js': 'on',
    },
    plugins: [
        ['react', react],
    ],
});

test('plugin-react: transform: rename-file-jsx-to-js: rename-file-jsx-to-js-on', (t) => {
    t.transform('rename-file-jsx-to-js-on');
    t.end();
});
