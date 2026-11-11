import {types, operator} from 'putout';

const {
    replaceWith,
    remove,
    createTypeChecker,
} = operator;

const {
    isAssignmentPattern,
    isObjectPattern,
} = types;

const isAssignment = ({value}) => isAssignmentPattern(value);
const isNestedProperty = ({value}) => isObjectPattern(value);

const isToManyProperties = ({node}, {maxProperties}) => node.properties.length > maxProperties;
const isNested = ({node}) => node.properties.some(isNestedProperty);
const hasAssignment = ({node}) => node.properties.some(isAssignment);

const isSupportedBinding = createTypeChecker([
    ['-: references', '!=', 1],
    ['-: referencePaths.0.parentPath -> !VariableDeclarator'],
    ['+: -> +'],
]);

const isSupportedId = createTypeChecker([
    ['+: -> !ObjectPattern'],
    ['-', isToManyProperties],
    ['-', isNested],
    ['-', hasAssignment],
    ['+: -> ObjectPattern'],
]);

export const report = () => `Use destructuring in head of 'for..of'`;

export const fix = ({path, varPath}) => {
    replaceWith(varPath, path.node.id);
    remove(path);
};

export const traverse = ({push, options}) => ({
    'for (const __ of __) __'(path) {
        const varPath = path.get('left.declarations.0.id');
        
        if (!varPath.isIdentifier())
            return;
        
        const binding = varPath.scope.bindings[varPath.node.name];
        
        if (!isSupportedBinding(binding))
            return;
        
        const {maxProperties = 4} = options;
        const {parentPath} = binding.referencePaths[0];
        
        if (!isSupportedId(parentPath.get('id'), {maxProperties}))
            return;
        
        push({
            path: parentPath,
            varPath,
        });
    },
});
