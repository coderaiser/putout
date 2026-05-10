import {operator, types} from 'putout';

const {isObjectExpression} = types;
const {
    getProperties,
    __json,
    replaceWith,
} = operator;

export const report = () => `Avoid nesting 'exports' with single field`;

export const fix = (path) => {
    const value = path.get('value');
    replaceWith(value, value.get('properties.0.value'));
};

export const traverse = ({push}) => ({
    [__json]: (path) => {
        const __aPath = path.get('arguments.0');
        const {exportsPath} = getProperties(__aPath, ['exports']);
        
        if (!exportsPath)
            return;
        
        const valuePath = exportsPath.get('value');
        
        if (!isObjectExpression(valuePath))
            return;
        
        for (const property of valuePath.get('properties')) {
            const {value} = property.node;
            
            if (!isObjectExpression(value))
                continue;
            
            if (value.properties.length === 1)
                push(property);
        }
    },
});
