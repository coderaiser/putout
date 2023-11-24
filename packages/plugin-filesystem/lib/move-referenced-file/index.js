'use strict';

const {
    operator,
    parse,
    transform,
    print,
} = require('putout');

const {
    join,
    dirname,
    relative,
    basename,
} = require('path');

const {
    readFileContent,
    getFilename,
    findFile,
    __filesystem,
    writeFileContent,
    moveFile,
    setLiteralValue,
    getParentDirectory,
} = operator;

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
            
            push({
                path,
                relativeNextName,
            });
        },
    }),
};

module.exports.report = ({mainFilename, nextName}) => `Move '${mainFilename}' to '${nextName}'`;

module.exports.fix = ({cwd, nextName, mainFile, mainDirectory, mainFilename, path, ast, content}) => {
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

module.exports.traverse = ({push, options}) => ({
    [__filesystem]: (path) => {
        const {name, directory} = options;
        
        if (!name || !directory)
            return;
        
        const [mainFile] = findFile(path, name);
        const [mainDirectory] = findFile(path, directory);
        
        if (!mainFile)
            return;
        
        const mainFilename = getFilename(mainFile);
        const mainDirectoryName = getFilename(mainDirectory);
        
        const parentDirectoryPath = getParentDirectory(mainFile);
        const parentDirectoryName = getFilename(parentDirectoryPath);
        
        if (directory === basename(parentDirectoryName))
            return;
        
        const nextName = join(mainDirectoryName, basename(name));
        
        for (const file of findFile(path, '*.js')) {
            if (file === mainFile)
                continue;
            
            const filename = getFilename(file);
            const cwd = dirname(filename);
            const content = readFileContent(file);
            const ast = parse(content);
            
            push({
                mainFile,
                mainDirectory,
                nextName,
                mainFilename,
                path: file,
                ast,
                content,
                cwd,
            });
        }
    },
});
