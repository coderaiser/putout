const {defineProperty} = Object;
defineProperty(require, '__esModule', {
    value: true,
});
require.require = require;
const a = require('hello');

console.log(a);

function require(a) {
    return a;
}
