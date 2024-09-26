import {rules as packageJson} from './package-json.js';
import * as findFile from './find-file/index.js';

export const rules = {
    ...packageJson,
    'find-file': ['off', findFile],
};
