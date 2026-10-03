import {
    template,
    operator,
    types,
} from 'putout';

const {
    compare,
    insertBefore,
    replaceWith,
} = operator;

const {
    stringLiteral,
    arrayExpression,
    isObjectProperty,
} = types;

const createInclude = template('export const include = () => LIST');

export const report = () => `Use 'Includer' instead of 'Replacer'`;

export const fix = ({path, properties}) => {
    const list = [];
    
    for (const property of properties) {
        const {key} = property.node;
        
        list.push(key.value);
    }
    
    replaceWith(path, createInclude({
        LIST: arrayExpression(list.map(stringLiteral)),
    }));
    
    insertBefore(path, template.ast('export const fix = () => {}'));
};
export const traverse = ({push}) => ({
    'export const replace = () => __object': (path) => {
        const __objectPath = path.get('declaration.declarations.0.init.body');
        const properties = __objectPath.get('properties');
        const fileteredProperties = properties.filter(isObjectProperty);
        
        if (!fileteredProperties.length)
            return;
        
        for (const property of fileteredProperties) {
            const {
                key,
                value,
                computed,
            } = property.node;
            
            if (computed)
                return;
            
            if (!compare(key, value))
                return;
        }
        
        push({
            path,
            properties,
        });
    },
});
