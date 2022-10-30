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
const checkoutNode = StringLiteral('actions/setup-node@v3');

module.exports.report = () => 'Latest version of actions/setup-node is missing';

module.exports.fix = (path) => {
    replaceWith(path, checkoutNode);
};

module.exports.traverse = ({push}) => ({
    '__putout_processor_json(__a)'(path) {
        const {__a} = getTemplateValues(path, '__putout_processor_json(__a)');
        
        for (const propertyPath of traverseProperty(__a, 'uses')) {
            const valuePath = propertyPath.get('value');
            const {value} = valuePath.node;
            
            if (value === 'actions/setup-node@v3')
                continue;
            
            if (value === 'actions/setup-node@v1')
                push(valuePath);
            
            if (value === 'actions/setup-node@v2')
                push(valuePath);
        }
    },
});

