export const report = (path) => {
    const {id, object} = path.node;
    return `Apply nesting for '${object}.${id}'`;
};

export const fix = (path) => {
    const {parentPath, parentKey} = path;
    const body = parentPath.node[parentKey];
    const index = body.indexOf(path.node);
    const first = body[index - 2];
    const second = body[index - 1];
    
    path.node.args = [first, second];
    body.splice(index - 2, 2);
};

export const traverse = ({push}) => ({
    Instr(path) {
        const {id, args} = path.node;
        
        if (id === 'add' && !args.length)
            push(path);
    },
});
