import {matchToFlat} from '@putout/eslint-flat';
import {mergeESLintConfigs} from '@putout/eslint-flat';

const scriptsConfig = await matchToFlatDir(__dirname, 'scripts');

const monoConfig = await mergeESLintConfigs(import.meta.url, ['codemods', 'packages', 'rules']);
