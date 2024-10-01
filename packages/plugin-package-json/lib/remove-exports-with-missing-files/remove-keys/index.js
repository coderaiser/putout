import {operator} from 'putout';

const {
    getProperty,
    __json,
    remove,
} = operator;

export const report = ({node}) => {
    const key = node.key.value;
    const {value} = node.value;
    
    return `${key} -> ${value}`;
};

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push, options}) => ({
    [__json](path) {
        const {keys = ['./loader']} = options;
        
        const object = path.get('arguments.0');
        const exportsPath = getProperty(object, 'exports');
        
        for (const property of exportsPath.get('value.properties')) {
            const {value} = property.node.key;
            
            if (keys.includes(value))
                push(property);
        }
    },
});
