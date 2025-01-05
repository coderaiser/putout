'use strict';

const {operator, types} = require('putout');

const {traverseClass} = require('../common');

const stateToHooks = require('./state-to-hooks');
const setStateToHooks = require('./set-state-to-hooks');

const {
    isIdentifier,
    isMemberExpression,
    isThisExpression,
    isAssignmentExpression,
} = types;

const {remove} = operator;

module.exports.report = (path) => {
    if (isAssignmentExpression(path))
        return 'hooks should be used instead of this.state';
    
    if (isVarFromState(path))
        return 'hooks should be used instead of this.state';
    
    return 'hooks should be used instead of this.setState';
};

module.exports.fix = (path) => {
    if (isAssignmentExpression(path))
        return stateToHooks(path);
    
    if (isVarFromState(path))
        return remove(path);
    
    return setStateToHooks(path);
};

module.exports.find = (ast, {push, traverse}) => {
    traverseClass(traverse, ast, {
        AssignmentExpression: (path) => {
            if (!path.get('left').isMemberExpression())
                return;
            
            const {right} = path.node;
            
            if (!right.properties)
                return;
            
            for (const {shorthand} of right.properties) {
                if (shorthand)
                    return;
            }
            
            push(path);
        },
        VariableDeclarator: VariableDeclarator(push),
        CallExpression: CallExpression(push),
    });
};

const VariableDeclarator = (push) => (path) => {
    if (!isVarFromState(path))
        return;
    
    push(path);
};

const CallExpression = (push) => (path) => {
    if (!isThisSetState(path))
        return;
    
    push(path);
};

function isVarFromState(path) {
    const {init} = path.node;
    
    if (!init)
        return false;
    
    return isThisState(init);
}

const isThisState = (init) => isThis(init, 'state');

function isThisSetState({node}) {
    return isThis(node.callee, 'setState');
}

function isThis(init, name) {
    if (!isMemberExpression(init))
        return;
    
    const {object, property} = init;
    
    return isThisExpression(object) && isIdentifier(property, {
        name,
    });
}
