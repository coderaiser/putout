import {operator, types} from 'putout';

const {isIdentifier} = types;
const {replaceWithMultiple} = operator;

export const report = () => `Use 'default' instead of 'defaultExport'`;

export const fix = (path) => {
    const key = path.get('key');
    
    if (key.node.name === 'defaultExport') {
        key.node.name = 'default';
        return;
    }
    
    if (key.node.name === 'namedExports') {
        const {properties} = path.get('value').node;
        
        replaceWithMultiple(path, properties);
    }
};
export const traverse = ({push}) => ({
    'mock.module(__a, __object)': (path) => {
        const object = path.get('arguments.1');
        const properties = object.get('properties');
        
        for (const property of properties) {
            if (isIdentifier(property.node.key, {name: 'defaultExport'})) {
                push(property);
                continue;
            }
            
            if (isIdentifier(property.node.key, {name: 'namedExports'})) {
                push(property);
                continue;
            }
        }
    },
});
