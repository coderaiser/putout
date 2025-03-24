import {types} from 'putout';

const {
    isCallExpression,
    isTemplateLiteral,
} = types;

export const report = () => `Add missing quotes to watcher`;

export const match = () => ({
    'await run("test")': (vars, {parentPath}) => {
        if (isTemplateLiteral(parentPath)) {
            const {quasis} = parentPath.node;
            const [one, two] = quasis;
            
            if (one.value.raw.startsWith('c8'))
                return false;
            
            const endsWithQuote = one.value.raw.endsWith('"');
            const startsWithQuote = two.value.raw.startsWith('"');
            
            return !endsWithQuote && !startsWithQuote;
        }
        
        return isCallExpression(parentPath);
    },
});

export const replace = () => ({
    'await run("test")': (vars, path) => {
        const {parentPath} = path;
        
        if (isTemplateLiteral(parentPath)) {
            const {quasis} = parentPath.node;
            const [one, two] = quasis;
            
            one.value.raw += '"';
            two.value.raw = '"' + two.value.raw;
            
            return path;
        }
        
        return '`"${await run("test")}"`';
    },
});
