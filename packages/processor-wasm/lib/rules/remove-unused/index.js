const {entries} = Object;

export const report = (path) => `Avoid unused '${path.node.name.value}'`;

export const fix = (path) => {
    path.remove();
};

export const find = (ast, {push, traverse}) => {
    const funcs = {};
    
    traverse(ast, {
        Func(path) {
            const {value} = path.node.name;
            funcs[value] = path;
        },
        ModuleExport(path) {
            const {value} = path.node.descr.id;
            delete funcs[value];
        },
    });
    
    for (const [, path] of entries(funcs)) {
        push(path);
    }
};
