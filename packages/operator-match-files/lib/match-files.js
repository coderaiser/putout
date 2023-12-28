'use strict';

const {parse, print} = require('@putout/engine-parser');
const {transform} = require('putout/transform');
const {findPlaces} = require('putout/find-places');

const {toJS, fromJS} = require('@putout/operator-json');

const {
    readFileContent,
    findFile,
    writeFileContent,
} = require('@putout/operator-filesystem');

const isObject = (a) => a && typeof a === 'object';
const {entries} = Object;
const report = (path, {message}) => message;

module.exports.matchFiles = (files) => {
    check(files);
    const scan = createScan(files);
    
    return {
        fix,
        scan,
        report,
    };
};

function fix(path, {filename, matchedJS, matchedAST, plugins}) {
    transform(matchedAST, matchedJS, {
        plugins,
    });
    
    const matchedJSON = magicPrint(filename, matchedAST);
    
    writeFileContent(path, matchedJSON);
}

const createScan = (files) => (path, {push, progress}) => {
    const allFiles = [];
    
    for (const [filename, plugin] of entries(files)) {
        const files = findFile(path, filename);
        
        for (const file of files) {
            allFiles.push({
                plugin,
                file,
                filename,
            });
        }
    }
    
    const n = allFiles.length;
    
    for (const [i, {file, filename, plugin}] of allFiles.entries()) {
        progress({
            i,
            n,
        });
        
        const fileContent = readFileContent(file) || '{}';
        const [matchedJS, matchedAST] = magicParse(filename, fileContent);
        
        const plugins = [
            [
                `match-file/${filename}`,
                plugin,
            ],
        ];
        
        const places = findPlaces(matchedAST, matchedJS, {
            plugins,
        });
        
        if (!places.length)
            continue;
        
        const {message} = places[0];
        
        push(file, {
            filename,
            message,
            plugins,
            
            matchedAST,
            matchedJS,
        });
    }
};

function magicParse(name, content) {
    if (/\.json$/.test(name)) {
        const js = toJS(content);
        const ast = parse(js);
        
        return [js, ast];
    }
    
    if (/\.(c|m)?ts(x)?$/.test(name)) {
        const ast = parse(content, {
            isTS: true,
        });
        
        return [content, ast];
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

function check(files) {
    for (const [, plugin] of entries(files)) {
        if (!isObject(plugin))
            throw Error(`☝️ Looks like provided to 'matchFiles()' typeof of plugin is not an 'object' but '${typeof plugin}'`);
    }
}
