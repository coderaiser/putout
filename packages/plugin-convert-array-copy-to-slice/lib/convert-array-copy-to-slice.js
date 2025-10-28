import {types, operator} from 'putout';

const {
    isIdentifier,
    isCallExpression,
} = types;

const {compare} = operator;

export const report = () => `Copy array with '.slice()'`;

export const exclude = () => [
    '[...new Set(__a)]',
    'new Set([...__a])',
    '[...(__a ? __b : __c)]',
];

export const match = () => ({
    '[...__a]': ({__a}, path) => {
        if (isCallExpression(__a))
            return false;
        
        if (isIdentifier(__a)) {
            const binding = path.scope.getBinding(__a.name);
            
            if (!binding)
                return false;
            
            if (compare(binding.path, 'const __ = new Set(__)'))
                return false;
        }
        
        return true;
    },
});

export const replace = () => ({
    '[...__a]': '__a.slice()',
    '__a.map((a) => a)': '__a.slice()',
});
