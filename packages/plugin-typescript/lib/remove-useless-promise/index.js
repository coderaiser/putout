import {operator} from 'putout';

const {replaceWith, contains} = operator;

export const report = () => `Avoid useless 'Promise' type`;

export const match = () => ({
    'function __a(): Promise<__b> {}': (vars, path) => !contains(path, ['throw __', 'await __', 'for await (__ of __) __']),
});

export const replace = () => ({
    'function __a(): Promise<__b> {}': ({__b}, path) => {
        replaceWith(path.get('returnType.typeAnnotation'), __b);
        
        return path;
    },
});
