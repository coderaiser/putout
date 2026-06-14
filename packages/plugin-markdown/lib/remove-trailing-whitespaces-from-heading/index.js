import {operator, types} from 'putout';

const {
    setLiteralValue,
    compare,
    __markdown,
} = operator;

const {isStringLiteral} = types;

export const report = () => 'Avoid trailing whitespaces';

export const match = () => ({
    'heading(__args)': ({__args}, {parentPath}) => {
        if (!compare(parentPath.parentPath, __markdown))
            return false;
        
        const last = __args.at(-1);
        
        if (!isStringLiteral(last))
            return false;
        
        const {value} = last;
        
        return value.endsWith(' ');
    },
});

export const replace = () => ({
    'heading(__args)': ({__args}, path) => {
        const last = __args.at(-1);
        const {value} = last;
        
        setLiteralValue(last, value.trimEnd());
        
        return path;
    },
});
