'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => `Merge variables`;

const getNode = (a) => a.node;

module.exports.fix = ({path, vars}) => {
    path.node.declarations = vars.map(getNode);
    
    for (const path of vars.slice(1)) {
        remove(path.parentPath);
    }
};

module.exports.traverse = ({push, uplist}) => ({
    VariableDeclarator: (path) => {
        if (path.parentPath.node.declarations.length !== 1)
            return;
        
        if (path.parentPath.node.kind === 'let')
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
