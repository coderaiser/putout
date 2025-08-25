import {operator, types} from 'putout';

const {
    isMemberExpression,
    isCallExpression,
} = types;

const {remove} = operator;
const getNode = (a) => a.node;
const maybeStartLine = (a) => a.node.loc?.start.line || 0;

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
        
        const initPath = path.get('init');
        
        if (initPath.isAwaitExpression())
            return;
        
        if (initPath.isNewExpression())
            return;
        
        if (initPath.isTemplateLiteral())
            return;
        
        if (path.parentPath.parentPath.isSwitchCase())
            return;
        
        if (path.parentPath.parentPath.isForOfStatement())
            return;
        
        uplist(path.scope.uid, path);
    },
    Program: {
        exit() {
            for (const allVars of uplist()) {
                if (allVars.length < 2)
                    continue;
                
                const [path, ...vars] = allVars;
                const {kind} = path.parentPath.node;
                const {bindings} = path.scope;
                const startLine = maybeStartLine(path);
                
                for (const [index, path] of vars.entries()) {
                    const {node} = path;
                    const {init} = node;
                    
                    if (isCallExpression(init) && isMemberExpression(init.callee)) {
                        const binding = bindings[init.callee.object.name];
                        
                        if (binding && startLine && startLine !== maybeStartLine(path) - index) {
                            vars.splice(index, 2);
                            continue;
                        }
                    }
                    
                    if (kind === 'const' && !node.init) {
                        vars.splice(index, 1);
                        continue;
                    }
                    
                    const prev = path.parentPath.getPrevSibling();
                    
                    if (!prev.isVariableDeclaration()) {
                        vars.splice(index, 1);
                        continue;
                    }
                }
                
                if (!vars.length)
                    continue;
                
                push({
                    path: path.parentPath,
                    vars: [path, ...vars],
                });
            }
        },
    },
});
