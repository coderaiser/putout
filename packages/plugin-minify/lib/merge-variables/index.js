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
        
        if (path.get('init').isAwaitExpression())
            return;
        
        if (path.get('init').isNewExpression())
            return;
        
        uplist(path.scope.uid, path);
    },
    Program: {
        exit() {
            for (const vars of uplist()) {
                if (vars.length < 2)
                    continue;
                
                const [path] = vars;
                
                push({
                    path: path.parentPath,
                    vars,
                });
            }
        },
    },
});
