'use strict';

const {
    isIdentifier,
    isObjectExpression,
    isObjectPattern,
    isTemplateLiteral,
    isAssignmentPattern,
} = require('putout').types;

const traverseObjectPattern = ({use, declare}) => {
    const traverseAssign = traverseAssignmentPattern({
        use,
    });
    
    return (propertiesPaths) => {
        for (const path of propertiesPaths) {
            if (path.isRestElement())
                continue;
            
            const {key, value} = path.node;
            const valuePath = path.get('value');
            
            switch(value.type) {
            case 'Identifier':
                declare(path, value.name);
                break;
            
            case 'AssignmentPattern':
                if (path.node.shorthand)
                    declare(path, key.name);
                else
                    declare(path, valuePath.node.left.name);
                
                traverseAssign(valuePath);
                break;
            }
        }
    };
};

module.exports.traverseObjectPattern = traverseObjectPattern;

const processObjectPattern = ({use, declare}) => (propertiesPaths) => {
    for (const path of propertiesPaths) {
        const {
            key,
            value,
            computed,
        } = path.node;
        
        if (computed && isIdentifier(key))
            use(path, key.name);
        
        if (isIdentifier(value)) {
            declare(path, value.name);
            continue;
        }
        
        if (isObjectPattern(value)) {
            const process = processObjectPattern({
                use,
                declare,
            });
            
            process(path.get('value.properties'));
            continue;
        }
        
        if (isAssignmentPattern(value)) {
            const useAssignment = traverseAssignmentPattern({
                use,
            });
            
            useAssignment(path.get('value.right'));
            
            const leftPath = path.get('value.left');
            
            switch(leftPath.type) {
            case 'Identifier':
                declare(path, leftPath.node.name);
                continue;
            }
        }
    }
};

module.exports.processObjectPattern = processObjectPattern;

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
            
            if (computed && isIdentifier(key))
                use(path, key.name);
            
            if (isIdentifier(value)) {
                use(path, value.name);
                continue;
            }
            
            if (isTemplateLiteral(value)) {
                traverseTmpl(path, value.expressions);
                continue;
            }
            
            if (isObjectExpression(value)) {
                const traverseObj = traverseObjectExpression(use);
                traverseObj(path.get('value.properties'));
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

const traverseAssignmentExpression = ({use, declare}) => {
    const traverseObjPattern = traverseObjectPattern({
        use,
        declare,
    });
    
    return (path) => {
        const leftPath = path.get('left');
        const rightPath = path.get('right');
        
        if (leftPath.isIdentifier()) {
            const {parentPath} = leftPath.parentPath;
            const {name} = leftPath.node;
            
            if (parentPath.isObjectProperty())
                declare(parentPath, name);
            
            if (parentPath.isFunction())
                declare(leftPath.parentPath, name);
        }
        
        if (rightPath.isIdentifier())
            use(rightPath, rightPath.node.name);
        
        if (leftPath.isObjectPattern())
            traverseObjPattern(leftPath.get('properties'));
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

const traverseAssignmentPattern = ({use}) => (path) => {
    const {node} = path;
    const {right} = node;
    
    if (isIdentifier(node))
        use(path.parentPath, node.name);
    
    if (isIdentifier(right))
        use(path, right.name);
};

module.exports.traverseAssignmentPattern = traverseAssignmentPattern;
