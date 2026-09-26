import {parse, operator} from 'putout';
import {tryCatch} from 'try-catch';

const {
    setLiteralValue,
    __markdown,
    compare,
    extract,
} = operator;

export const report = () => `Use 'ts' instead of 'js' fence for TypeScript`;

export const match = () => ({
    'codeblock(__args)': ({__args}, {parentPath}) => {
        if (!compare(parentPath.parentPath, __markdown))
            return false;
        
        const [lang, source] = __args;
        
        return lang.value === 'js' && isTypeScript(extract(source));
    },
});

export const replace = () => ({
    'codeblock(__args)': ({__args}, path) => {
        const [lang] = __args;
        
        setLiteralValue(lang, 'ts');
        
        return path;
    },
});

const isClean = (source, options) => {
    const [error, ast] = tryCatch(parse, source, options);
    return !error && !ast.errors.length;
};

const isTypeScript = (source) => isClean(source, {
    isTS: true,
}) && !isClean(source);
