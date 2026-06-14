import {operator, types} from 'putout';

const {isStringLiteral} = types;

const {
    setLiteralValue,
    __markdown,
    traverse: superTraverse,
} = operator;

export const report = () => `Merge heading spaces`;

export const fix = (path) => {
    const value = path.node.value.replace('  ', ' ');
    setLiteralValue(path, value);
};
export const traverse = ({push}) => {
    const merge = mergeHeadingSpace(push);
    
    return {
        [__markdown]: (path) => {
            superTraverse(path, {
                'heading(__a, __b)': merge,
            });
        },
    };
};

const mergeHeadingSpace = (push) => (path) => {
    const arg = path.get('arguments.1');
    
    if (!isStringLiteral(arg))
        return;
    
    const {value} = arg.node;
    
    if (value.includes('  '))
        push(arg);
};
