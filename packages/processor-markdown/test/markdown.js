'use strict';

const {createTest} = require('@putout/test/processor');

const test = createTest(__dirname, {
    extension: 'md',
    processors: [
        'markdown',
        'json',
    ],
    plugins: [
        'remove-unused-variables',
        'eslint',
    ],
});

test('putout: processor: markdown', async (t) => {
    await t.process('js');
});

test('putout: processor: markdown: ts', async (t) => {
    await t.process('ts');
});

test('putout: processor: markdown: json', async (t) => {
    await t.process('json');
});

test('putout: processor: markdown: no js', async (t) => {
    await t.process('no-js');
});

test('putout: processor: markdown: bracket: no "\\["', async (t) => {
    await t.process('bracket');
});

test('putout: processor: links: no new lines', async (t) => {
    await t.process('links');
});

test('putout: processor: markdown: places', async (t) => {
    await t.process('place');
});

test('putout: processor: markdown: places', async (t) => {
    await t.comparePlaces('place', [{
        message: 'Code blocks should be indented',
        position: {
            column: 1,
            line: 3,
        },
        rule: 'code-block-style (remark-lint)',
    }]);
});

