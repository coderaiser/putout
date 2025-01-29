'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;
const {
    isLabeledStatement,
    ReturnStatement,
} = types;

module.exports.report = () => `Use 'break' instead of 'return'`;

module.exports.fix = (path) => {
    replaceWith(path, ReturnStatement());
};

module.exports.traverse = ({push}) => ({
    BreakStatement(path) {
        if (path.node.label) {
            const {name} = path.node.label;
            
            const labeledPath = path.find(isLabeledStatement);
            
            if (labeledPath && name === labeledPath.node.label.name)
                return;
        }
        
        const upperPath = path.find(isUpperScope);
        
        if (upperPath.isLoop())
            return;
        
        if (upperPath.isSwitchStatement())
            return;
        
        push(path);
    },
});

const isUpperScope = (path) => {
    if (path.isLoop())
        return true;
    
    if (path.isProgram())
        return true;
    
    if (path.isSwitchStatement())
        return true;
    
    return path.isFunction();
};
