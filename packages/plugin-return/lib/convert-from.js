import {types, operator} from 'putout';

const {
    replaceWith,
    createTypeChecker,
} = operator;

const {
    isLabeledStatement,
    isFunction,
    isLoop,
    returnStatement,
} = types;

const isBreakTarget = createTypeChecker([
    ['+', isLoop],
    ['+: -> SwitchStatement'],
]);

const isBoundary = createTypeChecker([
    ['+', isLoop],
    ['+', isFunction],
    ['+: -> Program'],
    ['+: -> SwitchStatement'],
]);

const createReport = (name) => () => `Use 'return' instead of '${name}'`;

const fix = (path) => {
    replaceWith(path, returnStatement());
};

export const convertFrom = (name) => {
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
        
        const boundaryPath = path.find(isBoundary);
        
        if (isBreakTarget(boundaryPath))
            return;
        
        push(path);
    },
});
