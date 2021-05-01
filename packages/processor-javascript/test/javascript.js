'use strict';

const {createTest} = require('@putout/test/processor');

const test = createTest(__dirname, {
    processors: [
        'javascript',
    ],
});

test('putout: processor: javascript', async (t) => {
    await t.process('simple.js', ['remove-unused-variables']);
});

