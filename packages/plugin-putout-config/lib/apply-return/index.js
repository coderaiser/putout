import {createRenameProperty} from '../rename-property.js';

const {
    report,
    fix,
    traverse,
} = createRenameProperty([
    ['apply-early-return', 'return/apply-early'],
    ['remove-useless-return', 'return/remove-useless'],
    ['simplify-boolean-return', 'return/simplify-boolean'],
    ['convert-break-to-return', 'return/convert-from-break'],
]);

export {
    report,
    fix,
    traverse,
};
