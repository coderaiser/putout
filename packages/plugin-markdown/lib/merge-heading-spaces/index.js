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
                'h1(__a)': merge,
                'h2(__a)': merge,
                'h3(__a)': merge,
                'h4(__a)': merge,
                'h5(__a)': merge,
                'h6(__a)': merge,
            });
        },
    };
};

const mergeHeadingSpace = (push) => (path) => {
    const arg = path.get('arguments.0');
    
    if (!isStringLiteral(arg))
        return;
    
    const {value} = arg.node;
    
    if (value.includes('  '))
        push(arg);
};
