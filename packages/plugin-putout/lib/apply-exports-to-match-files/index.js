import {createApplyExports} from '../create-apply-exports.js';

const {report, replace} = createApplyExports({
    matchFiles: [
        'report',
        'fix',
        'scan',
    ],
});

export {
    report,
    replace,
};
