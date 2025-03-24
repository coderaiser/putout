import {createRenameProperty} from '../rename-property.js';

const {
    report,
    fix,
    traverse,
} = createRenameProperty([
    ['convert-math-pow', 'math/apply-exponential'],
    ['apply-numeric-separators', 'math/apply-numeric-separators'],
    ['convert-imul-to-multiplication', 'math/apply-multiplication'],
    ['convert-sqrt-to-hypot', 'math/convert-sqrt-to-hypot'],
]);

export {
    report,
    fix,
    traverse,
};
