import {types} from 'putout';

const {
    identifier,
    callExpression,
    arrayExpression,
    isArrayExpression,
    isCallExpression,
} = types;

const call = (name, args = []) => callExpression(identifier(name), args);
const isCall = (name) => (node) => isCallExpression(node) && node.callee.name === name;

export const report = () => `Move body of trigger to function for PostgreSQL`;

export const include = () => [
    'createTrigger(__args)',
];

export const filter = (path) => {
    const body = path.node.arguments.at(-1);
    
    return isArrayExpression(body) && isArrayExpression(path.parent);
};

export const fix = (path) => {
    const [name, event, ...options] = path.node.arguments;
    const body = options.pop();
    const functionName = `${name.name}_fn`;
    const returned = event.callee.name.endsWith('Delete') ? 'returnOld' : 'returnNew';
    
    const ifNotExists = options.findIndex(isCall('ifNotExists'));
    const orReplace = ifNotExists === -1
        ? []
        : [
            call('orReplace'),
        ];
    
    const createFunction = call('createFunction', [
        identifier(functionName),
        call('returns', [
            identifier('trigger'),
        ]),
        call('language', [
            identifier('plpgsql'),
        ]),
        ...orReplace,
        arrayExpression([...body.elements, call(returned)]),
    ]);
    
    if (ifNotExists !== -1)
        options.splice(ifNotExists, 1, ...orReplace);
    
    if (!options.some(isCall('forEachRow')))
        options.splice(ifNotExists + 1, 0, call('forEachRow'));
    
    const createTrigger = call('createTrigger', [
        name,
        event,
        ...options,
        call('execute', [
            identifier(functionName),
        ]),
    ]);
    
    const {elements} = path.parent;
    
    elements.splice(elements.indexOf(path.node), 1, createFunction, createTrigger);
};
