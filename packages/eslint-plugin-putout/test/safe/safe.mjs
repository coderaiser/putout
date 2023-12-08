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
