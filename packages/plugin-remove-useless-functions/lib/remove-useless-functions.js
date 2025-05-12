import {types} from 'putout';

const {isIdentifier} = types;

const NAMES = [
    'filter',
    'find',
    'findIndex',
    'some',
    'every',
];

export const report = () => 'Avoid useless functions';

export const exclude = () => [
    '(__args__a) => __a.__b(__args__a)',
    '(__args__a) => {__a.__b(__args__a)}',
];

export const match = () => ({
    '(__a) => __a': (vars, path) => {
        const {parentPath} = path;
        
        if (!parentPath.isCallExpression())
            return false;
        
        const calleePath = parentPath.get('callee');
        
        if (!calleePath.isMemberExpression())
            return false;
        
        const {property} = calleePath.node;
        
        if (!isIdentifier(property))
            return false;
        
        if (calleePath.node.computed)
            return false;
        
        const {name} = property;
        
        return NAMES.includes(name);
    },
});

export const replace = () => ({
    '(__a) => Boolean(__a)': 'Boolean',
    '(__a) => __a': 'Boolean',
    '(__a) => __a !== undefined': 'Boolean',
    '(...__a) => __b(...__a)': '__b',
    '(...__a) => {__b(...__a)}': '__b',
    'async (__a, __b) => {return await __c(__a, __b);}': '__c',
});
