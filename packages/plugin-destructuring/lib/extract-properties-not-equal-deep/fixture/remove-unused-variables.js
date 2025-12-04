const {operator, types} = require('putout');
const {getTemplateValues} = operator;

const {ObjectExpression, ObjectProperty} = types;

module.exports.fix = (path) => {
    path.replaceWith(ObjectExpression([
        ObjectProperty(Identifier('fallback'), valueNode),
    ]));
}
