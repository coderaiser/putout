import {createApplyExports} from '../create-apply-exports.js';

const {report, replace} = createApplyExports({
    renameFiles: [
        'report',
        'fix',
        'scan',
    ],
});

export {
    report,
    replace,
};
