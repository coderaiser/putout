import {types, operator} from 'putout';

const {isIdentifier} = types;
const {replaceWith} = operator;

export const report = () => `Avoid useless for-of`;

export const match = () => ({
    'for (const __identifier__a of __identifier__b) __c': ({__identifier__a}, path) => {
        const {name} = __identifier__a;
        const {references} = path.scope.bindings[name];
        
        return !references;
    },
    'for (const __a of __array) __c': ({__a, __array}, path) => {
        if (__array.elements.length >= 2)
            return false;
        
        if (!isIdentifier(__a))
            return false;
        
        const {name} = __a;
        const {references} = path.scope.bindings[name];
        
        return !(references >= 2);
    },
});

export const replace = () => ({
    'for (const __identifier__a of __identifier__b) __c': '__c',
    'for (const __a of __array) __c': ({__a, __c, __array}, path) => {
        const {elements} = __array;
        
        if (!elements.length)
            return null;
        
        const {name} = __a;
        
        const {references, referencePaths} = path.scope.bindings[name];
        
        if (!references)
            return replaceWith(path, __c);
        
        const [el] = elements;
        const [refPath] = referencePaths;
        
        replaceWith(refPath, el);
        replaceWith(path, __c);
        
        return path;
    },
});
