'use strict';

const {
    operate,
    types,
} = require('putout');

const {replaceWith} = operate;

const {
    AssignmentPattern,
    VariableDeclarator,
    ObjectPattern,
    ObjectProperty,
    isMemberExpression,
    isIdentifier,
    isLogicalExpression,
} = types;

module.exports.report = () => 'Object destructuring should be used';

module.exports.traverse = ({push}) => {
    return {
        VariableDeclarator(path) {
            const {node} = path;
            const {
                id,
                init,
            } = node;
            
            if (isSameName(id, init))
                return push(path);
            
            const operator = '||';
            
            if (isLogicalExpression(init, {operator}) && isSameName(id, init.left))
                return push(path);
        },
    };
};

module.exports.fix = (path) => {
    const {node} = path;
    
    const {
        id,
        init,
    } = node;
    
    const computed = false;
    const shorthand = true;
    
    if (isMemberExpression(init)) {
        const property = ObjectProperty(id, id, computed, shorthand);
        const pattern = ObjectPattern([
            property,
        ]);
        
        return replaceWith(path, VariableDeclarator(pattern, init.object));
    }
    
    const assignment = AssignmentPattern(id, init.right);
    const property = ObjectProperty(id, assignment, computed, shorthand);
    
    const object = ObjectPattern([
        property,
    ]);
    
    replaceWith(path, VariableDeclarator(object, init.left.object));
};

function isSameName(id, init) {
    if (!isMemberExpression(init))
        return false;
    
    if (!isIdentifier(id))
        return false;
    
    const {name} = id;
    
    if (!isIdentifier(init.property, {name}))
        return false;
    
    return true;
}

