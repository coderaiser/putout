const getImportsPlugin = {
    report: ({value}) => value,
    fix: ({path, relativeNextName}) => {
        setLiteralValue(path.node.source, relativeNextName);
    },
    traverse: ({push, options}) => ({
        ImportDeclaration(path) {
            const {value} = path.node.source;
            const {
                cwd,
                mainFilename,
                nextName,
            } = options;
            
            const relativeNextName = relative(cwd, nextName);
            const relativeMainFilename = relative(cwd, mainFilename);
            
            if (value !== relativeMainFilename)
                return;
            
            push(path, {
                relativeNextName,
            });
        },
    }),
};

module.exports.report = (file, path, {mainFilename, nextName}) => `Move '${mainFilename}' to '${nextName}'`;

module.exports.fix = (file, path, {cwd, nextName, mainFile, mainDirectory, mainFilename, ast, content}) => {
    moveFile(mainFile, mainDirectory);
    
    transform(ast, content, {
        rules: {
            'get-imports': ['on', {
                cwd,
                nextName,
                mainFilename,
            }],
        },
        plugins: [
            ['get-imports', getImportsPlugin],
        ],
    });
    
    const code = print(ast);
    writeFileContent(path, code);
};

module.exports.scan = (path, {push, options}) => {
    for (const file of findFile(path, '*.js')) {
        if (file === mainFile)
            continue;
        
        const filename = getFilename(file);
        const cwd = dirname(filename);
        const content = readFileContent(file);
        const ast = parse(content);
        
        push(file, {
            mainFile,
            mainDirectory,
            nextName,
            mainFilename,
            
            ast,
            content,
            cwd,
        });
    }
};
