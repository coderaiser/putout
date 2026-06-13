import {operator} from 'putout';

const {superTraverse} = operator;

export const traverseClass = (traverse, ast, visitor) => {
    superTraverse(ast, {
        'class __ extends React.Component {}': push(visitor),
        'class __ extends Component {}': push(visitor),
    });
};

const push = (visitor) => (path) => {
    path.traverse(visitor);
};
