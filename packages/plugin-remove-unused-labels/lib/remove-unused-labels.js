'use strict';

const {operator} = require('putout');
const {traverse, replaceWith} = operator;

module.exports.report = ({name}) => `Label '${name}' is defined but never used`;

module.exports.fix = ({path}) => {
    replaceWith(path, path.node.body);
};

module.exports.traverse = ({push}) => ({
    LabeledStatement(path) {
        const {label} = path.node;
        const {name} = label;
        
        if (!usedLabel({path, name}))
            push({
                path,
                name,
            });
    },
});

function usedLabel({path, name}) {
    let used = false;
    
    const checkLabel = (currentPath) => {
        const {label} = currentPath.node;
        
        if (!label)
            return;
        
        if (name !== label.name)
            return;
        
        used = true;
        currentPath.stop();
    };
    
    traverse(path, {
        ContinueStatement: checkLabel,
        BreakStatement: checkLabel,
    });
    
    return used;
}
