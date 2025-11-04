import {operator} from 'putout';

const {
    compare,
    getBindingPath,
    extract,
} = operator;

const NAMES = {
    function: 'isFn',
    string: 'isString',
    number: 'isNumber',
    boolean: 'isBool',
    undefined: 'isUndefined',
    symbol: 'isSymbol',
    bigint: 'isBigInt',
    Object: 'isObject',
};

const EQUAL = 'typeof __a === "__b"';
const NOT_EQUAL = 'typeof __a !== "__b"';

const EQUAL_INSTANCE_OF = '__a instanceof __b';
const NOT_EQUAL_INSTANCE_OF = '!(__a instanceof __b)';

const EQUAL_UNDEFINED = '__a === undefined';
const NOT_EQUAL_UNDEFINED = '__a !== undefined';

const BODIES = {
    function: `typeof __a === 'function'`,
    string: `typeof __a === 'string'`,
    number: `typeof __a === 'number'`,
    boolean: `typeof __a === 'boolean'`,
    undefined: `typeof __a === 'undefined'`,
    symbol: `typeof __a === 'symbol'`,
    bigint: `typeof __a === 'bigint'`,
    error: `__a instanceof Error`,
    array: `__a instanceof Array`,
    object: `__a instanceof Object`,
    equalUndefined: '__a === undefined',
};

const NOT_BODIES = {
    function: `typeof __a !== 'function'`,
    string: `typeof __a !== 'string'`,
    number: `typeof __a !== 'number'`,
    boolean: `typeof __a !== 'boolean'`,
    undefined: `typeof __a !== 'undefined'`,
    symbol: `typeof __a !== 'symbol'`,
    bigint: `typeof __a !== 'bigint'`,
    error: `!(__a instanceof Error)`,
    array: `!(__a instanceof Array)`,
    object: `!(__a instanceof Object)`,
    equalUndefined: '__a !== undefined',
};

export const report = () => `Use function to check type instead of 'typeof' or 'instanceof'`;
export const match = () => ({
    [EQUAL]: check,
    [NOT_EQUAL]: check,
    
    [NOT_EQUAL_INSTANCE_OF]: check,
    [EQUAL_UNDEFINED]: check,
    [NOT_EQUAL_UNDEFINED]: check,
    [EQUAL_INSTANCE_OF]: check,
});

export const replace = () => ({
    [BODIES.function]: 'isFn(__a)',
    [BODIES.string]: 'isString(__a)',
    [BODIES.number]: 'isNumber(__a)',
    [BODIES.boolean]: 'isBool(__a)',
    [BODIES.undefined]: 'isUndefined(__a)',
    [BODIES.symbol]: 'isSymbol(__a)',
    [BODIES.bigint]: 'isBigInt(__a)',
    [BODIES.error]: 'isError(__a)',
    [BODIES.array]: 'isArray(__a)',
    [BODIES.object]: 'isObject(__a)',
    [BODIES.equalUndefined]: 'isUndefined(__a)',
    [NOT_BODIES.function]: '!isFn(__a)',
    [NOT_BODIES.string]: '!isString(__a)',
    [NOT_BODIES.number]: '!isNumber(__a)',
    [NOT_BODIES.boolean]: '!isBool(__a)',
    [NOT_BODIES.undefined]: '!isUndefined(__a)',
    [NOT_BODIES.symbol]: '!isSymbol(__a)',
    [NOT_BODIES.bigint]: '!isBigInt(__a)',
    [NOT_BODIES.error]: '!isError(__a)',
    [NOT_BODIES.array]: '!isArray(__a)',
    [NOT_BODIES.object]: '!isObject(__a)',
    [NOT_BODIES.equalUndefined]: '!isUndefined(__a)',
});

function check({__a, __b}, path) {
    if (path.parentPath.isFunction())
        return false;
    
    if (__b && isBind(path, extract(__b)))
        return false;
    
    return getBindingPath(path, __a);
}

function isBind(path, name) {
    const fnName = NAMES[name];
    const fnBody = BODIES[name];
    const bindingPath = getBindingPath(path, fnName);
    
    if (!bindingPath)
        return false;
    
    if (bindingPath.isVariableDeclarator()) {
        const initPath = bindingPath.get('init');
        
        if (!initPath.isFunction())
            return true;
        
        const {body} = initPath.node;
        
        return !compare(body, fnBody);
    }
    
    return bindingPath.isFunctionDeclaration();
}
