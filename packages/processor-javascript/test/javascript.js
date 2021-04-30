'use strict';

const {createTest} = require('@putout/test/processor');

const test = createTest(__dirname, {
    extension: 'js',
    processors: [
        'javascript',
    ],
    plugins: [
        'eslint',
    ],
});

test('putout: processor: javascript', async (t) => {
    await t.process('simple', ['remove-unused-variables']);
});

