'use strict';

const {types, operator} = require('putout');

const {traverse} = operator;

const {
    ObjectProperty,
    ObjectPattern,
    Identifier,
} = types;

module.exports.report = () => `Add 'push' argument to 'traverse'`;

module.exports.fix = ({fn}) => {
    const computed = false;
    const shorthand = true;
    const name = Identifier('push');
    
    fn.params.push(ObjectPattern([
        ObjectProperty(name, name, computed, shorthand),
    ]));
};

module.exports.traverse = ({push}) => {
    const check = checkArgs(push);
    
    return {
        'export const traverse = (__args) => __': check,
        'module.exports.traverse = (__args) => __': check,
    };
};

const checkArgs = (push) => (path) => {
    const fn = parseFn(path);
    
    if (fn.params.length)
        return;
    
    traverse(path, {
        'push(__)': () => {
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
