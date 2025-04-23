const {entries} = Object;

export const report = ({path}) => `Avoid useless arguments in '${path.node.index.value}' call`;

export const fix = ({path, length}) => {
    path.node.instrArgs.length = length;
};

export const find = (ast, {push, traverse}) => {
    const funcs = {};
    const calls = {};
    
    traverse(ast, {
        Func(path) {
            const {value} = path.node.name;
            const {params} = path.node.signature;
            
            funcs[value] = params;
        },
        CallInstruction(path) {
            const {index, instrArgs} = path.node;
            const {value} = index;
            
            calls[value] = [path, instrArgs];
        },
    });
    
    for (const [name, [path, args]] of entries(calls)) {
        const {length} = funcs[name];
        
        if (length < args.length)
            push({
                path,
                length,
            });
    }
};
