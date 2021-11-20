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

//const cutQuotes = (a, b) => !a ? b : a.slice(1, -1);
const cutQuotes = (a) => a.slice(1, -1);

module.exports.fix = (path) => {
    //const {value, raw} = path.node;
    const {raw} = path.node;
    
    replaceWith(path, TemplateLiteral([
        TemplateElement({
            raw: cutQuotes(raw),
        }),
    ], []));
};

const {replaceWith} = operator;

module.exports.traverse = ({push}) => ({
    StringLiteral(path) {
        if (path.node.value.includes(`'`))
            push(path);
    },
});

