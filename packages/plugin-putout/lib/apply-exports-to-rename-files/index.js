import {createApplyExports} from '../create-apply-exports.js';

export const {report, replace} = createApplyExports({
    renameFiles: [
        'report',
        'fix',
        'scan',
    ],
});
