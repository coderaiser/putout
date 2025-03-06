'use strict';

const {types} = require('putout');
const {identifier} = types;

module.exports.report = () => `Add 'path' argument to 'traverse' visitors`;

const TRAVERSE = '(__args) => __object';

module.exports.fix = (path) => {
    path.node.params.push(identifier('path'));
};

module.exports.traverse = ({push}) => ({
    [`export const traverse = ${TRAVERSE}`]: traverseMethods({
        where: 'declaration.declarations.0.init',
        push,
    }),
    [`module.exports.traverse = ${TRAVERSE}`]: traverseMethods({
        where: 'right',
        push,
    }),
});

const traverseMethods = ({where, push}) => (path) => {
    const initPath = path.get(where);
    const objectPath = initPath.get('body');
    
    for (let prop of objectPath.get('properties')) {
        if (prop.isObjectProperty())
            prop = prop.get('value');
        
        if (!prop.isFunction())
            continue;
        
        if (prop.node.params.length)
            continue;
        
        prop.traverse({
            ReferencedIdentifier(path) {
                if (path.node.name === 'path')
                    push(prop);
            },
        });
    }
};
