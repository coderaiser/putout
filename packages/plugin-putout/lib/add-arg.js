'use strict';

const {types, operator} = require('putout');
const {traverse} = operator;

const {
    ObjectProperty,
    ObjectPattern,
    Identifier,
} = types;

module.exports = function addArg(name) {
    return {
        report: createReport(name),
        fix: createFix(name),
        traverse: createTraverse(name),
    };
};

const createReport = (name) => () => `Add '${name}' argument to 'traverse'`;

const createFix = (mainName) => ({fn}) => {
    const computed = false;
    const shorthand = true;
    const name = Identifier(mainName);
    const property = ObjectProperty(name, name, computed, shorthand);
    
    if (!fn.params.length) {
        fn.params.push(ObjectPattern([property]));
        return;
    }
    
    fn.params[0].properties.push(property);
};

const createTraverse = (name) => ({push}) => {
    const check = checkArgs(name, push);
    
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

const checkArgs = (mainName, push) => (path) => {
    const fn = parseFn(path);
    
    if (isArgExists(mainName, fn))
        return false;
    
    traverse(path, {
        ReferencedIdentifier(path) {
            if (path.node.name !== mainName)
                return;
            
            if (isCallee(mainName, path))
                return;
            
            push({
                path,
                fn,
            });
        },
        [`${mainName}(__args)`]: (currentPath) => {
            const bindings = currentPath.scope.getAllBindings();
            
            if (bindings[mainName])
                return;
            
            push({
                path,
                fn,
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
