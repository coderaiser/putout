import * as removeUselessProvider from './remove-useless-provider/index.js';
import * as removeImplicitRefReturn from './remove-implicit-ref-return/index.js';
import * as removeUselessForwardRef from './remove-useless-forward-ref/index.js';
import * as applyCreateRoot from './apply-create-root/index.js';
import * as renameFileJsToJsx from './rename-file-js-to-jsx/index.js';
import * as renameFileJsxToJs from './rename-file-jsx-to-js/index.js';

export const rules = {
    'remove-useless-provider': removeUselessProvider,
    'remove-implicit-ref-return': removeImplicitRefReturn,
    'remove-useless-forward-ref': removeUselessForwardRef,
    'apply-create-root': applyCreateRoot,
    'rename-file-js-to-jsx': ['off', renameFileJsToJsx],
    'rename-file-jsx-to-js': ['off', renameFileJsxToJs],
};
