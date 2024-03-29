'use strict';

const {parse, print} = require('@putout/engine-parser');
const {transform} = require('putout/transform');
const {findPlaces} = require('putout/find-places');
const ignores = require('putout/ignores');

const {toJS, fromJS} = require('@putout/operator-json');

const {
    readFileContent,
    findFile,
    writeFileContent,
    getFilename,
    createFile,
    getParentDirectory,
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

function fix(path, {outputFilename, matchedJS, matchedAST, plugins}) {
    transform(matchedAST, matchedJS, {
        plugins,
    });
    
    const matchedJSON = magicPrint(outputFilename, matchedAST);
    
    writeFileContent(path, matchedJSON);
}

const createScan = (files) => (path, {push, progress, options}) => {
    const allFiles = [];
    const cwd = getFilename(path);
    
    for (const [filename, plugin] of entries(files)) {
        const [matchInputFilename, outputFilename = matchInputFilename] = parseMatcher(filename, options);
        const inputFiles = findFile(path, matchInputFilename);
        
        for (const inputFile of inputFiles) {
            const dirPath = getParentDirectory(inputFile);
            const inputFilename = getFilename(inputFile);
            const outputFile = getOutputFile(path, {
                dirPath,
                matchInputFilename,
                outputFilename,
                inputFile,
            });
            
            if (ignores(cwd, inputFilename, options))
                continue;
            
            allFiles.push({
                plugin,
                inputFile,
                outputFile,
                inputFilename,
                outputFilename,
            });
        }
    }
    
    const n = allFiles.length;
    
    for (const [i, {inputFile, outputFile, inputFilename, outputFilename, plugin}] of allFiles.entries()) {
        progress({
            i,
            n,
        });
        
        const fileContent = readFileContent(inputFile) || '{}';
        const [matchedJS, matchedAST] = magicParse(inputFilename, fileContent);
        
        const name = `match-file: ${inputFilename}`;
        const plugins = [
            [name, plugin],
        ];
        
        const places = findPlaces(matchedAST, matchedJS, {
            plugins,
        });
        
        if (!places.length)
            continue;
        
        const {message} = places[0];
        
        push(outputFile, {
            outputFilename,
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

function getOutputFile(path, {dirPath, matchInputFilename, outputFilename, inputFile}) {
    if (matchInputFilename === outputFilename)
        return inputFile;
    
    const [outputFile] = findFile(dirPath, outputFilename);
    
    if (outputFile)
        return outputFile;
    
    return createFile(dirPath, outputFilename);
}

function parseMatcher(matcher, options) {
    for (const [name, value] of entries(options)) {
        if (name === 'filename') {
            const [name, ext] = value.split('.');
            
            matcher = matcher.replaceAll(`__name`, name);
            matcher = matcher.replaceAll(`__ext`, ext);
        }
    }
    
    return matcher.split(' -> ');
}
