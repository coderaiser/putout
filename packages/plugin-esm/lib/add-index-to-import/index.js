import {extname} from 'node:path';
import {operator} from 'putout';

const {setLiteralValue} = operator;

export const report = (path) => {
    const {value} = path.node.source;
    return `Add 'index.js' to import: '${value}' -> '${value}/index.js'`;
};

export const fix = (path) => {
    const {source} = path.node;
    const {value} = source;
    
    setLiteralValue(source, `${value}/index.js`);
};

export const traverse = ({push}) => ({
    ImportDeclaration: (path) => {
        const {value} = path.node.source;
        const ext = extname(value);
        
        if (ext)
            return;
        
        if (!value.startsWith('.'))
            return;
        
        push(path);
    },
});
