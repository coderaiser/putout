import {types, operator} from 'putout';

const {superTraverse} = operator;
const {objectProperty, identifier} = types;

const {assign} = Object;

const names = [
    'indent',
    'write',
    'print',
    'maybe',
];

export const report = () => `Destructure from 'printer' variable instead of argument`;

export const replace = () => {
    const visitors = {};
    
    for (const name of names) {
        assign(visitors, createVisitor(name));
    }
    
    return visitors;
};

const createVisitor = (name) => ({
    [`(path, printer, {${name}}) => {__body}`]: (vars, path) => {
        const id = identifier(String(name));
        
        superTraverse(path, {
            'const __object = printer': (path) => {
                const {properties} = path.node.declarations[0].id;
                properties.push(objectProperty(id, id));
            },
        });
        
        return '(path, printer) => {__body}';
    },
});
