import {operator} from 'putout';

const {
    getExportDefault,
    getProperty,
} = operator;

export const report = () => `Call 'await cutEnv(script)' instead of 'script'`;

export const replace = () => ({
    '[__a, __b]': '[__a, cutEnv(__b)]',
});

export const match = () => ({
    '[__a, __b]': ({__b}, path) => {
        const exportDefault = getExportDefault(path);
        
        if (!exportDefault)
            return false;
        
        if (path.parentPath.isCallExpression())
            return false;
        
        const declarationPath = exportDefault.get('declaration');
        const property = getProperty(declarationPath, __b.value);
        
        return Boolean(property);
    },
});
