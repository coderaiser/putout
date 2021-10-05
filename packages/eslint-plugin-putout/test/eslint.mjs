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

test('eslint-plugin-putout: evaluate: fix', async ({process}) => {
    await process('evaluate');
});

