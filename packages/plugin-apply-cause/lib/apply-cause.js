import {types} from 'putout';

const {isCatchClause} = types;

export const report = () => `Add missing cause`;

export const match = () => ({
    'throw Error(__a)': (vars, path) => {
        const catchNode = path.find(isCatchClause);
        
        if (!catchNode)
            return false;
        
        const {param} = catchNode.node;
        
        return param;
    },
});

export const replace = () => ({
    'throw Error(__a)': () => {
        return `throw Error(__a, {
            cause: param
        });`;
    },
});
