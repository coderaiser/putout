'use strict';

const {
    types,
    operator,
    parse,
    findPlaces,
    print,
} = require('putout');

const {
    toJS,
    readFileContent,
    findFile,
    writeFileContent,
    fromJS,
    getProperty,
    __json,
    __filesystem,
} = operator;

const noop = () => {};
const {stringify} = JSON;
const {StringLiteral} = types;
const getValue = (a) => a.value;

const updateTSConfig = {
    report: noop,
    fix: ({propertyInclude}) => {
        propertyInclude.node.value.elements.push(...[
            StringLiteral('./dist/types/**/*.ts'),
            StringLiteral('./next-env.d.ts'),
        ]);
    },
    traverse: ({push}) => ({
        [__json](path) {
            const __objectPath = path.get('arguments.0');
            const propertyInclude = getProperty(__objectPath, 'include');
            
            const values = propertyInclude.node.value.elements.map(getValue);
            
            if (values.includes('./dist/types/**/*.ts') && values.includes('./next-env.d.ts'))
                return;
            
            push({
                path: __objectPath,
                propertyInclude,
            });
        },
    }),
};

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
