import {matchToFlat} from '@putout/eslint-flat';
import {mergeESLintConfigs} from '@putout/eslint-flat';
import {createESLintConfig} from '@putout/eslint-flat';
import {safeAlign} from 'eslint-plugin-putout/config';

matchToFlatDir('./hello');
matchToFlat(config);
mergeESLintConfigs(['./packages', './rules']);

export default createESLintConfig([safeAlign]);
