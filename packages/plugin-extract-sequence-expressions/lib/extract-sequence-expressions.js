'use strict';

const {
    types,
    operate,
} = require('putout');

const {replaceWithMultiple} = operate;

const {
    ExpressionStatement,
    ReturnStatement,
    BlockStatement,
    toStatement,
} = types;

module.exports.report = () => 'sequence expressions should not be used';

module.exports.fix = (path) => {
    const {parentPath} = path;
    
    if (parentPath.isArrowFunctionExpression()) {
        const {expressions} = parentPath.node.body;
        parentPath.node.body = createBlockStatement(expressions);
        return;
    }
    
    if (parentPath.isCallExpression() && parentPath.get('callee') === path) {
        const {expressions} = path.node;
        const {length} = expressions;
        const last = expressions[length - 1];
        
        parentPath.node.callee = last;
        return;
    }
    
    return replaceWithMultiple(path, path.node.expressions);
};

module.exports.traverse = ({push}) => {
    return {
        SequenceExpression(path) {
            if (path.parentPath.isForStatement())
                return;
            
            push(path);
        },
    };
};

function createBlockStatement(expressions) {
    const n = expressions.length;
    let i = 0;
    
    const list = [];
    for (; i < n - 1; i++) {
        const el = expressions[i];
        
        if (/identifier/i.test(el.type)) {
            list.push(ExpressionStatement(el));
            continue;
        }
        
        list.push(toStatement(el));
    }
    
    const last = expressions[i];
    list.push(ReturnStatement(last));
    
    return BlockStatement(list);
}

