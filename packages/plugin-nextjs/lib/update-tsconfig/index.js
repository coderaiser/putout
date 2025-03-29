import {operator, types} from 'putout';

const {
    arrayExpression,
    stringLiteral,
    objectProperty,
} = types;

const {getProperty, __json} = operator;

const getValue = (a) => a.value;

export const report = () => `Update 'tsconfig.json'`;

export const fix = ({path, propertyInclude}) => {
    if (!propertyInclude) {
        propertyInclude = objectProperty(stringLiteral('include'), arrayExpression([]));
        path.node.properties.push(propertyInclude);
    }
    
    propertyInclude.value.elements.push(stringLiteral('./dist/types/**/*.ts'), stringLiteral('./next-env.d.ts'));
};

export const traverse = ({push}) => ({
    [__json](path) {
        const __objectPath = path.get('arguments.0');
        const propertyInclude = getProperty(__objectPath, 'include');
        
        if (!propertyInclude)
            return push({
                path: __objectPath,
                propertyInclude,
            });
        
        const values = propertyInclude.node.value.elements.map(getValue);
        
        if (values.includes('./dist/types/**/*.ts') && values.includes('./next-env.d.ts'))
            return;
        
        push({
            path: __objectPath,
            propertyInclude: propertyInclude.node,
        });
    },
});
