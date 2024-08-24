'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;
const {
    ObjectExpression,
    ObjectProperty,
    isLabeledStatement,
} = types;

module.exports.report = () => `Convert 'label' to 'object'`;

module.exports.match = () => ({
    '(__args) => __body': ({__body}) => {
        if (!__body.body.length)
            return false;
        
        for (const statement of __body.body) {
            if (!isLabeledStatement(statement))
                return false;
        }
        
        return true;
    },
});

module.exports.replace = () => ({
    '(__args) => __body': ({__body}, path) => {
        const properties = [];
        
        for (const {label, body} of __body.body) {
            properties.push(ObjectProperty(label, body.expression));
        }
        
        const object = ObjectExpression(properties);
        
        replaceWith(path.get('body'), object);
        
        return path;
    },
});
