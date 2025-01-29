'use strict';

const {types, operator} = require('putout');
const {
    isLabeledStatement,
    ReturnStatement,
} = types;

const {replaceWith} = operator;

module.exports.report = () => `Use 'return' instead of 'continue'`;

module.exports.fix = (path) => {
    replaceWith(path, ReturnStatement());
};

module.exports.traverse = ({push}) => ({
    ContinueStatement(path) {
        if (path.node.label) {
            const {name} = path.node.label;
            const labeledPath = path.find(isLabeledStatement);
            
            if (labeledPath && name === labeledPath.node.label.name)
                return;
        }
        
        const upperPath = path.find(isUpperScope);
        
        if (upperPath.isLoop())
            return;
        
        push(path);
    },
});

const isUpperScope = (path) => {
    if (path.isProgram())
        return true;
    
    if (path.isLoop())
        return true;
    
    return path.isFunction();
};
