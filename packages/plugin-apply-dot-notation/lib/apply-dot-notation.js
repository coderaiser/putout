import {types} from 'putout';

const {
    isStringLiteral,
    isValidIdentifier,
    identifier,
} = types;

export const report = ({value}) => {
    return `Use dot notation: '["${value}"]' -> '.${value}'`;
};

export const fix = ({value, path}) => {
    const {node} = path;
    
    node.property = identifier(value);
    node.computed = false;
};

export const traverse = ({push}) => ({
    MemberExpression(path) {
        const {node} = path;
        const {property} = node;
        const {value} = property;
        
        if (!isStringLiteral(property))
            return;
        
        if (!isValidIdentifier(value))
            return;
        
        push({
            path,
            value,
        });
    },
});
