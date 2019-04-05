'use strict';

const {
    isIdentifier,
    isMemberExpression,
    isThisExpression,
    isObjectExpression,
    isAssignmentExpression,
} = require('putout').types;

const {traverseClass} = require('../common');
const stateToHooks = require('./state-to-hooks');
const setStateToHooks = require('./set-state-to-hooks');

module.exports.report = (chunk) => {
    if (isAssignmentExpression(chunk))
        return 'hooks should be used instead of this.state';
    
    if (isVarFromState(chunk))
        return 'hooks should be used instead of this.state';
    
    if (isThisSetState(chunk))
        return 'hooks should be used instead of this.setState';
};

module.exports.fix = (chunk) => {
    if (isAssignmentExpression(chunk))
        return stateToHooks(chunk);
    
    if (isVarFromState(chunk))
        return chunk.remove();
    
    if (isThisSetState(chunk))
        return setStateToHooks(chunk);
};

module.exports.find = (ast, {push}) => {
    traverseClass(ast, {
        AssignmentExpression: AssignmentExpression(push),
        VariableDeclarator: VariableDeclarator(push),
        CallExpression: CallExpression(push),
    });
};

function VariableDeclarator(push) {
    return (chunk) => {
        if (!isVarFromState(chunk))
            return;
        
        push(chunk);
    };
}

function AssignmentExpression(push) {
    return (chunk) => {
        if (!isInitState(chunk))
            return;
        
        push(chunk);
    };
}

function CallExpression(push) {
    return (chunk) => {
        if (!isThisSetState(chunk))
            return;
        
        push(chunk);
    };
}

function isInitState(chunk) {
    const {node} = chunk;
    const {
        left,
        right,
    } = node;
    
    if (!isMemberExpression(left))
        return false;
    
    if (!isThisState(left))
        return false;
    
    if (!isObjectExpression(right))
        return false;
    
    return true;
}

function isVarFromState(chunk) {
    const {init} = chunk.node;
    
    if (!init)
        return false;
    
    if (isThisState(init))
        return true;
    
    if (isThisState(init.object))
        return true;
    
    return false;
}

function isThisState(init) {
    return isThis(init, 'state');
}

function isThisSetState(chunk) {
    const {node} = chunk;
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

