export const report = () => `Avoid empty arguments`;

export const fix = ({path, notEmptyArguments}) => {
    path.node.arguments = notEmptyArguments;
};

export const traverse = ({push}) => ({
    CallExpression(path) {
        const {arguments: args} = path.node;
        const notEmptyArguments = args.filter(Boolean);
        
        if (args.length !== notEmptyArguments.length)
            push({
                path,
                notEmptyArguments,
            });
    },
});
