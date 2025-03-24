import {createApplyExports} from '../create-apply-exports.js';

const {report, replace} = createApplyExports({
    addArgs: [
        'report',
        'fix',
        'traverse',
    ],
});

export {
    report,
    replace,
};
