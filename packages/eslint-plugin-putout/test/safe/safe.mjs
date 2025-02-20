import {createTest} from '@putout/test/eslint';
import {safe, safeRules} from '../../lib/index.mjs';

const test = createTest(import.meta.url, safe);

test('eslint-plugin-putout: safe: no-remove-useless-declaration', async ({process}) => {
    await process('no-remove-useless-declaration', {
        rules: {
            'putout/putout': ['error', {
                ignore: ['!**/fixture'],
                rules: {
                    ...safeRules,
                },
            }],
        },
    });
});

test('eslint-plugin-putout: safe: no-merge-duplicate-functions', async ({noProcess}) => {
    await noProcess('no-merge-duplicate-functions', {
        rules: {
            'putout/putout': ['error', {
                ignore: ['!**/fixture'],
                rules: {
                    ...safeRules,
                },
            }],
        },
    });
});

test('eslint-plugin-putout: safe: no-remoe-useless-push', async ({noProcess}) => {
    await noProcess('no-remove-useless-push', {
        rules: {
            'putout/putout': ['error', {
                ignore: ['!**/fixture'],
                rules: {
                    ...safeRules,
                },
            }],
        },
    });
});
