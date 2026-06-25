export const report = () => `Avoid useless parens around '{}'`;

export const fix = (path) => {
    path.node.extra = {
        parenthesized: false,
    };
};

export const traverse = ({push}) => ({
    ObjectExpression(path) {
        if (!path.node.extra)
            return;
        
        if (!path.node.extra.parenthesized)
            return;
        
        if (path.parentPath.isTSAsExpression())
            push(path);
    },
});
