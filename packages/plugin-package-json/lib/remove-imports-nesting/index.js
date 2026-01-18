import {operator, types} from 'putout';

const {isObjectExpression} = types;
const {
    getProperties,
    __json,
    replaceWith,
} = operator;

export const report = (path) => {
    const {value: property} = path.get('value.properties.0.key').node;
    const {value} = path.get('key').node;
    
    return `Avoid nesting import '${value}' with single property: '${property}'`;
};

export const fix = (path) => {
    const value = path.get('value');
    replaceWith(value, value.get('properties.0.value'));
};

export const traverse = ({push}) => ({
    [__json]: (path) => {
        const __aPath = path.get('arguments.0');
        const {importsPath} = getProperties(__aPath, ['imports']);
        
        if (!importsPath)
            return;
        
        for (const property of importsPath.get('value.properties')) {
            const {value} = property.node;
            
            if (!isObjectExpression(value))
                continue;
            
            if (value.properties.length === 1)
                push(property);
        }
    },
});
