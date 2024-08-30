'use strict';

const {createRenameProperty} = require('../rename-property');

module.exports = createRenameProperty([
    ['convert-math-pow', 'math/apply-exponential'],
    ['apply-numeric-separators', 'math/apply-numeric-separators'],
    ['convert-imul-to-multiplication', 'math/apply-multiplication'],
    ['convert-sqrt-to-hypot', 'math/convert-sqrt-to-hypot'],
]);
