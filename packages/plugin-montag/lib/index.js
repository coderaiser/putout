import * as removeUselessSpace from './remove-useless-space/index.js';
import * as addNewlineBeforeText from './add-newline-before-text/index.js';
import * as apply from './apply/index.js';
import * as declare from './declare/index.js';

export const rules = {
    apply,
    declare,
    'add-newline-before-text': addNewlineBeforeText,
    'remove-useless-space': removeUselessSpace,
};
