import {template, operator} from 'putout';
import {getLogical} from '../get-logical.js';

const {replaceWith} = operator;

export const report = () => `Use Logical Expression ('a && a.b = c') instead of Optional Chaining ('a?.b = c')`;

export const fix = (path) => {
    const logical = getLogical(path, {
        assign: true,
    });
    
    const logicalNode = template.ast.fresh(logical);
    
    logicalNode.right.right = path.parentPath.node.right;
    replaceWith(path.parentPath, logicalNode);
};

export const traverse = ({push, listStore}) => ({
    'OptionalMemberExpression|OptionalCallExpression'(path) {
        if (!path.parentPath.isAssignmentExpression())
            return;
        
        const rightPath = path.parentPath.get('right');
        
        if (path === rightPath)
            return;
        
        listStore(path);
    },
    Program: {
        exit() {
            for (const path of listStore().reverse())
                push(path);
        },
    },
});
