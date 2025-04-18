import {operator, types} from 'putout';

const {isReturnStatement} = types;
const {replaceWith} = operator;

export const report = ({name}) => `Label '${name}' is defined but never used`;

export const fix = ({path}) => {
    replaceWith(path, path.node.body);
};

export const traverse = ({push}) => ({
    LabeledStatement(path) {
        const {label} = path.node;
        const {name} = label;
        
        if (isPrevReturnWithoutArg(path))
            return;
        
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
    
    path.traverse({
        ContinueStatement: checkLabel,
        BreakStatement: checkLabel,
    });
    
    return used;
}

function isPrevReturnWithoutArg({parentPath}) {
    const retPath = parentPath.getPrevSibling();
    
    if (!isReturnStatement(retPath))
        return false;
    
    return !retPath.node.argument;
}
