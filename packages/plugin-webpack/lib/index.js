import * as applyExternals from './apply-externals/index.js';
import * as convertLoaderToUse from './convert-loader-to-use/index.js';
import * as convertQueryLoaderToUse from './convert-query-loader-to-use/index.js';
import * as convertNodeToResolveFallback from './convert-node-to-resolve-fallback/index.js';

export const rules = {
    'apply-externals': applyExternals,
    'convert-loader-to-use': convertLoaderToUse,
    'convert-query-loader-to-use': convertQueryLoaderToUse,
    'convert-node-to-resolve-fallback': convertNodeToResolveFallback,
};
