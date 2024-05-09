import {matchToFlatDir} from '@putout/eslint-flat';

const scriptsConfig = await matchToFlatDir(import.meta.url, 'scripts');
const monoConfig = await mergeESLintConfigs(import.meta.url, ['codemods', 'packages', 'rules']);
