import {types, operator} from 'putout';

const {getBinding} = operator;
const {isIdentifier} = types;

export const report = () => `Use minified types`;

export const match = () => ({
    'typeof __a === "undefined"': isDeclared,
    'typeof __a !== "undefined"': isDeclared,
    '__a': (vars, path) => !path.parentPath.isObjectProperty(),
});

export const replace = () => ({
    'undefined': 'void 0',
    'true': '!0',
    'false': '!1',
    'Boolean(__a)': '!!__a',
    'String(__a)': '"" + __a',
    'Number(__a)': '+__a',
    'typeof __a === "undefined"': '__a == undefined',
    'typeof __a !== "undefined"': '__a !== undefined',
    'Array.from(__a)': '[...__a]',
});

function isDeclared({__a}, path) {
    if (!isIdentifier(__a))
        return true;
    
    return getBinding(path, __a.name);
}
