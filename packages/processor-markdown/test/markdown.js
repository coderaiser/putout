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

test('putout: processor: markdown', async ({process}) => {
    await process('js');
});

test('putout: processor: markdown: ts', async ({process}) => {
    await process('ts');
});

test('putout: processor: markdown: json', async ({process}) => {
    await process('json');
});

test('putout: processor: markdown: no js', async ({process}) => {
    await process('no-js');
});

test('putout: processor: markdown: bracket: no "\\["', async ({process}) => {
    await process('bracket');
});

test('putout: processor: links: no new lines', async ({process}) => {
    await process('links');
});

test('putout: processor: markdown: places', async ({process}) => {
    await process('place');
});

test('putout: processor: markdown: js-json', async ({process}) => {
    await process('js-json');
});

test('putout: processor: markdown: remove-dependencies-status: process', async ({process}) => {
    await process('remove-dependencies-status');
});

test('putout: processor: markdown: remove-dependencies-status-one-badge: process', async ({process}) => {
    await process('remove-dependencies-status-one-badge');
});

test('putout: processor: markdown: remove-dependencies-status: compare places', async ({comparePlaces}) => {
    await comparePlaces('remove-dependencies-status', [{
        message: 'Remove dependencies status badge',
        position: {
            column: 1,
            line: 6,
        },
        rule: 'remove-dependencies-status-badge (remark-lint)',
    }]);
});

test('putout: processor: markdown: compare places', async ({comparePlaces}) => {
    await comparePlaces('place', [{
        message: 'Code blocks should be indented',
        position: {
            column: 1,
            line: 3,
        },
        rule: 'code-block-style (remark-lint)',
    }]);
});

test('putout: processor: markdown: merge-heading-spaces: process', async ({process}) => {
    await process('merge-heading-spaces');
});

test('putout: processor: markdown: merge-heading-spaces: comparePlaces', async ({comparePlaces}) => {
    await comparePlaces('merge-heading-spaces', [{
        message: 'Remove dependencies status badge',
        position: {
            column: 1,
            line: 6,
        },
        rule: 'remove-dependencies-status-badge (remark-lint)',
    }]);
});

