import {types, operator} from 'putout';

const {
    objectExpression,
    isLabeledStatement,
    objectProperty,
} = types;

const {replaceWith} = operator;

export const report = () => `Convert 'label' to 'object'`;

export const match = () => ({
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

export const replace = () => ({
    '(__args) => __body': ({__body}, path) => {
        const properties = [];
        
        for (const {label, body} of __body.body) {
            properties.push(objectProperty(label, body.expression));
        }
        
        const object = objectExpression(properties);
        
        replaceWith(path.get('body'), object);
        
        return path;
    },
});
