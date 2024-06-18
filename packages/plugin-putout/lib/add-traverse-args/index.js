'use strict';

const {types, operator} = require('putout');
const {traverse} = operator;

const {
    ObjectProperty,
    ObjectPattern,
    Identifier,
} = types;

const defaultNames = [
    'push',
    'store',
    'listStore',
    'pathStore',
];

module.exports.report = ({name}) => `Add '${name}' argument to 'traverse'`;

module.exports.fix = ({name, fn}) => {
    const computed = false;
    const shorthand = true;
    const id = Identifier(name);
    const property = ObjectProperty(id, id, computed, shorthand);
    
    if (!fn.params.length) {
        fn.params.push(ObjectPattern([property]));
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
    
    for (const prop of fn.params[0].properties) {
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
            
            push({
                path,
                fn,
                name,
            });
        },
        [`__a(__args)`]: (currentPath) => {
            const {callee} = currentPath.node;
            const {name} = callee;
            
            if (!names.includes(name))
                return;
            
            const bindings = currentPath.scope.getAllBindings();
            
            if (bindings[name])
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

function isCallee(name, {parentPath}) {
    return parentPath
        .get('callee')
        .isIdentifier({
            name,
        });
}
