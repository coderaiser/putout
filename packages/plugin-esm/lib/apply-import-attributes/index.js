import {types} from 'putout';

const {isStringLiteral} = types;
const TYPES = {
    ImportDeclaration: 'import',
    ExportNamedDeclaration: 'export',
    ImportExpression: 'import',
};

export const report = (path) => {
    const type = TYPES[path.type];
    return `Use \`${type} with {type: 'json'}\``;
};

export const match = () => ({
    'import __imports from "__a"': isJSONSource,
    'export __exports from "__a"': isJSONSource,
    'export * from "__a"': isJSONSource,
    'import(__a)': isJSONSource,
});

export const replace = () => ({
    'import __imports from "__a"': `import __imports from "__a" with {
        type: 'json',
    }`,
    'export * from "__a"': `export * from "__a" with {
        type: 'json',
    }`,
    'export __exports from "__a"': `export __exports from "__a" with {
        type: 'json',
    }`,
    'import(__a)': `import(__a, {
        with: {
            type: 'json',
        }
    })`,
});

function isJSONSource({__a}) {
    if (!isStringLiteral(__a))
        return false;
    
    return __a.value.endsWith('.json');
}
