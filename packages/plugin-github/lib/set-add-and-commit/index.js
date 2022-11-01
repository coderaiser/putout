'use strict';

const {
    types,
    operator,
} = require('putout');

const {traverseProperty} = require('../traverse-property');

const {
    replaceWith,
    getTemplateValues,
} = operator;

const {StringLiteral} = types;
const checkoutNode = StringLiteral('EndBug/add-and-commit@v9');

module.exports.report = () => 'Latest version of EndBug/add-and-commit is missing';

module.exports.fix = (path) => {
    replaceWith(path, checkoutNode);
};

module.exports.traverse = ({push}) => ({
    '__putout_processor_json(__a)'(path) {
        const {__a} = getTemplateValues(path, '__putout_processor_json(__a)');
        
        for (const propertyPath of traverseProperty(__a, 'uses')) {
            const valuePath = propertyPath.get('value');
            const {value} = valuePath.node;
            
            if (value === 'EndBug/add-and-commit@v9')
                continue;
            
            if (value === 'EndBug/add-and-commit@v7')
                push(valuePath);
        }
    },
});

