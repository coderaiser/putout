import {
    template,
    operator,
    types,
} from 'putout';

const {
    isProgram,
    isCallExpression,
} = types;

const {
    getPathAfterImports,
    insertBefore,
} = operator;

const initCommons = template.ast(`
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const require = createRequire(import.meta.url);
`);

export const report = () => `Declare '__filename', '__dirname' and 'require' in ESM`;

export const fix = ({scope}) => {
    const programScope = scope.getProgramParent();
    const body = programScope.path.get('body');
    const afterImportPath = getPathAfterImports(body);
    
    insertBefore(afterImportPath, initCommons);
};

export const include = () => [
    '__filename',
    '__dirname',
    'require(__b)',
];

export const filter = (path) => {
    const {scope} = path;
    
    if (isCallExpression(path) && isProgram(scope.block))
        return false;
    
    const isDirname = scope.hasBinding('__dirname');
    const isFilename = scope.hasBinding('__filename');
    const isRequire = scope.hasBinding('require');
    
    return !isDirname && !isFilename && !isRequire;
};
