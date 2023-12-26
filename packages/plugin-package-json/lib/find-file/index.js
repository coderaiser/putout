'use strict';

const {
    operator,
    parse,
    print,
    transform,
} = require('putout');

const addType = require('../add-type');
const removeNyc = require('../remove-nyc');
const removeCommitType = require('../remove-commit-type');

const {
    findFile,
    readFileContent,
    writeFileContent,
    toJS,
    fromJS,
} = operator;

module.exports.report = () => `Find 'package.json'`;

module.exports.fix = (file, {ast, content}) => {
    transform(ast, content, {
        plugins: [
            ['add-type', addType],
            ['remove-nyc', removeNyc],
            ['remove-commit-type', removeCommitType],
        ],
    });
    
    writeFileContent(file, fromJS(print(ast)));
};

module.exports.scan = (root, {push, progress}) => {
    const files = findFile(root, 'package.json');
    const n = files.length;
    
    for (const [i, file] of files.entries()) {
        const content = toJS(readFileContent(file));
        const ast = parse(content);
        const places = transform(ast, content, {
            fix: false,
            plugins: [
                ['add-type', addType],
                ['remove-nyc', removeNyc],
                ['remove-commit-type', removeCommitType],
            ],
        });
        
        if (!places.length)
            continue;
        
        push(file, {
            content,
            ast,
        });
        
        progress({
            i,
            n,
        });
    }
};
