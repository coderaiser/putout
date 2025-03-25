import {createRenameProperty} from '../rename-property.js';

const v39 = [
    ['split-assignment-expressions', 'assignment/split'],
    ['simplify-assignments', 'assignment/simplify'],
    ['convert-assignment-to-arrow-function', 'assignment/convert-to-arrow-function'],
    ['convert-assignment-to-comparison', 'assignment/convert-to-comparison'],
    ['convert-assignment-to-declaration', 'assignment/convert-to-declaration'],
];

const {
    report,
    fix,
    traverse,
} = createRenameProperty(v39);

export {
    report,
    fix,
    traverse,
};
