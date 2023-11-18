'use strict';

const {parse, print} = require('@putout/engine-parser');
const {transform} = require('putout/transform');
const {findPlaces} = require('putout/find-places');

const {
    __filesystem,
    toJS,
    fromJS,
} = require('@putout/operator-json');

const {
    readFileContent,
    findFile,
    writeFileContent,
} = require('@putout/operator-filesystem');

const {entries} = Object;
const report = ({message}) => message;

module.exports.matchFiles = (files) => {
    const traverse = createTraverse(files);
    
    return {
        fix,
        traverse,
        report,
    };
};

function fix({filename, path, matchedJS, matchedAST, plugins}) {
    transform(matchedAST, matchedJS, {
        plugins,
    });
    
    const matchedJSON = magicPrint(filename, matchedAST);
    
    writeFileContent(path, matchedJSON);
}

const createTraverse = (files) => ({push}) => ({
    [__filesystem]: (path) => {
        for (const [filename, plugin] of entries(files)) {
            const [filePath] = findFile(path, filename);
            
            if (!filePath)
                return;
            
            const fileContent = readFileContent(filePath) || '{}';
            const [matchedJS, matchedAST] = magicParse(filename, fileContent);
            
            const plugins = [
                [`match-file/${filename}`, plugin],
            ];
            
            const places = findPlaces(matchedAST, matchedJS, {
                plugins,
            });
            
            if (!places.length)
                continue;
            
            const {message} = places[0];
            
            push({
                filename,
                message,
                plugins,
                path: filePath,
                matchedAST,
                matchedJS,
            });
        }
    },
});

function magicParse(name, content) {
    if (/\.json$/.test(name)) {
        const js = toJS(content);
        const ast = parse(js);
        
        return [js, ast];
    }
    
    return [content, parse(content)];
}

function magicPrint(name, ast) {
    if (/\.json$/.test(name)) {
        const js = print(ast);
        
        return fromJS(js);
    }
    
    return print(ast);
}
