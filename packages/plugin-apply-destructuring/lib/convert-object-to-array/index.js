import {types, operator} from 'putout';

const {replaceWith} = operator;
const {
    isObjectProperty,
    arrayPattern,
} = types;

export const report = () => `Use array destructuring instead of object destructuring`;

export const fix = (path) => {
    const elements = [];
    
    for (const {value} of path.node.properties) {
        elements.push(value);
    }
    
    const array = arrayPattern(elements);
    replaceWith(path, array);
};

export const traverse = ({push}) => ({
    ObjectPattern(path) {
        const properties = path.get('properties');
        
        if (!properties.length)
            return;
        
        for (const [i, prop] of properties.entries()) {
            if (!isObjectProperty(prop))
                return;
            
            const {key} = prop.node;
            
            if (i !== key.value)
                return;
        }
        
        push(path);
    },
});
