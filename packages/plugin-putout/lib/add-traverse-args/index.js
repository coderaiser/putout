'use strict';

const {types, operator} = require('putout');
const {
    objectPattern,
    objectProperty,
    identifier,
    isObjectPattern,
} = types;

const {traverse, getBinding} = operator;

const defaultNames = [
    'push',
    'store',
    'listStore',
    'pathStore',
    'options',
];

module.exports.report = ({name}) => `Add '${name}' argument to 'traverse'`;

module.exports.fix = ({name, fn}) => {
    const computed = false;
    const shorthand = true;
    const id = identifier(name);
    const property = objectProperty(id, id, computed, shorthand);
    
    if (!fn.params.length) {
        fn.params.push(objectPattern([property]));
        return;
    }
    
    fn.params[0].properties.push(property);
};

module.exports.traverse = ({push, options}) => {
    const {
        names = defaultNames,
    } = options;
    
    const check = checkArgs(names, push);
    
    return {
        'export const traverse = (__args) => __': check,
        'module.exports.traverse = (__args) => __': check,
    };
};

const isArgExists = (mainName, fn) => {
    if (!fn.params.length)
        return false;
    
    const [first] = fn.params;
    
    if (!isObjectPattern(first))
        return false;
    
    for (const prop of first.properties) {
        if (prop.key.name === mainName)
            return true;
    }
    
    return false;
};

const checkArgs = (names, push) => (path) => {
    const fn = parseFn(path);
    
    traverse(path, {
        ReferencedIdentifier(path) {
            const {name} = path.node;
            
            if (!names.includes(name))
                return;
            
            if (isCallee(name, path))
                return;
            
            if (isArgExists(name, fn))
                return;
            
            if (getBinding(path, name))
                return;
            
            push({
                path,
                fn,
                name,
            });
        },
        [`__a(__args)`]: (path) => {
            const {callee} = path.node;
            const {name} = callee;
            
            if (!names.includes(name))
                return;
            
            if (getBinding(path, name))
                return;
            
            push({
                path,
                fn,
                name,
            });
        },
    });
};

function parseFn(path) {
    if (path.isAssignmentExpression())
        return path.get('right').node;
    
    return path.get('declaration.declarations.0.init').node;
}

const isCallee = (name, {parentPath}) => parentPath.get('callee').isIdentifier({
    name,
});
