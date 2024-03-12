import addContinueOnErrorToCoveralls from './add-continue-on-error-to-coveralls/index.js';
import addContinueOnErrorToAddAndCommit from './add-continue-on-error-to-add-and-commit/index.js';
import updateActions from './update-actions/index.js';
import * as setNodeVersions from './set-node-versions/index.js';
import * as installBun from './install-bun/index.js';
import * as convertNpmToBun from './convert-npm-to-bun/index.js';
import * as insertRust from './insert-rust/index.js';

export const rules = {
    'add-continue-on-error-to-coveralls': addContinueOnErrorToCoveralls,
    'add-continue-on-error-to-add-and-commit': addContinueOnErrorToAddAndCommit,
    'update-actions': updateActions,
    'set-node-versions': setNodeVersions,
    'install-bun': installBun,
    'convert-npm-to-bun': convertNpmToBun,
    'insert-rust': insertRust,
};
