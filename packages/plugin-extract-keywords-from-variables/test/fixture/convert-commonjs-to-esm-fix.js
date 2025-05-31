import {operator} from 'putout';

const {replaceWith} = operator;

export const report = ({}) => {
    return `Swap`;
};

{}
export const fix = ({leftPath, rightPath}) => {
    const rightNode = rightPath.node;
    
    replaceWith(leftPath, rightNode);
};
