'use strict';

const {parse} = require('@putout/babel');
const {print} = require('@putout/printer');
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

function fix({path, matchedJS, matchedAST, plugins}) {
    transform(matchedAST, matchedJS, {
        plugins,
    });
    
    const updatedMatchedJS = print(matchedAST);
    const matchedJSON = fromJS(updatedMatchedJS);
    
    writeFileContent(path, matchedJSON);
}

const createTraverse = (files) => ({push}) => ({
    [__filesystem]: (path) => {
        for (const [filename, plugin] of entries(files)) {
            const [filePath] = findFile(path, filename);
            const fileContent = readFileContent(filePath) || '{}';
            
            const matchedJS = toJS(fileContent);
            const matchedAST = parse(matchedJS);
            
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
                message,
                plugins,
                path: filePath,
                matchedAST,
                matchedJS,
            });
        }
    },
});
