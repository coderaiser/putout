'use strict';

const {
    types,
    operate,
} = require('putout');

const {replaceWith} = operate;

const {
    isIdentifier,
    isVariableDeclarator,
    isCallExpression,
    isLiteral,
    stringLiteral,
} = types;

module.exports.report = (path) => {
    const {node} = path;
    const {
        id,
        callee,
    } = node;
    
    if (isTryTo(id))
        return '"tryTo" should not be declared';
    
    if (isTryToTape(id))
        return '"tryToTape" should not be declared';
    
    if (isCallExpression(node) && isTryTo(callee))
        return 'tryTo should not be called';
    
    if (isCallExpression(node) && isTryToTape(callee))
        return 'tryToTape should not be called';
    
    const [arg] = node.arguments;
    
    if (isRequire(callee) && isTape(arg))
        return '"supertape" should be used instead of "tape"';
};

module.exports.fix = (path) => {
    const {node} = path;
    const {
        id,
        callee,
    } = node;
    
    if (isVariableDeclarator(node) && isTryTo(id))
        return path.remove();
    
    if (isVariableDeclarator(node) && isTryToTape(id))
        return path.remove();
    
    if (isCallExpression(node) && isTryTo(callee)) {
        const [argument] = node.arguments;
        replaceWith(path, argument);
        return;
    }
    
    if (isCallExpression(node) && isTryToTape(callee)) {
        const [argument] = node.arguments;
        replaceWith(path, argument);
        return;
    }
    
    const [argPath] = path.get('arguments');
    
    if (isRequire(callee) && isTape(argPath.node)) {
        replaceWith(argPath, stringLiteral('supertape'));
        return;
    }
};

module.exports.find = (ast, {traverse}) => {
    const places = [];
    
    traverse(ast, {
        VariableDeclarator(path) {
            const {node} = path;
            const {id} = node;
            
            if (isTryTo(id)) {
                places.push(path);
                return;
            }
            
            if (isTryToTape(id)) {
                places.push(path);
                return;
            }
        },
        
        CallExpression(path) {
            const {node} = path;
            const {callee} = node;
            
            if (isTryTo(callee)) {
                places.push(path);
                return;
            }
            
            if (isTryToTape(callee)) {
                places.push(path);
                return;
            }
            
            const [argument] = node.arguments;
            
            if (isRequire(callee) && isTape(argument)) {
                places.push(path);
                return;
            }
        },
    });
    
    return places;
};

function isTryTo(node) {
    return isIdentifier(node, {
        name: 'tryTo',
    });
}

function isTryToTape(node) {
    return isIdentifier(node, {
        name: 'tryToTape',
    });
}

function isRequire(node) {
    return isIdentifier(node, {
        name: 'require',
    });
}

function isTape(node) {
    return isLiteral(node, {
        value: 'tape',
    });
}

