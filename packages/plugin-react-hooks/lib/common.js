'use strict';

module.exports.traverseClass = (traverse, ast, visitor) => {
    traverse(ast, {
        'class __ extends React.Component {}': push(visitor),
        'class __ extends Component {}': push(visitor),
    });
};

const push = (visitor) => (path) => {
    path.traverse(visitor);
};
