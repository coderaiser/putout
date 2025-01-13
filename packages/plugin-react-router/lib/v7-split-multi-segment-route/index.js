'use strict';

const {operator, types} = require('putout');
const {
    replaceWith,
    setLiteralValue,
    getProperties,
} = operator;

const {
    StringLiteral,
    Identifier,
    ObjectProperty,
    ObjectExpression,
    ArrayExpression,
} = types;

module.exports.report = () => `Split multi-segment splat <Route`;

module.exports.match = () => ({
    '<Route path="__a" element={__b} />': ({__a}) => {
        const {value} = __a;
        
        if (value === '*')
            return false;
        
        return __a.value.endsWith('*');
    },
    'createBrowserRouter(__array)': (vars, path) => {
        const elements = path.get('arguments.0.elements');
        
        for (const objectPath of elements) {
            const {pathPath, elementPath} = getProperties(objectPath, ['path', 'element']);
            
            if (!elementPath)
                continue;
            
            if (pathPath.node.value.value.includes('*'))
                return true;
        }
    },
});

module.exports.replace = () => ({
    '<Route path="__a" element={__b} />': ({__a}) => {
        const [name, mask] = __a.value.split(`/`);
        
        return `
              <Route path="${name}">
                <Route path="${mask}" element={__b} />
              </Route>
        `;
    },
    'createBrowserRouter(__array)': (vars, path) => {
        const elements = path.get('arguments.0.elements');
        
        for (const objectPath of elements) {
            const {pathPath, elementPath} = getProperties(objectPath, ['path', 'element']);
            
            if (!pathPath.node.value.value.includes('*'))
                continue;
            
            const [first, second] = pathPath.node.value.value.split('/');
            
            const value = ArrayExpression([
                ObjectExpression([
                    ObjectProperty(Identifier('path'), StringLiteral(second)),
                    elementPath.node,
                ]),
            ]);
            
            setLiteralValue(pathPath.get('value'), first);
            replaceWith(elementPath, ObjectProperty(Identifier('children'), value));
        }
        
        return path;
    },
});
