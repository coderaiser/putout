'use strict';

const {operator, types} = require('putout');
const {getProperty, __json} = operator;

const {StringLiteral} = types;
const getValue = (a) => a.value;

module.exports.report = () => `Update 'tsconfig.json'`;

module.exports.fix = ({propertyInclude}) => {
    propertyInclude.node.value.elements.push(...[
        StringLiteral('./dist/types/**/*.ts'),
        StringLiteral('./next-env.d.ts'),
    ]);
};

module.exports.traverse = ({push}) => ({
    [__json](path) {
        const __objectPath = path.get('arguments.0');
        const propertyInclude = getProperty(__objectPath, 'include');
        
        const values = propertyInclude.node.value.elements.map(getValue);
        
        if (values.includes('./dist/types/**/*.ts') && values.includes('./next-env.d.ts'))
            return;
        
        push({
            path: __objectPath,
            propertyInclude,
        });
    },
});
