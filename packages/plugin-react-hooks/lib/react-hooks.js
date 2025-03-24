import * as applyShortFragment from './apply-short-fragment/index.js';
import * as declare from './declare/index.js';
import * as renameMethodUnderScore from './rename-method-under-score/index.js';
import * as convertStateToHooks from './convert-state-to-hooks/index.js';
import * as removeBind from './remove-bind/index.js';
import * as removeThis from './remove-this/index.js';
import * as removeReact from './remove-react/index.js';
import * as convertClassToFunction from './convert-class-to-function/index.js';
import * as convertComponentToUseState from './convert-component-to-use-state/index.js';
import * as convertImportComponentToUseState from './convert-import-component-to-use-state/index.js';

export const rules = {
    'apply-short-fragment': applyShortFragment,
    declare,
    'rename-method-under-score': renameMethodUnderScore,
    'convert-state-to-hooks': convertStateToHooks,
    'remove-bind': removeBind,
    'remove-this': removeThis,
    'remove-react': removeReact,
    'convert-class-to-function': convertClassToFunction,
    'convert-component-to-use-state': convertComponentToUseState,
    'convert-import-component-to-use-state': convertImportComponentToUseState,
};
