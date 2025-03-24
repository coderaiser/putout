import {createRenameProperty} from '../rename-property.js';

const v32 = [
    ['remove-useless-else', 'conditions/remove-useless-else'],
    ['merge-if-statements', 'conditions/merge-if-statements'],
];

const v29 = [
    ['apply-comparison-order', 'conditions/apply-comparison-order'],
    ['apply-if-condition', 'conditions/apply-if'],
    ['convert-comparison-to-boolean', 'conditions/convert-comparison-to-boolean'],
    ['convert-equal-to-strict-equal', 'conditions/convert-equal-to-strict-equal'],
    ['remove-useless-conditions/evaluate', 'conditions/evaluate'],
    ['remove-useless-conditions/simplify', 'conditions/simplify'],
    ['convert-comparison-to-boolean', 'conditions/convert-comparison-to-boolean'],
    ['remove-constant-conditions', 'conditions/remove-constant'],
    ['remove-boolean-from-assertions', 'conditions/remove-boolean'],
];

const versions = [
    ...v32,
    ...v29,
];

const {
    report,
    fix,
    traverse,
} = createRenameProperty(versions);

export {
    report,
    fix,
    traverse,
};
