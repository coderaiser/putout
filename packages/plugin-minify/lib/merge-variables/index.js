import {operator} from 'putout';

const {remove} = operator;
const getNode = (a) => a.node;

export const report = () => `Merge variables`;

export const fix = ({path, vars}) => {
    path.node.declarations = vars.map(getNode);
    
    for (const path of vars.slice(1)) {
        remove(path.parentPath);
    }
};

export const traverse = ({push, uplist}) => ({
    VariableDeclarator: (path) => {
        if (path.parentPath.node.declarations.length !== 1)
            return;
        
        if (path.parentPath.node.kind === 'let')
            return;
        
        const initPath = path.get('init');
        
        if (initPath.isAwaitExpression())
            return;
        
        if (initPath.isNewExpression())
            return;
        
        if (initPath.isTemplateLiteral())
            return;
        
        if (path.parentPath.parentPath.isSwitchCase())
            return;
        
        uplist(path.scope.uid, path);
    },
    Program: {
        exit() {
            for (const vars of uplist()) {
                if (vars.length < 2)
                    continue;
                
                const [path] = vars;
                
                const prev = path.parentPath.getPrevSibling();
                
                if (prev.node && !prev.isVariableDeclaration())
                    continue;
                
                if (path.parentPath.node.kind === 'const')
                    for (const [index, {node}] of vars.entries()) {
                        if (!node.init)
                            vars.splice(index, 1);
                    }
                
                push({
                    path: path.parentPath,
                    vars,
                });
            }
        },
    },
});
