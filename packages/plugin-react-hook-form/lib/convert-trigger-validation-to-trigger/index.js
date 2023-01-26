'use strict';

module.exports.report = () => `Use 'trigger()' instead of 'triggerValidation()'`;

module.exports.fix = (path) => {
    path.scope.rename('triggerValidation', 'trigger');
};

module.exports.include = () => [
    'triggerValidation(__args)',
];

module.exports.filter = (path) => path.scope.bindings.triggerValidation;

