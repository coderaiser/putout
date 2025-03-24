import {operator, types} from 'putout';
import {traverseClass} from '../common.js';
import stateToHooks from './state-to-hooks.js';
import setStateToHooks from './set-state-to-hooks.js';

const {
    isIdentifier,
    isMemberExpression,
    isThisExpression,
    isAssignmentExpression,
} = types;

const {remove} = operator;

export const report = (path) => {
    if (isAssignmentExpression(path))
        return 'hooks should be used instead of this.state';
    
    if (isVarFromState(path))
        return 'hooks should be used instead of this.state';
    
    return 'hooks should be used instead of this.setState';
};

export const fix = (path) => {
    if (isAssignmentExpression(path))
        return stateToHooks(path);
    
    if (isVarFromState(path))
        return remove(path);
    
    return setStateToHooks(path);
};

export const find = (ast, {push, traverse}) => {
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
        VariableDeclarator: checkVar(push),
        CallExpression: checkCall(push),
    });
};

const checkVar = (push) => (path) => {
    if (!isVarFromState(path))
        return;
    
    push(path);
};

const checkCall = (push) => (path) => {
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
