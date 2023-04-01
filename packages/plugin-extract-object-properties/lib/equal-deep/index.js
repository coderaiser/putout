'use strict';

const {
    template,
    generate,
    types,
    operator,
} = require('putout');

const {
    findBinding,
    replaceWith,
    getTemplateValues,
} = operator;

const {
    isIdentifier,
    isCallExpression,
} = types;

module.exports.report = () => `Extract object properties into variables`;

const buildAst = template(`
    const {PROPERTY} = OBJECT;
`);

module.exports.fix = ({items}) => {
    const names = [];
    
    for (const item of items) {
        const {object, property} = item.node;
        
        if (isIdentifier(property) && !names.includes(property.name)) {
            names.push(property.name);
            
            const {
                body = item.scope.block.body,
            } = item.scope.block.body;
            
            body.unshift(buildAst({
                PROPERTY: property,
                OBJECT: object,
            }));
        }
        
        replaceWith(item, item.node.property);
    }
};

module.exports.traverse = ({uplist, push}) => ({
    'const __object = __a.__b': (fullPath) => {
        const {__a, __b} = getTemplateValues(fullPath, 'const __object = __a.__b');
        const initPath = fullPath.get('declarations.0.init');
        const {uid} = initPath.scope;
        
        if (findBinding(fullPath, __b.name)) {
            return;
        }
        
        if (isIdentifier(__a) || isCallExpression(__a)) {
            const {code} = generate(__a);
            const id = `${uid}-${code}`;
            
            return uplist(id, initPath);
        }
    },
    'Program': {
        exit: () => {
            for (const items of uplist()) {
                if (items.length < 2)
                    continue;
                
                const index = items.length - 1;
                const path = items[index];
                
                push({
                    path,
                    items,
                });
            }
        },
    },
});

