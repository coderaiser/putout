'use strict';

const {
    operator,
    parse,
    transform,
    print,
} = require('putout');

const getImportsPlugin = require('./get-imports');

const {
    readFileContent,
    renameFile,
    findFile,
    writeFileContent,
} = operator;

module.exports.report = (file, {from, to}) => `Rename '${from}' to '${to}'`;

module.exports.fix = (file, {from, to, ast, content, mainFile}) => {
    renameFile(mainFile, to);
    
    transform(ast, content, {
        rules: {
            'get-imports': ['on', {
                from,
                to,
            }],
        },
        plugins: [
            ['get-imports', getImportsPlugin],
        ],
    });
    
    const code = print(ast);
    writeFileContent(file, code);
};

module.exports.scan = (path, {push, options}) => {
    const {from, to} = options;
    
    if (!from || !to)
        return;
    
    const [mainFile] = findFile(path, from);
    
    if (!mainFile)
        return;
    
    for (const file of findFile(path, '*.js')) {
        if (file === mainFile)
            continue;
        
        const content = readFileContent(file);
        const ast = parse(content);
        
        push(file, {
            mainFile,
            from,
            to,
            
            ast,
            content,
        });
    }
};
