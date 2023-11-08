'use strict';

const {template, operator} = require('putout');

const {
    getPathAfterImports,
    insertBefore,
} = operator;

const initCommons = template.ast(`
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const require = createRequire(import.meta.url);
`);

module.exports.report = () => '"__filename", "__dirname" and "require" should be declared in ESM';

module.exports.fix = ({scope}) => {
    const programScope = scope.getProgramParent();
    const body = programScope.path.get('body');
    const afterImportPath = getPathAfterImports(body);
    
    insertBefore(afterImportPath, initCommons);
};

module.exports.include = () => [
    '__filename',
    '__dirname',
    'require',
];

module.exports.filter = ({scope}) => {
    const isDirname = scope.hasBinding('__dirname');
    const isFilename = scope.hasBinding('__filename');
    const isRequire = scope.hasBinding('require');
    
    return !isDirname && !isFilename && !isRequire;
};
