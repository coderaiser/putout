import * as removeUselessMemoizations from './remove-useless-memoizations/index.js';
import * as applyDefaultToJsxString from './apply-default-to-jsx-string/index.js';
import * as convertNamespaceToDefaultInReactTestRenderer from './convert-namespace-to-default-in-react-test-renderer/index.js';
import * as applyCreateRoot from './apply-create-root/index.js';
import * as applyJSXToImportedFile from './apply-jsx-to-imported-file/index.js';
import * as removeUselessProvider from './remove-useless-provider/index.js';
import * as removeImplicitRefReturn from './remove-implicit-ref-return/index.js';
import * as removeUselessForwardRef from './remove-useless-forward-ref/index.js';
import * as renameFileJsToJsx from './rename-file-js-to-jsx/index.js';
import * as renameFileJsxToJs from './rename-file-jsx-to-js/index.js';

export const rules = {
    'apply-create-root': applyCreateRoot,
    'apply-jsx-to-imported-file': ['off', applyJSXToImportedFile],
    'remove-useless-provider': removeUselessProvider,
    'remove-implicit-ref-return': removeImplicitRefReturn,
    'remove-useless-forward-ref': removeUselessForwardRef,
    'rename-file-js-to-jsx': ['off', renameFileJsToJsx],
    'rename-file-jsx-to-js': ['off', renameFileJsxToJs],
    'convert-namespace-to-default-in-react-test-renderer': convertNamespaceToDefaultInReactTestRenderer,
    'apply-default-to-jsx-string-': applyDefaultToJsxString,
    'remove-useless-memoizations': removeUselessMemoizations,
};
