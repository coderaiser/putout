import {createRenameProperty} from '../rename-property.js';

const {
    report,
    fix,
    traverse,
} = createRenameProperty([
    ['convert-typeof-to-is-type', 'types/convert-typeof-to-is-type'],
    ['remove-useless-type-conversions', 'types/remove-useless-type-conversions'],
    ['remove-useless-typeof', 'types/remove-useless-typeof'],
    ['apply-is-array', 'types/apply-is-array'],
    ['remove-useless-type-conversion/with-double-negations', 'types/remove-double-negations'],
]);

export {
    report,
    fix,
    traverse,
};
