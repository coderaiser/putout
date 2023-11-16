'use strict';

const {
    operator,
    parse,
    findPlaces,
    print,
} = require('putout');

const updateTSConfig = require('../update-tsconfig');

const {
    toJS,
    readFileContent,
    findFile,
    writeFileContent,
    fromJS,
    __filesystem,
} = operator;

const {stringify} = JSON;

module.exports.report = () => `Update 'tsconfig.json'`;

module.exports.fix = ({path, tsConfigAST}) => {
    const tsConfig = print(tsConfigAST);
    const tsConfigJSON = fromJS(tsConfig);
    
    writeFileContent(path, tsConfigJSON);
};

module.exports.traverse = ({push}) => ({
    [__filesystem]: (path) => {
        const [filePath] = findFile(path, 'tsconfig.json');
        const fileContent = readFileContent(filePath) || stringify({
            include: [],
        });
        
        const tsConfigJS = toJS(fileContent);
        const tsConfigAST = parse(tsConfigJS);
        
        const places = findPlaces(tsConfigAST, tsConfigJS, {
            plugins: [
                ['update-tsconfig', updateTSConfig],
            ],
        });
        
        if (places.length)
            push({
                path: filePath,
                tsConfigAST,
                tsConfigJS,
            });
    },
});
