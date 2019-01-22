'use strict';

const {
    isIdentifier,
    isSpreadElement,
    isObjectExpression,
    isObjectPattern,
    isTemplateLiteral,
    isArrayExpression,
    isAssignmentPattern
} = require('putout').types;

const traverseObjectPattern = (use) => {
    return (propertiesPaths) => {
        for (const path of propertiesPaths) {
            const {
                key
            } = path.node;
            
            if (isIdentifier(key))
                use(path, key.name);
        }
    };
};

module.exports.traverseObjectPattern = traverseObjectPattern;

const traverseObjectExpression = (use) => {
    const traverseTmpl = traverseTemplateLiteral(use);
    
    return (propertiesPaths) => {
        for (const path of propertiesPaths) {
            const {node} = path;
            
            const {
                key,
                value,
                computed,
            } = node;
            
            if (computed && isIdentifier(key)) {
                use(path, key.name);
            }
            
            if (isIdentifier(value)) {
                use(path, value.name);
                continue;
            }
            
            if (isTemplateLiteral(value)) {
                traverseTmpl(path, value.expressions);
                continue;
            }
            
            if (isSpreadElement(node)) {
                use(path, node.argument.name);
                continue;
            }
            
            if (isObjectExpression(value)) {
                const traverseObj = traverseObjectExpression(use);
                traverseObj(path.get('value.properties'));
                continue;
            }
            
            if (isAssignmentPattern(value)) {
                const traverse = traverseAssignmentPattern(use);
                traverse(path.get('value'));
                continue;
            }
        }
    };
};

module.exports.traverseObjectExpression = traverseObjectExpression;

const traverseArrayExpression = (use) => {
    const traverseObjExpression = traverseObjectExpression(use);
    
    return (elementsPaths) => {
        for (const elementPath of elementsPaths) {
            const {node} = elementPath; 
            
            if (isObjectExpression(node))
                traverseObjExpression(elementPath.get('properties'));
        }
    };
};

module.exports.traverseArrayExpression = traverseArrayExpression;

const traverseAssignmentExpression = (use) => {
    const traverseObjPattern = traverseObjectPattern(use);
    const traverseObjExpression = traverseObjectExpression(use);
    const traverseTmpl = traverseTemplateLiteral(use);
    const traverseArray = traverseArrayExpression(use);
    
    return (path) => {
        const {node} = path;
        const {
            left,
            right,
        } = node;
        
        if (isIdentifier(left))
            use(path, left.name);
        else if (isObjectPattern(left))
            traverseObjPattern(path.get('left.properties'));
        
        if (isIdentifier(right))
            use(path, right.name);
        else if (isObjectExpression(right))
            traverseObjExpression(path.get('right.properties'));
        else if (isTemplateLiteral(right))
            traverseTmpl(path, right.expressions);
        else if (isArrayExpression(right))
            traverseArray(path.get('right.elements'));
    };
};

module.exports.traverseAssignmentExpression = traverseAssignmentExpression;

const traverseTemplateLiteral = (use) => (path, expressions) => {
    for (const exp of expressions) {
        if (isIdentifier(exp))
            use(path, exp.name);
    }
};

module.exports.traverseTemplateLiteral = traverseTemplateLiteral;

const traverseAssignmentPattern = (use) => {
    return (path) => {
        const {node} = path;
        const {
            right
        } = node;
        
        /*
        if (isIdentifier(left))
            declare(path, left.name);
            */
        
        if (isIdentifier(right))
            use(path, right.name);
    };
};

module.exports.traverseAssignmentPattern = traverseAssignmentPattern;

