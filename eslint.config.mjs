import {safeAlign} from 'eslint-plugin-putout/config';
import importPlugin from 'eslint-plugin-import';
import {matchToFlatDir, mergeESLintConfigs} from './packages/eslint-flat/lib/flat.js';

const scriptsConfig = await matchToFlatDir('./scripts');
const monoConfig = await mergeESLintConfigs(['./codemods', './packages', './rules']);

export default [
    ...safeAlign, {
        files: ['*.js'],
        rules: {
            'import/no-extraneous-dependencies': 'error',
            '@stylistic/js/semi': 'off',
        },
        plugins: {
            import: importPlugin,
        },
    },
    ...scriptsConfig,
    ...monoConfig, {
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
        },
        ignores: ['**/fixture'],
    },
];
