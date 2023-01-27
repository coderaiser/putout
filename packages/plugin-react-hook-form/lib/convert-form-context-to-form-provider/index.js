'use strict';

module.exports.report = () => `Use '<FormProvider/>' instead of '<FormContext/>'`;

module.exports.fix = (path) => {
    path.scope.rename('FormContext', 'FormProvider');
};

module.exports.include = () => [
    '<FormContext>__jsx_children</FormContext>',
];

module.exports.filter = (path) => path.scope.getAllBindings().FormContext;

