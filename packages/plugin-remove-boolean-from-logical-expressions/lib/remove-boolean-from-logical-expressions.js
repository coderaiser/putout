'use strict';

const isTrue = (path) => path.isBooleanLiteral({
    value: true,
});

module.exports.report = () => '"true" has no sense in logical expressions';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        LogicalExpression(path) {
            const left = path.get('left');
            const right = path.get('right');
            const {operator} = path.node;
            
            if (operator !== '&&')
                return;
            
            if (isTrue(left))
                push(left);
            
            if (isTrue(right))
                push(right);
        },
    });
};

