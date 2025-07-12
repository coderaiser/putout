import {createTest} from '@putout/test/eslint';
import {safe, safeRules} from '../../lib/index.mjs';

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
