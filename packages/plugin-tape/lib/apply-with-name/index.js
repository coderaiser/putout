'use strict';

const {template, operator} = require('putout');

const {replaceWith} = operator;

module.exports.report = () => `'stub().withName()' should be used`;

module.exports.match = () => ({
    't.calledBefore(__a, __b)': checkStubs,
    't.calledAfter(__a, __b)': checkStubs,
    't.calledInOrder(__array)': checkStubsArray,
});

module.exports.replace = () => ({
    't.calledBefore(__a, __b)': applyWithName,
    't.calledAfter(__a, __b)': applyWithName,
    't.calledInOrder(__array)': applyWithNameToArray,
});

function checkStubs({__a, __b}, path) {
    const elements = [__a, __b];
    
    const __array = {
        elements,
    };
    
    return checkStubsArray({__array}, path);
}

function applyWithName({__a, __b}, path) {
    applyWithNameToNode(__a, path);
    applyWithNameToNode(__b, path);
    
    return path;
}

function checkStubsArray({__array}, path) {
    for (const stub of __array.elements) {
        if (checkStub(stub, path))
            return true;
    }
    
    return false;
}

function applyWithNameToArray({__array}, path) {
    for (const stub of __array.elements) {
        applyWithNameToNode(stub, path);
    }
    
    return path;
}

function checkStub(node, path) {
    const {bindings} = path.scope;
    const {name} = node;
    const binding = bindings[name];
    
    if (!binding)
        return false;
    
    const initPath = binding.path.get('init');
    const calleePath = initPath.get('callee');
    const str = initPath.toString();
    
    return !(calleePath.isMemberExpression() && str.includes('withName'));
}

function applyWithNameToNode(node, path) {
    const {bindings} = path.scope;
    const {name} = node;
    const binding = bindings[name];
    
    if (!binding)
        return;
    
    const initPath = binding.path.get('init');
    const calleePath = initPath.get('callee');
    const str = initPath.toString();
    
    if (calleePath.isMemberExpression() && !str.includes('withName')) {
        replaceWith(initPath, template.ast(`${initPath}.withName('${name}')`));
        return;
    }
    
    replaceWith(initPath, template.ast(`stub().withName('${name}')`));
}
