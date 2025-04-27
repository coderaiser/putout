import {createRenameProperty} from '../rename-property.js';

const v24 = [
    ['remove-process-exit', 'nodejs/remove-process-exit'],
    ['convert-top-level-return', 'nodejs/convert-top-level-return'],
];

export const {
    report,
    fix,
    traverse,
} = createRenameProperty([
    ...v24,
    ['strict-mode/add-missing', 'nodejs/add-missing-strict-mode'],
    ['strict-mode/remove-useless', 'nodejs/remove-useless-strict-mode'],
    ['convert-esm-to-commonjs', 'nodejs/convert-esm-to-commonjs'],
    ['convert-commonjs-to-esm', 'nodejs/convert-commonjs-to-esm'],
]);
