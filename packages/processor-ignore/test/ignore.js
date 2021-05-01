'use strict';

const {createTest} = require('@putout/test/processor');

const test = createTest(__dirname, {
    extension: '',
    processors: [
        'ignore',
    ],
    plugins: [
        'gitignore',
    ],
});

test('putout: processor: ignore', async (t) => {
    await t.process('.gitignore');
});

test('putout: processor: ignore: windows', async (t) => {
    await t.process('windows-gitignore');
});

test('putout: processor: ignore: rc', async (t) => {
    await t.process('browserlistrc', ['browserlist']);
});

test('putout: processor: ignore: rc: eslintrc: no crash', async (t) => {
    await t.comparePlaces('eslintrc', [{
        message: 'Dot files should be added to .gitignore',
        position: {
            column: 0,
            line: 1,
        },
        rule: 'gitignore',
    }]);
});

test('putout: processor: ignore: no new line', async (t) => {
    await t.process('no-new-line-ignore');
});

