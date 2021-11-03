import {test} from './test-lint.mjs';

test('eslint-plugin-putout: no-resolve: places', async ({comparePlaces}) => {
    await comparePlaces('no-unresolved-message', [{
        message: 'Always add an extension to relative imports',
        position: {
            column: 1,
            line: 1,
        },
        rule: 'putout/no-unresolved (eslint)',
    }]);
});

test('eslint-plugin-putout: no-resolve: fix', async ({process}) => {
    await process('no-unresolved');
});

test('eslint-plugin-putout: no-resolve: dynamic', async ({process}) => {
    await process('no-unresolved-dynamic');
});

test('eslint-plugin-putout: no-resolve: dynamic: message', async ({comparePlaces}) => {
    await comparePlaces('no-unresolved-dynamic', [{
        message: 'Always add an extension to relative imports',
        position: {
            column: 16,
            line: 1,
        },
        rule: 'putout/no-unresolved (eslint)',
    }]);
});

test('eslint-plugin-putout: evaluate: fix', async ({process}) => {
    await process('evaluate');
});

test('eslint-plugin-putout: tape-add-newline-before-assertion', async ({process}) => {
    await process('tape-add-newline-before-assertion');
});

test('eslint-plugin-putout: tape-add-newline-between-tests', async ({process}) => {
    await process('tape-add-newline-between-tests');
});
