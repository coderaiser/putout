module.exports.addMarkToArrowFunction = (path, lineNode) => {
    const {node} = path;
    const {expression} = lineNode;
    node.body = SequenceExpression([
        expression,
        node.argument,
    ]);
};

