import {
    types,
    operator,
    template,
} from 'putout';

const {
    createTypeChecker,
    getProperty,
} = operator;

const {isArray} = Array;

const {
    isStringLiteral,
    isIdentifier,
    isArrayExpression,
} = types;

const IMPORT = `import {rspack} from '@rspack/core'`;

const DEFINE_GLOBAL = `new rspack.DefinePlugin({
    global: 'globalThis',
})`;

const getConfigProperty = (path, name) => getProperty(path.get('declaration'), name);

const hasNoEntry = (path) => !getConfigProperty(path, 'entry');
const hasDefinedGlobal = ({parentPath}) => hasGlobalDefine(parentPath);

export const report = () => `Use 'DefinePlugin' to replace 'global' with 'globalThis': 'node.global' does not work for ESM modules`;

export const include = () => [
    'ExportDefaultDeclaration',
];

export const filter = createTypeChecker([
    ['-: node.declaration -> !ObjectExpression'],
    ['-', hasNoEntry],
    ['-', hasNodeTarget],
    ['-', hasDefinedGlobal],
    ['-', hasWrongPlugins],
    ['+: -> +'],
]);

export const fix = (path) => {
    const program = path.parentPath;
    const pluginsProp = getConfigProperty(path, 'plugins');
    const hasImport = program.get('body').some(isRspackImport);
    
    if (!hasImport)
        program.unshiftContainer('body', template.ast(IMPORT));
    
    if (pluginsProp) {
        pluginsProp.get('value').pushContainer('elements', template.ast(DEFINE_GLOBAL));
        
        return;
    }
    
    const [property] = template.ast(`({plugins: [${DEFINE_GLOBAL}]})`).properties;
    
    path.get('declaration').pushContainer('properties', property);
};

const includesNode = (a) => isStringLiteral(a) && a.value.includes('node');
const hasNode = (a) => isArray(a) && a.some(includesNode);

const hasGlobal = (properties) => properties.some(({key}) => isIdentifier(key, {
    name: 'global',
}));

const hasRspack = (specifiers) => specifiers.some(({imported}) => isIdentifier(imported, {
    name: 'rspack',
}));

const isNodeTarget = createTypeChecker([
    ['+: node.value', includesNode],
    ['+: node.value.elements', hasNode],
]);

const isRspackImport = createTypeChecker([
    ['-: -> !ImportDeclaration'],
    ['-: node.source.value', '!=', '@rspack/core'],
    ['+: node.specifiers', hasRspack],
]);

const isDefinePlugin = createTypeChecker([
    ['+: node.callee.name', '=', 'DefinePlugin'],
    ['+: node.callee.property.name', '=', 'DefinePlugin'],
]);

const hasGlobalKey = createTypeChecker([
    ['-: node.arguments.0 -> !ObjectExpression'],
    ['+: node.arguments.0.properties', hasGlobal],
]);

const hasGlobalDefine = (program) => {
    let found = false;
    
    program.traverse({
        NewExpression(path) {
            if (isDefinePlugin(path) && hasGlobalKey(path))
                found = true;
        },
    });
    
    return found;
};

function hasNodeTarget(path) {
    const targetProp = getConfigProperty(path, 'target');
    
    return targetProp && isNodeTarget(targetProp);
}

function hasWrongPlugins(path) {
    const pluginsProp = getConfigProperty(path, 'plugins');
    
    return pluginsProp && !isArrayExpression(pluginsProp.get('value'));
}
