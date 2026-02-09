import putout, {operator} from 'putout';

const {hasParens, removeParens} = operator;

export const report = (path) => {
    const source = putout.print(path);
    
    if (path.isIdentifier()) {
        const code = source.slice(1, -1);
        return `Avoid useless parens: '(${source})' -> '(${code})'`;
    }
    
    return `Avoid useless parens: '((${source}))' -> '(${source})'`;
};

export const fix = (path) => {
    removeParens(path);
};

export const traverse = ({push}) => ({
    Function(path) {
        const params = path.get('params');
        
        for (const param of params) {
            if (hasParens(param))
                push(param);
        }
    },
});
