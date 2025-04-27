const {types} = require('putout');

const {
    ObjectExpression,
    ObjectProperty,
} = types;

module.exports.fix = (path) => {
    replaceWith(path, ObjectExpression([
        ObjectProperty(Identifier('fallback'), valueNode),
    ]));
};
