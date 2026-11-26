export const report = () => `Avoid empty arguments`;

export const fix = ({path, errors, error}) => {
    const {arguments: args} = path.node;
    
    path.node.arguments = args.filter(Boolean);
    errors.splice(errors.indexOf(error), 1);
};

export const traverse = ({push, store}) => ({
    Program(path) {
        const {errors = []} = path.parent;
        
        store('errors', errors);
    },
    CallExpression(path) {
        const errors = store('errors');
        const error = errors.find(isEmptyArgument(path));
        
        if (!error)
            return;
        
        push({
            path,
            errors,
            error,
        });
    },
});

const isEmptyArgument = ({node}) => ({pos, message}) => {
    if (!message.startsWith(`Unexpected token ','`))
        return false;
    
    if (pos <= node.callee.end || pos >= node.end)
        return false;
    
    return !node.arguments.some(isInside(pos));
};

const isInside = (pos) => ({start, end}) => pos > start && pos < end;
