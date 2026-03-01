import {operator, types} from 'putout';

const {isObjectExpression} = types;
const {
    getProperty,
    __json,
    setLiteralValue,
} = operator;

const dropDotSlash = (a) => a.slice(2);

export const report = (path) => {
    const {value} = path.node;
    const newValue = dropDotSlash(value);
    
    return `Avoid './' in 'bin': '${value}' -> '${newValue}'`;
};

export const fix = (path) => {
    const {value} = path.node;
    const newValue = dropDotSlash(value);
    
    setLiteralValue(path, newValue);
};

export const traverse = ({push}) => ({
    [__json](path) {
        const arg = path.get('arguments.0');
        const bin = getProperty(arg, 'bin');
        
        if (!bin)
            return;
        
        const object = bin.get('value');
        
        if (!isObjectExpression(object))
            return;
        
        for (const property of object.get('properties')) {
            const valuePath = property.get('value');
            const {value} = valuePath.node;
            
            if (value.startsWith('./'))
                push(valuePath);
        }
    },
});
