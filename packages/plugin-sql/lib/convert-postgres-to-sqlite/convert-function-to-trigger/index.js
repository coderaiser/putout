import {types} from 'putout';

const {
    identifier,
    callExpression,
    cloneNode,
    arrayExpression,
    isArrayExpression,
    isCallExpression,
} = types;

const isCall = (name) => (node) => isCallExpression(node) && node.callee.name === name;
const isReturn = ({callee}) => /^return(Old|New|Null)$/.test(callee.name);

const isFunction = (name) => (node) => {
    if (!isCall('createFunction')(node))
        return false;
    
    return node.arguments[0].name === name && isArrayExpression(node.arguments.at(-1));
};

const isExecute = (name) => (node) => {
    if (!isCall('createTrigger')(node))
        return false;
    
    const last = node.arguments.at(-1);
    
    return isCall('execute')(last) && last.arguments[0].name === name;
};

const findFunction = (path) => {
    if (!isArrayExpression(path.parent))
        return null;
    
    const execute = path.node.arguments.at(-1);
    
    if (!isCall('execute')(execute))
        return null;
    
    const [name] = execute.arguments;
    
    return path.parent.elements.find(isFunction(name.name));
};

export const report = () => `Move body of function to trigger for SQLite`;

export const include = () => [
    'createTrigger(__args)',
];

export const filter = (path) => Boolean(findFunction(path));

export const fix = (path) => {
    const {node, parent} = path;
    const createFunction = findFunction(path);
    const [name] = createFunction.arguments;
    const {elements} = parent;
    
    const body = createFunction.arguments
        .at(-1)
        .elements
        .filter((node) => !isReturn(node))
        .map((node) => cloneNode(node, true));
    
    const {arguments: args} = node;
    const orReplace = args.findIndex(isCall('orReplace'));
    
    args.splice(-1, 1, arrayExpression(body));
    
    if (orReplace !== -1)
        args.splice(orReplace, 1, callExpression(identifier('ifNotExists'), []));
    
    if (elements.some(isExecute(name.name)))
        return;
    
    elements.splice(elements.indexOf(createFunction), 1);
};
