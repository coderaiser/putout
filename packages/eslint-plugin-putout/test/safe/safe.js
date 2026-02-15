import {createTest} from '@putout/test/eslint';
import {safe, safeRules} from '#eslint-plugin-putout';

const test = createTest(import.meta.url, safe);

const SAFE = {
    rules: {
        'putout/putout': ['error', {
            ignore: ['!**/fixture'],
            rules: {
                ...safeRules,
            },
        }],
    },
};

test('eslint-plugin-putout: safe: no remove-unused-variables', async ({noProcess}) => {
    await noProcess('remove-unused-variables', SAFE);
});

test('eslint-plugin-putout: safe: no-remove-useless-declaration', async ({process}) => {
    await process('remove-useless-declaration', SAFE);
});

test('eslint-plugin-putout: safe: merge-duplicate-functions: off', async ({noProcess}) => {
    await noProcess('merge-duplicate-functions', SAFE);
});

test('eslint-plugin-putout: safe: remove-useless-push: off', async ({noProcess}) => {
    await noProcess('remove-useless-push', SAFE);
});

test('eslint-plugin-putout: safe: convert-template-to-string: off', async ({noProcess}) => {
    await noProcess('convert-template-to-string', SAFE);
});

test('eslint-plugin-putout: safe: convert-const-to-let: on', async ({process}) => {
    await process('convert-const-to-let', SAFE);
});
