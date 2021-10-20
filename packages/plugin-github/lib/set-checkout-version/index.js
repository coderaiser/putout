'use strict';

const {
    types,
    operator,
} = require('putout');
const {replaceWith} = require('putout').operator;

const {
    traverse,
    getTemplateValues,
} = operator;

const {StringLiteral} = types;

const checkoutNode = StringLiteral('actions/checkout@v2');

module.exports.report = () => 'Latest version of actions/checkout is missing';

module.exports.fix = (path) => {
    replaceWith(path, checkoutNode);
};

module.exports.traverse = ({push}) => ({
    '__putout_processor_json(__a)'(path) {
        const {__a} = getTemplateValues(path, '__putout_processor_json(__a)');
        
        traverse(__a, {
            '__object'(path) {
                const propertyPath = path.get('properties.0');
                const {value} = propertyPath.get('key').node;
                
                if (value === 'uses') {
                    const valuePath = propertyPath.get('value');
                    const {value} = valuePath.node;
                    
                    if (value === 'actions/checkout@v2')
                        return;
                    
                    if (value === 'actions/checkout@v1')
                        push(valuePath);
                }
            },
        });
    },
});

