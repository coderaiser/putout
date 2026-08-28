import * as applyRspackImport from './apply-rspack-import/index.js';
import * as applySwcLoader from './apply-swc-loader/index.js';
import * as applyAssetType from './apply-asset-type/index.js';
import * as applyLibraryObject from './apply-library-object/index.js';
import * as removeWebpackbar from './remove-webpackbar/index.js';

export const rules = {
    'apply-rspack-import': applyRspackImport,
    'apply-swc-loader': applySwcLoader,
    'apply-asset-type': applyAssetType,
    'apply-library-object': applyLibraryObject,
    'remove-webpackbar': removeWebpackbar,
};
