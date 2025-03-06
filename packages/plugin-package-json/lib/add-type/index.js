import {operator, types} from 'putout';

const {objectProperty, stringLiteral} = types;
const {
    getProperties,
    insertAfter,
    __json,
} = operator;

export const report = () => `Add 'type' of module to 'package.json'`;

export const traverse = ({push}) => ({
    [__json]: (path) => {
        const __aPath = path.get('arguments.0');
        const {versionPath, typePath} = getProperties(__aPath, ['version', 'type']);
        
        if (typePath)
            return;
        
        if (!versionPath)
            return;
        
        push(versionPath);
    },
});

export const fix = (path) => {
    const node = objectProperty(stringLiteral('type'), stringLiteral('commonjs'));
    insertAfter(path, node);
};
