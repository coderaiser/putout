import {createApplyExports} from '../create-apply-exports.js';

export const {report, replace} = createApplyExports({
    addArgs: [
        'report',
        'fix',
        'traverse',
    ],
});
