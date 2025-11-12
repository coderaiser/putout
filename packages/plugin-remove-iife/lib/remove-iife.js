import {types, operator} from 'putout';

const {replaceWithMultiple} = operator;
const {isReturnStatement} = types;

export const report = () => 'Avoid IIFE';

export const filter = (path) => {
    const {parentPath} = path;
    
    if (parentPath.isJSXExpressionContainer())
        return false;
    
    const {callee} = path.node;
    const {body} = callee.body;
    
    if (!body)
        return true;
    
    if (path.parentPath.isSequenceExpression())
        return false;
    
    if (path.parentPath.isVariableDeclarator())
        return false;
    
    const n = body.length;
    const latest = body[n - 1];
    
    return !isReturnStatement(latest);
};

export const replace = () => ({
    '((__args__a) => __f(__args__a))(__args__b)': '__f(__args__b)',
    '(() => __body)()': '__body',
    '(function() {})()': (vars, path) => {
        const {body} = path.node.callee.body;
        
        replaceWithMultiple(path.parentPath, body);
        
        return '';
    },
});
