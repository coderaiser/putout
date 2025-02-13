import {createTest} from '@putout/test/eslint';
import eslintPluginPutout from '../../lib/index.js';

const {safeRules} = eslintPluginPutout;

const test = createTest(import.meta.url);

test('eslint-plugin-putout: safe: no-remove-useless-declaration', async ({process}) => {
    await process('no-remove-useless-declaration', {
        extends: ['plugin:putout/safe'],
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
        extends: ['plugin:putout/safe'],
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
        extends: ['plugin:putout/safe'],
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
