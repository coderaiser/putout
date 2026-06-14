import {operator, types} from 'putout';

const {
    setLiteralValue,
    compare,
    __markdown,
} = operator;

const {isStringLiteral} = types;

export const report = () => 'Avoid trailing whitespaces';

export const match = () => ({
    '__a(__args)': ({__a, __args}, {parentPath}) => {
        if (!compare(parentPath.parentPath, __markdown))
            return false;
        
        if (!/h\d/.test(__a.name))
            return false;
        
        const last = __args.at(-1);
        
        if (!isStringLiteral(last))
            return false;
        
        const {value} = last;
        
        return value.endsWith(' ');
    },
});

export const replace = () => ({
    '__a(__args)': ({__args}, path) => {
        const last = __args.at(-1);
        const {value} = last;
        
        setLiteralValue(last, value.trimEnd());
        
        return path;
    },
});
