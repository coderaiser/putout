import {types, operator} from 'putout';

const {compare} = operator;
const {logicalExpression} = types;

export const report = () => `Merge 'if' with 'else' when the body is the same`;

export const fix = (path) => {
    const {test: testFirst, alternate} = path.node;
    const {test: testSecond} = alternate;
    
    path.node.test = logicalExpression('||', testFirst, testSecond);
    delete path.node.alternate;
};
export const traverse = ({push}) => ({
    IfStatement: (path) => {
        if (!path.node.alternate)
            return;
        
        if (!compare(path.node.consequent, path.node.alternate.consequent))
            return;
        
        push(path);
    },
});
