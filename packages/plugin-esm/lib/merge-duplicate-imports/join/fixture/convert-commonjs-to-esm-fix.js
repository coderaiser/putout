import {operator} from 'putout';

const {replaceWith} = operator;
{
    import {operator} from 'putout';

    const {replaceWith} = operator;
}
export const fix = ({path, leftPath, rightPath, operator}) => {
    const leftNode = leftPath.node;
    const rightNode = rightPath.node;
    
    replaceWith(rightPath, leftNode);
};
