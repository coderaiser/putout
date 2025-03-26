import {operator} from 'putout';

const {setLiteralValue} = operator;

export const report = ({value}) => value;
export const fix = ({path}, {options}) => {
    const {from, to} = options;
    const {value} = path.node.source;
    
    setLiteralValue(path.node.source, value.replace(from, to));
};

export const traverse = ({push, options}) => ({
    ImportDeclaration(path) {
        const {value} = path.node.source;
        const {from} = options;
        
        if (!RegExp(`${from}$`).test(value))
            return;
        
        push({
            path,
            value,
        });
    },
});
