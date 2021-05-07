const {
    types,
    operator
} = require('putout');
const {
    replaceWith
} = operator;

const {ObjectExpression, ObjectProperty} = types;

module.exports.fix = (path) => {
    replaceWith(path, ObjectExpression([
        ObjectProperty(Identifier('fallback'), valueNode),
    ]));
}
