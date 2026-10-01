import {operator, types} from 'putout';

const {compare, remove} = operator;
const {
    booleanLiteral,
    isObjectProperty,
} = types;

export const report = () => `Avoid useless 'match'`;

export const fix = (path) => {
    remove(path);
};
export const traverse = ({push}) => ({
    'export const match = () => __object': (path) => {
        const __objectPath = path.get('declaration.declarations.0.init.body');
        const properties = __objectPath.get('properties');
        const boolean = booleanLiteral(true);
        
        for (const property of properties.filter(isObjectProperty)) {
            const {body} = property.node.value;
            
            if (compare(body, boolean))
                push(property);
        }
        
        if (!__objectPath.get('properties').length)
            push(path);
    },
});
