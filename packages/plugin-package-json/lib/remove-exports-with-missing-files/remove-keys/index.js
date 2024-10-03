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
        const {keys = []} = options;
        const object = path.get('arguments.0');
        const exportsPath = getProperty(object, 'exports');
        
        for (const property of exportsPath.get('value.properties')) {
            const {value} = property.node.key;
            
            for (const key of keys) {
                if (key === value) {
                    push(property);
                    continue;
                }
                
                if (key.includes('+'))
                    processNested({
                        key,
                        value,
                        property,
                        push,
                    });
            }
        }
    },
});

function processNested({key, value, property, push}) {
    const [one, two] = key.split('+');
    
    if (one !== value)
        return;
    
    for (const current of property.get('value.properties')) {
        if (two === current.node.key.value)
            push(current);
    }
}
