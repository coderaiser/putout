'use strict';

const {operator} = require('putout');
const {rename} = operator;

module.exports.report = () => `Use '<FormProvider/>' instead of '<FormContext/>'`;

module.exports.fix = (path) => {
    rename(path, 'FormContext', 'FormProvider');
};

module.exports.include = () => [
    '<FormContext __jsx_attributes>__jsx_children</FormContext>',
];

module.exports.filter = (path) => path.scope.getAllBindings().FormContext;
