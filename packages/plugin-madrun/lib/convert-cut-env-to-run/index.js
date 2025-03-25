import {types, operator} from 'putout';

const {isArrayExpression} = types;

const {
    getExportDefault,
    getProperty,
} = operator;

export const report = () => `Use 'run()' instead of 'cutEnv()'`;

export const replace = () => ({
    'cutEnv(__a)': 'run(__a)',
});

export const match = () => ({
    'cutEnv(__a)': ({__a}, path) => {
        const exportDefault = getExportDefault(path);
        
        if (!exportDefault)
            return false;
        
        const declarationPath = exportDefault.get('declaration');
        const property = getProperty(declarationPath, __a.value);
        
        if (!property)
            return false;
        
        const {body} = property.node.value;
        
        return !isArrayExpression(body);
    },
});
