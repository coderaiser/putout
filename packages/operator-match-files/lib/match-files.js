import path from 'node:path';
import {parse, print} from '@putout/engine-parser';
import {transform} from 'putout/transform';
import {findPlaces} from 'putout/find-places';
import {ignores} from 'putout/ignores';
import {toJS, fromJS} from '@putout/operator-json';
import {
    readFileContent,
    findFile,
    writeFileContent,
    getFilename,
    createFile,
    removeFile,
    getParentDirectory,
} from '@putout/operator-filesystem';

const {join} = path;

const isObject = (a) => a && typeof a === 'object';
const {entries} = Object;
const report = (path, {message}) => message;

export const matchFiles = (options) => {
    const {filename} = options;
    const files = options.files ?? options;
    const exclude = options.exclude ?? [];
    
    check(files);
    
    const scan = createScan({
        defaultFilename: filename,
        files,
        exclude,
    });
    
    return {
        fix,
        scan,
        report,
    };
};

function fix(inputFile, {dirPath, matchInputFilename, outputFilename, matchedJS, matchedAST, options, rawOptions}) {
    transform(matchedAST, matchedJS, options);
    
    const matchedJSON = magicPrint(outputFilename, matchedAST, rawOptions);
    const outputFile = getOutputFile({
        dirPath,
        matchInputFilename,
        outputFilename,
        inputFile,
    });
    
    writeFileContent(outputFile, matchedJSON);
    
    if (inputFile !== outputFile)
        removeFile(inputFile);
}

const createScan = ({files, exclude, defaultFilename}) => (mainPath, {push, progress, options}) => {
    const allFiles = [];
    const cwd = getFilename(mainPath);
    
    options.filename = options.filename ?? defaultFilename;
    
    for (const [filename, rawOptions] of entries(files)) {
        const [matchInputFilenameMask] = parseMatcher(filename, options);
        const inputFiles = findFile(mainPath, matchInputFilenameMask, exclude);
        
        for (const inputFile of inputFiles) {
            const dirPath = getParentDirectory(inputFile);
            const inputFilename = getFilename(inputFile);
            
            const [matchInputFilename, outputFilename = matchInputFilename] = parseMatcher(filename, {
                filename: inputFilename,
            });
            
            if (ignores(cwd, inputFilename, options))
                continue;
            
            allFiles.push({
                dirPath,
                matchInputFilename,
                rawOptions,
                inputFile,
                inputFilename,
                outputFilename,
            });
        }
    }
    
    const n = allFiles.length;
    
    for (const [i, current] of allFiles.entries()) {
        const {
            dirPath,
            matchInputFilename,
            inputFile,
            inputFilename,
            outputFilename,
            rawOptions,
        } = current;
        
        progress({
            i,
            n,
        });
        
        const fileContent = readFileContent(inputFile) || '{}';
        const [matchedJS, matchedAST] = magicParse(inputFilename, fileContent);
        
        const options = parseOptions(inputFilename, rawOptions);
        const places = findPlaces(matchedAST, matchedJS, options);
        
        if (!places.length)
            continue;
        
        const {message} = places[0];
        
        push(inputFile, {
            dirPath,
            matchInputFilename,
            
            outputFilename,
            message,
            options,
            rawOptions,
            
            matchedAST,
            matchedJS,
        });
    }
};

function magicParse(name, content) {
    if (name.endsWith('.json')) {
        const js = toJS(content);
        const ast = parse(js);
        
        return [js, ast];
    }
    
    if (/\.[cm]?ts(x)?$/.test(name)) {
        const ast = parse(content, {
            isTS: true,
        });
        
        return [content, ast];
    }
    
    return [content, parse(content)];
}

function magicPrint(name, ast, options) {
    if (name.endsWith('.json')) {
        const js = print(ast, options);
        
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

function getOutputFile({dirPath, matchInputFilename, outputFilename, inputFile}) {
    if (matchInputFilename === outputFilename)
        return inputFile;
    
    const name = join(getFilename(dirPath), outputFilename);
    const [outputFile] = findFile(dirPath, name);
    
    if (outputFile)
        return outputFile;
    
    return createFile(dirPath, outputFilename);
}

function parseMatcher(matcher, options) {
    const {filename} = options;
    
    if (!filename)
        return matcher.split(' -> ');
    
    const {ext, name} = path.parse(filename);
    
    matcher = matcher.replaceAll(`__name`, name);
    matcher = matcher.replaceAll(`__ext`, ext);
    
    return matcher.split(' -> ');
}

function parseOptions(inputFilename, rawOptions) {
    if (rawOptions.plugins)
        return rawOptions;
    
    const name = `match-file: ${inputFilename}`;
    
    const plugins = [
        [name, rawOptions],
    ];
    
    return {
        plugins,
    };
}
