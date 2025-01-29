'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;
const {
    isLabeledStatement,
    ReturnStatement,
} = types;

const createReport = (name) => () => `Use 'return' instead of '${name}'`;

const fix = (path) => {
    replaceWith(path, ReturnStatement());
};

module.exports.convertFrom = (name) => {
    const visitor = name[0].toUpperCase() + name.slice(1) + `Statement`;
    
    return {
        fix,
        report: createReport(name),
        traverse: createTraverse(visitor),
    };
};

const createTraverse = (visitor) => ({push}) => ({
    [visitor](path) {
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
