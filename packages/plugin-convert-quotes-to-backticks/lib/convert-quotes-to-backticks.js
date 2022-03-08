'use strict';

const {
    types,
    operator,
} = require(`putout`);

const {
    TemplateLiteral,
    TemplateElement,
} = types;

module.exports.report = () => `Use backticks instead of quotes`;

module.exports.fix = (path) => {
    const value = path.node.value
        .replace(/\\/, '\\\\')
        .replace(/\n/g, '\\n');
    
    replaceWith(path, TemplateLiteral([
        TemplateElement({
            raw: value,
        }),
    ], []));
};

const {replaceWith} = operator;

module.exports.traverse = ({push}) => ({
    StringLiteral(path) {
        const {value} = path.node;
        
        if (value.includes(`'`))
            push(path);
    },
});

