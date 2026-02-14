import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    extension: '',
    processors: ['ignore'],
    plugins: ['gitignore'],
});

test('putout: processor: ignore', async ({process}) => {
    await process('.gitignore');
}, {
    timeout: 3000,
});

test('putout: processor: ignore: windows', async ({process}) => {
    await process('windows-gitignore');
});

test('putout: processor: ignore: rc', async ({process}) => {
    await process('browserlistrc', ['browserlist']);
});

test('putout: processor: ignore: rc: eslintrc: no crash', async ({comparePlaces}) => {
    await comparePlaces('eslintrc', [{
        message: `Add '.idea' to '.gitignore'`,
        position: {
            column: 27,
            line: 1,
        },
        rule: 'gitignore',
    }, {
        message: `Add '*.swp' to '.gitignore'`,
        position: {
            column: 27,
            line: 1,
        },
        rule: 'gitignore',
    }, {
        message: `Add '*.log' to '.gitignore'`,
        position: {
            column: 27,
            line: 1,
        },
        rule: 'gitignore',
    }, {
        message: `Add '*.lock' to '.gitignore'`,
        position: {
            column: 27,
            line: 1,
        },
        rule: 'gitignore',
    }, {
        message: `Add 'coverage' to '.gitignore'`,
        position: {
            column: 27,
            line: 1,
        },
        rule: 'gitignore',
    }]);
});

test('putout: processor: ignore: no new line', async ({process}) => {
    await process('no-new-line-ignore');
});

