import {operator, types} from 'putout';

const {isObjectExpression} = types;
const {getProperty, __json} = operator;

export const report = ({node}) => {
    const key = node.key.value;
    const {value} = node.value;
    
    return `${key} -> ${value}`;
};

export const fix = () => {};

export const traverse = ({push}) => ({
    [__json](path) {
        const object = path.get('arguments.0');
        const exportsPath = getProperty(object, 'exports');
        
        if (!exportsPath)
            return;
        
        const objectPath = exportsPath.get('value');
        
        if (!isObjectExpression(objectPath))
            return;
        
        for (const property of objectPath.get('properties')) {
            if (isObjectExpression(property.node.value))
                continue;
            
            push(property);
        }
    },
});
