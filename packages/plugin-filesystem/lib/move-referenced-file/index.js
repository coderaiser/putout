import {
    join,
    dirname,
    relative,
    basename,
} from 'node:path';
import {
    operator,
    parse,
    transform,
    print,
} from 'putout';

const {
    readFileContent,
    getFilename,
    findFile,
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

export const report = (file, {mainFilename, nextName}) => `Move '${mainFilename}' to '${nextName}'`;

export const fix = (file, {cwd, nextName, mainFile, mainDirectory, mainFilename, ast}) => {
    moveFile(mainFile, mainDirectory);
    
    transform(ast, {
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
    writeFileContent(file, code);
};

export const scan = (path, {push, options}) => {
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
