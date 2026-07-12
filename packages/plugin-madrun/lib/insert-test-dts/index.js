import {
    template,
    types,
    operator,
} from 'putout';

const {insertAfter} = operator;
const {
    stringLiteral,
    objectProperty,
    isObjectProperty,
} = types;

const nodeTestDts = template.ast('() => "check-dts test/*.ts"');

export const report = () => `Insert 'test:dts'`;

export const match = () => ({
    'export default __object': (vars, path) => {
        const properties = path.get('declaration.properties');
        
        let is = false;
        
        for (const property of properties.filter(isObjectProperty)) {
            const {value} = property.node.key;
            
            if (value === 'test:dts')
                return false;
            
            if (value === 'test')
                is = true;
        }
        
        return is;
    },
});

export const replace = () => ({
    'run(["lint", "coverage"])': 'run(["lint", "coverage", "test:dts"])',
    'export default __object': (vars, path) => {
        const properties = path.get('declaration.properties');
        
        for (const property of properties) {
            const {value} = property.node.key;
            
            if (value === 'test')
                insertAfter(property, objectProperty(
                    stringLiteral('test:dts'),
                    nodeTestDts,
                ));
        }
        
        return path;
    },
});
