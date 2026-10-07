import {operator} from 'putout';

const {setLiteralValue} = operator;

export const report = () => `Avoid useless "/" in import source`;

export const fix = (path) => {
    const source = path.get('source');
    const value = source.node.value.replaceAll('//', '/');
    
    setLiteralValue(source, value);
};
export const include = () => [
    'ImportDeclaration',
];
export const filter = (path) => {
    const {value} = path.node.source;
    return value.includes('//');
};
