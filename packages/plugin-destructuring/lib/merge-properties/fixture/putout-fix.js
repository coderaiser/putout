const {types} = require('putout');
const {callExpression} = types;

for (const element of elements) {
    nodes.push(callExpression(callee, [element]));
}
