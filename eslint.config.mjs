import {safeAlign} from 'eslint-plugin-putout/config';
import importPlugin from 'eslint-plugin-import';
import {
    matchToFlatDir,
    mergeESLintConfigs,
    createESLintConfig,
} from '@putout/eslint-flat';

const scriptsConfig = await matchToFlatDir(import.meta.url, 'scripts');

const monoConfig = await mergeESLintConfigs(import.meta.url, ['codemods', 'packages', 'rules']);

export default createESLintConfig([
    safeAlign, {
        files: ['*.js'],
        rules: {
            'import/no-extraneous-dependencies': 'error',
            '@stylistic/js/semi': 'off',
        },
        plugins: {
            import: importPlugin,
        },
    },
    scriptsConfig,
    monoConfig, {
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
        },
        ignores: ['**/fixture'],
    },
]);
