import * as addAwaitToReImport from './add-await-to-re-import/index.js';
import * as convertMockRequireToMockImport from './convert-mock-require-to-mock-import/index.js';
import * as addStopAll from './add-stop-all/index.js';
import * as removeStopAll from './remove-stop-all/index.js';
import * as addNodePrefixToMockRequire from './add-node-prefix-to-mock-require/index.js';
import * as declare from './declare/index.js';

export const rules = {
    'declare': declare,
    'convert-mock-require-to-mock-import': ['off', convertMockRequireToMockImport],
    'add-await-to-re-import': addAwaitToReImport,
    'add-stop-all': addStopAll,
    'remove-stop-all': removeStopAll,
    'add-node-prefix-to-mock-require': addNodePrefixToMockRequire,
};
