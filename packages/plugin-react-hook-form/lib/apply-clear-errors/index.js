'use strict';

module.exports.report = () => `Use 'clearErrors' instead of 'clearError'`;

module.exports.fix = (path) => {
    path.scope.rename('clearError', 'clearErrors');
};

module.exports.include = () => [
    'clearError(__args)',
];
