'use strict';

const {
    operator,
    types,
} = require('putout');

const {remove} = operator;

const {
    isIdentifier,
    isMemberExpression,
    isThisExpression,
    isAssignmentExpression,
} = types;

const {traverseClass} = require('../common');
const stateToHooks = require('./state-to-hooks');
const setStateToHooks = require('./set-state-to-hooks');

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
        AssignmentExpression: push,
        VariableDeclarator: VariableDeclarator(push),
        CallExpression: CallExpression(push),
    });
};

function VariableDeclarator(push) {
    return (path) => {
        if (!isVarFromState(path))
            return;
        
        push(path);
    };
}

function CallExpression(push) {
    return (path) => {
        if (!isThisSetState(path))
            return;
        
        push(path);
    };
}

function isVarFromState(path) {
    const {init} = path.node;
    
    if (!init)
        return false;
    
    if (isThisState(init))
        return true;
    
    return false;
}

function isThisState(init) {
    return isThis(init, 'state');
}

function isThisSetState({node}) {
    return isThis(node.callee, 'setState');
}

function isThis(init, name) {
    if (!isMemberExpression(init))
        return;
    
    const {
        object,
        property,
    } = init;
    
    return isThisExpression(object) && isIdentifier(property, {name});
}

