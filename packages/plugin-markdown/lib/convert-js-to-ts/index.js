import {parse, operator} from 'putout';

const {
    setLiteralValue,
    __markdown,
    compare,
} = operator;

export const report = () => `Use a 'ts' instead of 'js' fence for TypeScript`;

export const match = () => ({
    'codeblock(__args)': ({__args}, {parentPath}) => {
        if (!compare(parentPath.parentPath, __markdown))
            return false;
        
        const [lang, source] = __args;
        
        return lang.value === 'js' && isTypeScript(source.value);
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

function tryCatch(fn, ...a) {
    try {
        return [null, fn(...a)];
    } catch(e) {
        return [e];
    }
}

const isTypeScript = (source) => isClean(source, {
    isTS: true,
}) && !isClean(source);
