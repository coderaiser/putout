import {template, operator} from 'putout';

const {
    getPathAfterImports,
    insertBefore,
} = operator;

const initCommons = template.ast(`
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const require = createRequire(import.meta.url);
`);

export const report = () => '"__filename", "__dirname" and "require" should be declared in ESM';

export const fix = ({scope}) => {
    const programScope = scope.getProgramParent();
    const body = programScope.path.get('body');
    const afterImportPath = getPathAfterImports(body);
    
    insertBefore(afterImportPath, initCommons);
};

export const include = () => [
    '__filename',
    '__dirname',
    'require',
];

export const filter = (path) => {
    if (path.parentPath.isObjectProperty())
        return false;
    
    const {scope} = path;
    const isDirname = scope.hasBinding('__dirname');
    const isFilename = scope.hasBinding('__filename');
    const isRequire = scope.hasBinding('require');
    
    return !isDirname && !isFilename && !isRequire;
};
